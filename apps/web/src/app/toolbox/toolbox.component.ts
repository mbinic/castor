import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComponentRegistryService } from '../component-registry.service';

@Component({
  selector: 'cas-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss'],
})
export class ToolboxComponent implements OnInit {
  packs: any[];

  @Output() componentClick = new EventEmitter<any>();

  constructor(private componentRegistry: ComponentRegistryService) {}

  ngOnInit(): void {
    this.packs = this.componentRegistry.getPacks();
  }

  onComponentClick(component: any) {
    const item = this.createComponentItem(component);
    this.componentClick.next({ component, item });
  }

  onComponentDrag(event: DragEvent, component: any) {
    console.log('START', event, component);
    const item = this.createComponentItem(component);
    event.dataTransfer.setDragImage(<any>event.target, -2, -16);
  }

  private createComponentItem(component: any) {
    const props = component.initialProps || {};
    return {
      type: component.type,
      props,
    };
  }
}
