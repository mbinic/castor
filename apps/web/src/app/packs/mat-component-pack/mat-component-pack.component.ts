import { Component } from '@angular/core';
import templateSource from 'raw-loader!./mat-component-pack.component.html';

@Component({
  selector: 'cas-mat-component-pack',
  templateUrl: './mat-component-pack.component.html',
  styleUrls: ['./mat-component-pack.component.scss']
})
export class MatComponentPackComponent {
  source = templateSource;

  initialButtonProps = {
    items: [
      {
        type: 'dom.text',
        props: {
          text: 'Button'
        }
      }
    ]
  };

  initialIconProps = {
    icon: 'help'
  };

  initialProgressBarProps = {
    mode: 'indeterminate'
  };
}
