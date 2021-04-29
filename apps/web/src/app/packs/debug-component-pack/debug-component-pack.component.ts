import { Component, OnInit } from '@angular/core';
import templateSource from 'raw-loader!./debug-component-pack.component.html';

@Component({
  selector: 'cas-debug-component-pack',
  templateUrl: './debug-component-pack.component.html',
  styleUrls: ['./debug-component-pack.component.scss'],
})
export class DebugComponentPackComponent implements OnInit {
  source = templateSource;

  initialButtonProps = {
    text: 'Button',
  };

  initialCardProps = {
    title: [
      {
        type: 'dom.text',
        props: {
          text: 'This is a card',
        },
      },
    ],
    subtitle: [
      {
        type: 'dom.text',
        props: {
          text: 'mat-card',
        },
      },
    ],
    content: [
      {
        type: 'dom.p',
        props: {
          text: 'This is the first paragraph in the content.',
        },
      },
      {
        type: 'dom.p',
        props: {
          text: "And here's another content paragraph.",
        },
      },
    ],
    actions: [
      {
        type: 'debug.button',
        props: {
          text: 'Action 1',
        },
      },
      {
        type: 'debug.button',
        props: {
          text: 'Action 2',
        },
      },
      {
        type: 'debug.button',
        props: {
          text: 'Action 3',
        },
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
