import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ComponentRegistryService } from './component-registry.service';
import { EditingService } from './editing.service';

@Directive({
  selector: '[casRender]',
})
export class RenderDirective {
  private hasView = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private componentRegistry: ComponentRegistryService,
    private editingService: EditingService
  ) {}

  @Input() set casRender(items: any[]) {
    const containerElement = this.viewContainer.element.nativeElement
      .parentElement;
    containerElement.__casContext = {
      ...containerElement.__casContext,
      isContainer: true,
      // next line may be overwriting items that were already rendered into this container; add a test case and append items instead
      items: items,
    };
    this.editingService.containerRendered({
      items,
      node: containerElement,
    });

    if (this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
    if (items?.length) {
      items.forEach((item) => {
        const template = this.componentRegistry.getTemplate(item.type);
        const view = this.viewContainer.createEmbeddedView(template, {
          $implicit: item.props,
        });
        view.rootNodes.forEach((n) => {
          n.__casContext = {
            isComponent: true,
            item,
          };

          this.markDropTargets(n);
        });
        this.editingService.itemRendered({
          item,
          nodes: view.rootNodes,
        });
        console.log('ROOTS', [containerElement], view.rootNodes);
      });
      this.hasView = true;
    }
  }

  private markDropTargets(rootNode: any): void {
    if (rootNode.__casContext?.isContainer) {
      rootNode.__casContext.isDropTarget = true;
      return;
    }

    // this.editingService.renderedContainers$.pipe(
    //   map((c) =>
    //     c.map((i) => ({
    //       ...i,
    //       dropTarget: this.findOutermost(i.node),
  }

  // private findOutermost(container: Element): Element {
  //   while (
  //     !(<any>container).__casContext?.isComponent &&
  //     container.parentElement &&
  //     !this.containsCasItems(container.parentElement, container)
  //   ) {
  //     container = container.parentElement;
  //   }
  //   // console.log('OUTERMOST', container);
  //   return container;
  // }

  // private containsCasItems(p: Node, excluded: Node): boolean {
  //   // if (!p) {
  //   //   return false;
  //   // }
  //   const nodes = p.childNodes;
  //   for (let i = 0; i < nodes.length; ++i) {
  //     const node = nodes.item(i);
  //     if (node === excluded) {
  //       continue;
  //     }
  //     if ((<any>node).__casContext || this.containsCasItems(node, excluded)) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}
