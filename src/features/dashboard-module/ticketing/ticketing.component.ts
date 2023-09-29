import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Subject, from, take, takeUntil } from 'rxjs';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';

import { Ticket } from './store/ticket.model';
import { TicketService } from './ticket.service';

@Component({
  selector: 'swp-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export class TicketingComponent implements OnInit, OnDestroy {
  userId: string;
  forms: FormGroup = new FormGroup({});
  currentStep = 1;
  ticket: Ticket;
  formValues: any;
  paymentSuccess = false;
  destroy$ = new Subject();
  ticketsInOrder: Partial<Ticket>[] = [];

  @Output() ticketSubmitted = new EventEmitter<boolean>(false);

  steps = [
    {
      step: 1,
      percentage: 0,
    },
    {
      step: 2,
      percentage: 20,
    },
    {
      step: 3,
      percentage: 40,
    },
    {
      step: 4,
      percentage: 60,
    },
    {
      step: 5,
      percentage: 78,
    },
    {
      step: 6,
      percentage: 100,
    },
  ];

  constructor(
    private messageService: NzMessageService,
    private sessionQuery: SessionQuery,
    private ticketService: TicketService,
    private modalService: NzModalService,
  ) {
    this.sessionQuery.email$
      .pipe(take(1), takeUntil(this.destroy$))
      .subscribe((email) => (this.userId = email));
  }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  nextStep() {
    this.currentStep++;
    this.getFormData();
    if (this.currentStep === 6) {
      this.addTicketToOrder();
    }
  }

  prevStep() {
    this.currentStep--;
  }

  onSubmit() {
    this.ticket = { ...this.forms.value };
  }

  isStepValid(): boolean {
    const currentStepForm = this.forms.get(`step${this.currentStep}`);
    return currentStepForm ? currentStepForm.valid : false;
  }

  initForm() {
    this.forms = new FormGroup({
      step1: new FormGroup({
        plan: new FormControl('', [Validators.required]),
      }),
      step2: new FormGroup({
        insurance: new FormControl('', [Validators.required]),
        vin: new FormControl('', [Validators.required]),
        make: new FormControl('', [Validators.required]),
        year: new FormControl('', [Validators.required]),
        model: new FormControl('', [Validators.required]),
        mileage: new FormControl('', [Validators.required]),
      }),
      step4: new FormGroup({
        damage: new FormControl('', [Validators.required]),
      }),
      step3: new FormGroup({
        imageUpload: new FormControl('', [Validators.required]),
      }),
      step5: new FormGroup({
        btn: new FormControl(''),
      }),
      step6: new FormGroup({
        paymentSuccess: new FormControl('', [Validators.required]),
      }),
    });
  }

  getFormData() {
    console.log(this.forms.getRawValue(), 'formValTicketingComp');
    this.formValues = this.forms.getRawValue();
  }

  async submitTicket(): Promise<any> {
    return await this.ticketService.submitTickets(this.ticketsInOrder).then(
      (res) => {
        return res;
      },
      (err) => {
        return err;
      },
    );
  }

  mapFormData(formData: any) {
    const mappedData = {
      insurance: formData.step2.insurance as string,
      vin: formData.step2.vin as string,
      make: formData.step2.make as string,
      year: formData.step2.year as string,
      model: formData.step2.model as string,
      mileage: Number(formData.step2.mileage.replaceAll(',', '')),
      description: formData.step4.damage as string,
      images: this.getFileLocationsFromUploads(formData.step3.imageUpload),
      plan: formData.step1.plan.name as string,
      totalUSD: formData.step1.plan.cost as number,
      userId: this.userId,
    };
    return mappedData;
  }

  // numberFormatter(value: string) {
  //   this.vehicleMileage = this.decimalPipe.transform(value.replace(',', ''), '1.0-0');
  // }

  handleAddVehicle() {
    this.addTicketToOrder();
    this.resetFormsAndValues();
    this.messageService.success('New Vehicle Successfully Added To Order');
  }

  addTicketToOrder() {
    const formData = this.formValues;
    const mappedData = this.mapFormData(formData);
    this.ticketsInOrder.push(mappedData);
  }

  resetFormsAndValues() {
    this.forms.reset();
    this.formValues = null;
    this.currentStep = 1;
  }

  calculateOrderTotal() {
    let orderTotal = 0;
    this.ticketsInOrder.forEach((ticket) => {
      orderTotal = orderTotal + ticket.totalUSD;
    });
    return orderTotal;
  }

  handleModalClose() {
    this.modalService.closeAll();
  }

  handlePlanSelected(plan: any): void {
    this.forms.get('step1').get('plan').setValue(plan);
  }

  handleVehicleDetails(details: any): void {
    this.forms.get('step2').patchValue(details);
  }

  handleFiles(files: NzUploadFile[]): void {
    this.forms.get('step3').patchValue({ imageUpload: files });
  }

  getFileLocationsFromUploads(uploads: NzUploadFile[]): string[] {
    const files = [];
    uploads.forEach((file) => files.push(file.response.Location));
    return files;
  }

  handleVehicleDetailsDamage(damage: string) {
    this.forms.get('step4').patchValue({ damage });
  }

  handlePaymentStatusChange(status: boolean) {
    if (status === true) {
      this.paymentSuccess = status;
      this.forms.get('step6').patchValue({ paymentSuccess: status });
      from(this.submitTicket())
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.ticketSubmitted.next(true);
          },
          error: (err) => {
            this.ticketSubmitted.next(false);
          },
        });
    }
  }
}
