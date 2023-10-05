import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Subject, take, takeUntil } from 'rxjs';
import { ContactFormComponent } from 'src/features/shared-module/contact-form/contact-form.component';
import {
  EmailOptions,
  SharedUtilsService,
} from 'src/features/shared-module/shared-utils/shared-utils.service';

@Component({
  selector: 'swp-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnDestroy {
  @ViewChild('contactForm') contactFormComponent: ContactFormComponent;
  private destroy$ = new Subject<boolean>();
  constructor(
    private utilService: SharedUtilsService,
    private messageService: NzMessageService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleContactFormSubmit($event: any) {
    const { name, email, message } = $event;
    const options: EmailOptions = {
      name,
      email,
      message,
    };
    const CONTACT_US_TEMPLATE_ID = 'contact-us';
    this.utilService
      .sendEmail(options, CONTACT_US_TEMPLATE_ID)
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.messageService.success('Message sent successfully');
          this.contactFormComponent.resetForm();
        },
        error: (err) => {
          this.messageService.error('Error sending message', err);
        },
      });
  }
}
