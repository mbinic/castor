import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[casComponentTemplate]',
})
export class ComponentTemplateDirective {
  @Input() casComponentTemplate: string;
  @Input() casInitialProps: any;

  constructor(public template: TemplateRef<unknown>) {}
}
