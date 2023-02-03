import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  
  @Input()
  fullscreen?: boolean;

  constructor() {}

}
