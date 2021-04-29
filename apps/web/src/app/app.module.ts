import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DesignerComponent } from './designer/designer.component';
import { InspectorComponent } from './inspector/inspector.component';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { WorkbenchComponent } from './workbench/workbench.component';
import { RendererComponent } from './renderer/renderer.component';
import { DesignerOverlayComponent } from './designer-overlay/designer-overlay.component';
import { ComponentPackComponent } from './component-pack/component-pack.component';
import { ComponentTemplateDirective } from './component-template.directive';
import { MatComponentPackComponent } from './packs/mat-component-pack/mat-component-pack.component';
import { DomComponentPackComponent } from './packs/dom-component-pack/dom-component-pack.component';
import { DebugComponentPackComponent } from './packs/debug-component-pack/debug-component-pack.component';
import { PatternsComponentPackComponent } from './packs/patterns-component-pack/patterns-component-pack.component';
import { RenderDirective } from './cas-render.directive';

@NgModule({
  declarations: [
    AppComponent,
    DesignerComponent,
    InspectorComponent,
    ToolboxComponent,
    WorkbenchComponent,
    RendererComponent,
    DesignerOverlayComponent,
    ComponentPackComponent,
    ComponentTemplateDirective,
    MatComponentPackComponent,
    DomComponentPackComponent,
    DebugComponentPackComponent,
    PatternsComponentPackComponent,
    RenderDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    FlexLayoutModule,

    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
