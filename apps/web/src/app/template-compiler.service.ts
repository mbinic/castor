import { Injectable } from '@angular/core';
import * as ast from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class TemplateCompilerService {
  constructor() {}

  parse(templateSource: string): ast.TemplateAst[] {
    // see https://github.com/mgechev/codelyzer/blob/master/src/angular/templates/templateParser.ts
    return [];
  }
}
