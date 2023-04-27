import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzButtonSize, NzButtonType } from 'ng-zorro-antd/button';

@Component({
  selector: 'swp-button',
  templateUrl: './swp-button.component.html',
  styleUrls: ['./swp-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwpButtonComponent {
  @Input() content?: string;
  @Input() nzType: NzButtonType = 'default';
  @Input() nzSize: NzButtonSize = 'large';
  @Input() disabled = false; 
}

