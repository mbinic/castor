import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EditingService } from '../editing.service';

@Component({
  selector: 'cas-designer-overlay',
  templateUrl: './designer-overlay.component.html',
  styleUrls: ['./designer-overlay.component.scss'],
})
export class DesignerOverlayComponent implements OnInit {
  private none = {
    element: null,
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  };

  current = new BehaviorSubject<Element>(null);
  highlight = new BehaviorSubject<any>(this.none);
  selected = new BehaviorSubject<any[]>([]);

  dragging = new BehaviorSubject<boolean>(false);
  currentDropTarget = new BehaviorSubject<Element>(null);
  containerHighlight = new BehaviorSubject<any>(this.none);

  // containers: Observable<any>;
  dropTargets: Observable<any>;
  selectables: Observable<any>;

  constructor(
    private element: ElementRef,
    private editingService: EditingService
  ) {}

  ngOnInit(): void {
    // this.containers = this.editingService.renderedContainers$.pipe(
    //   map((c) => c.map((i) => this.makeInfo(i.node)))
    // );
    this.dropTargets = this.editingService.renderedContainers$.pipe(
      map((c) =>
        c.map((i) => ({
          ...i,
          dropTarget: this.findOutermost(i.node),
        }))
      ),
      map((d) => d.map((i) => this.makeInfo(i.dropTarget))),
      tap((d) => console.log('DROP TARGETS', d))
    );
  }

  private findOutermost(container: Element): Element {
    while (
      !(<any>container).__casContext?.isComponent &&
      container.parentElement &&
      !this.containsCasItems(container.parentElement, container)
    ) {
      container = container.parentElement;
    }
    // console.log('OUTERMOST', container);
    return container;
  }

  private containsCasItems(p: Node, excluded: Node): boolean {
    // if (!p) {
    //   return false;
    // }
    const nodes = p.childNodes;
    for (let i = 0; i < nodes.length; ++i) {
      const node = nodes.item(i);
      if (node === excluded) {
        continue;
      }
      if ((<any>node).__casContext || this.containsCasItems(node, excluded)) {
        return true;
      }
    }
    return false;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlightElement(null);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = this.getElement(event);
    this.current.next(element);
    this.highlightElement(element);
  }

  private highlightElement(target?: Element) {
    if (this.highlight.value.element != target) {
      this.highlight.next(this.makeInfo(target));
    }
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (event.button === 0 && !event.ctrlKey && !event.altKey) {
      this.selected.next([]);
    }
  }

  highlightClick(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }
    event.stopPropagation();
    const element = this.current.value;
    console.log('DOWN', event, element);

    if (event.ctrlKey) {
      const old = this.selected.value.find((e) => e.element === element);
      if (old) {
        this.selected.next(this.selected.value.filter((e) => e !== old));
      } else {
        this.selected.next([...this.selected.value, this.makeInfo(element)]);
      }
    } else if (event.altKey) {
      this.selected.next(
        this.selected.value.filter((e) => e.element != element)
      );
    } else {
      this.selected.next([this.makeInfo(element)]);
    }
  }

  private getElement(event: MouseEvent) {
    return event.view.document
      .elementsFromPoint(event.clientX, event.clientY)
      .filter((e) => e['__casContext']?.isComponent)[0];
  }

  private makeInfo(element?: Element) {
    if (!element) {
      return this.none;
    }

    const bounds = this.element.nativeElement.getBoundingClientRect();
    const targetBounds = element.getBoundingClientRect();

    return {
      element,
      left: targetBounds.left - bounds.left,
      top: targetBounds.top - bounds.top,
      width: targetBounds.width,
      height: targetBounds.height,
    };
  }

  @HostListener('dragenter', ['$event'])
  onDragEnter(event: DragEvent) {
    // console.log('ENTER', event);
    event.preventDefault();
    this.dragging.next(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent) {
    // console.log('LEAVE', event);
    this.highlightContainer(null);
    this.dragging.next(false);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent) {
    // console.log('OVER', event);
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';

    const element = this.getDropTarget(event);
    this.currentDropTarget.next(element);
    this.highlightContainer(element);
  }

  private highlightContainer(target?: Element) {
    if (this.containerHighlight.value.element != target) {
      this.containerHighlight.next(this.makeInfo(target));
    }
  }

  private getDropTarget(event: DragEvent) {
    return event.view.document
      .elementsFromPoint(event.clientX, event.clientY)
      .filter((e) => e['__casContext']?.isContainer)[0];
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    console.log('DROP', event, 'TARGET', this.currentDropTarget.value);
    this.highlightContainer(null);
    this.dragging.next(false);
  }
}
