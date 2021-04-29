import { Component, OnInit } from '@angular/core';
import templateSource from 'raw-loader!./patterns-component-pack.component.html';

@Component({
  selector: 'cas-patterns-component-pack',
  templateUrl: './patterns-component-pack.component.html',
  styleUrls: ['./patterns-component-pack.component.scss'],
})
export class PatternsComponentPackComponent implements OnInit {
  source = templateSource;

  constructor() {}

  ngOnInit(): void {}
}
