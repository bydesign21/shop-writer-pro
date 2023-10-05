import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'swp-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input()
  fullscreen: boolean;

  @Input()
  name: string;
}
