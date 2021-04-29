import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'cas-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RendererComponent implements OnInit {
  @Input() host: any;

  constructor() {}

  ngOnInit(): void {}
}
