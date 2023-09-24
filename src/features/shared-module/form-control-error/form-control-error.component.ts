import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'swp-form-control-error',
  templateUrl: './form-control-error.component.html',
})
export class FormControlErrorComponent {
  @Input() control: any;
  @Input() errorMessages: { [key: string]: string };

  getErrorKeys(): string[] {
    return Object.keys(this.errorMessages);
  }
}
