import { Component } from '@angular/core';
import templateSource from 'raw-loader!./dom-component-pack.component.html';

@Component({
  selector: 'cas-dom-component-pack',
  templateUrl: './dom-component-pack.component.html',
  styleUrls: ['./dom-component-pack.component.scss'],
})
export class DomComponentPackComponent {
  source = templateSource;
}
