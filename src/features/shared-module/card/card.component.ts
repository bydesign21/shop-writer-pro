import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'swp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() title = '';
  @Input() photo = '';
  @Input() description = '';
}
