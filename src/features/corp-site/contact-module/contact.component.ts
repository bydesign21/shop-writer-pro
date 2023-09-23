import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs';
import { EmailOptions, SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';

@Component({
  selector: 'swp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private utilService: SharedUtilsService,
    private messageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  onLearnMoreClick() {
    this.router.navigate(['/tickets']);
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      message: new FormControl(null, Validators.required),
    });
  }

  handleContactFormSubmit() {
    if (this.form.valid) {
      const { name, email, message } = this.form.value;
      const options: EmailOptions = {
        name,
        email,
        message
      }
      const CONTACT_US_TEMPLATE_ID = 'contact-us';
      this.utilService.sendEmail(options, CONTACT_US_TEMPLATE_ID)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.messageService.success('Message sent successfully');
            this.form.reset();
          },
          error: (err) => {
            this.messageService.error('Error sending message', err);
          }
        });
    }
  }
}
