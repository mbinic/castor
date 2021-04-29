import { Injectable, QueryList, TemplateRef } from '@angular/core';
import { ComponentTemplateDirective } from './component-template.directive';
import { TemplateCompilerService } from './template-compiler.service';

@Injectable({
  providedIn: 'root',
})
export class ComponentRegistryService {
  private templates = new Map<string, TemplateRef<unknown>>();
  private packs = [];

  constructor(private templateCompiler: TemplateCompilerService) {}

  registerPack(
    name: string,
    templateSource: string,
    componentTemplates: QueryList<ComponentTemplateDirective>
  ) {
    const components = [];
    const templateAsts = this.templateCompiler.parse(templateSource);
    componentTemplates.forEach((t) => {
      this.templates.set(t.casComponentTemplate, t.template);
      components.push({
        type: t.casComponentTemplate,
        initialProps: t.casInitialProps,
        templateAst: templateAsts[t.casComponentTemplate],
      });
      // console.log(
      //   `Registered '${t.casComponentTemplate}' component template in '${name}' pack`
      // );
    });
    this.packs.push({
      name,
      components,
    });
  }

  getTemplate(casComponentTemplate: string): TemplateRef<unknown> {
    return this.templates.get(casComponentTemplate);
  }

  getPacks(): any[] {
    return this.packs;
  }
}
