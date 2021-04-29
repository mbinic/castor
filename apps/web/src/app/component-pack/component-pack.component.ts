import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { ComponentTemplateDirective } from '../component-template.directive';
import { ComponentRegistryService } from '../component-registry.service';

@Component({
  selector: 'cas-component-pack',
  templateUrl: './component-pack.component.html',
  styleUrls: ['./component-pack.component.scss'],
})
export class ComponentPackComponent implements AfterContentInit {
  @Input() name: string;
  @Input() source: string;

  @ContentChildren(ComponentTemplateDirective)
  templates: QueryList<ComponentTemplateDirective>;

  constructor(private componentRegistry: ComponentRegistryService) {}

  ngAfterContentInit() {
    this.componentRegistry.registerPack(this.name, this.source, this.templates);
  }
}
