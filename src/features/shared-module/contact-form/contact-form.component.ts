import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'swp-contact-form',
  templateUrl: './contact-form.component.html',
})
export class ContactFormComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, Validators.required),
  });

  @Output() formSubmit = new EventEmitter<any>();

  handleFormSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  resetForm() {
    this.form.reset();
  }
}
