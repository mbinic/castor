import { Component, OnInit, ViewChild } from '@angular/core';
import { DesignerComponent } from '../designer/designer.component';

@Component({
  selector: 'cas-workbench',
  templateUrl: './workbench.component.html',
  styleUrls: ['./workbench.component.scss'],
})
export class WorkbenchComponent implements OnInit {
  @ViewChild(DesignerComponent) designer;

  constructor() {}

  ngOnInit(): void {}

  insertComponent(event: any) {
    this.designer.insertComponent(event.item);
  }
}
