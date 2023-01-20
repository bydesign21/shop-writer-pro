import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {

  constructor(

  ) {}
  @Input()
  fullscreen?: boolean;

  @Input() size: NzSizeLDSType;
  @Input() spinning: boolean;
  @Input() simple: boolean;
  @Input() indicator: TemplateRef<void>;

}
