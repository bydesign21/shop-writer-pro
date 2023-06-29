import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, filter, from, fromEvent, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js/pure';
import { PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { TicketService } from './ticket.service';
import { DecimalPipe } from '@angular/common';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';
import { insuranceList } from 'src/features/shared-module/shared-utils/shared.model';
import { Ticket } from './store/ticket.model';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'swp-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class TicketingComponent implements OnInit, OnDestroy {
  userId: string;
  forms: FormGroup = new FormGroup({});
  currentStep = 1;
  ticket: Ticket;
  imageList = [];
  selectedFiles = [];
  stripe: Promise<Stripe>;
  formLoaded$ = new BehaviorSubject<boolean>(false);
  formValues: any;
  clientSecret: string;
  elements: StripeElements;
  paymentSuccess = false;
  vehicleMileage: string;
  destroy$ = new Subject();
  insuranceList = insuranceList;
  ticketsInOrder: Partial<Ticket>[] = [];
  private vinSubject$ = new Subject<string>();


  @Output() ticketSubmitted = new EventEmitter<boolean>(false);

  panels = [
    {
      active: true,
      name: 'Plan',
      disabled: false,
      id: 1
    },
    {
      active: false,
      disabled: false,
      name: 'Vehicle Details',
      id: 2
    },
    {
      active: false,
      disabled: false,
      name: 'Damage Description',
      id: 3
    },
    {
      active: false,
      disabled: false,
      name: 'Uploaded Images',
      id: 4
    }
  ];

  plans = [
    {
      name: 'Standard Supplement',
      id: 0,
      description: 'Send us the insurance estimate, VIN, damage photos, and a brief description. We`ll review everything and provide an accurate supplement. After a final accuracy check, we`ll send it to you.',
      image: '../../../assets/images/barcode-icon.png',
      cost: 150

    },
    {
      name: 'Standard Estimate',
      id: 1,
      description: 'Our estimators use the VIN, damage photos, and description to create an estimate for insurance negotiations. It undergoes a final accuracy review before being sent to you.',
      image: '../../../assets/images/barcode-icon.png',
      cost: 200

    }
  ];

  steps = [
    {
      step: 1,
      percentage: 0
    },
    {
      step: 2,
      percentage: 20
    },
    {
      step: 3,
      percentage: 40
    },
    {
      step: 4,
      percentage: 60
    },
    {
      step: 5,
      percentage: 78
    },
    {
      step: 6,
      percentage: 100
    }
  ];

  constructor(
    private messageService: NzMessageService,
    private spinner: SpinnerService,
    private sessionQuery: SessionQuery,
    private ticketService: TicketService,
    private decimalPipe: DecimalPipe,
    private utilService: SharedUtilsService
  ) {
    this.stripe = loadStripe(environment.STRIPE_API);
    this.sessionQuery.email$
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(email => this.userId = email);
  }

  ngOnInit() {
    this.initForm();
    this.handleVehicleDetailsAutoFill();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  handleVehicleDetailsAutoFill() {
    this.vinSubject$.pipe(
      debounceTime(500),
      filter(vin => vin.length > 4 && vin.length < 25),
      distinctUntilChanged(),
      switchMap(vin => from(this.utilService.getVehichleByVin(vin))
        .pipe(
          takeUntil(this.destroy$),
          catchError(() => {
            this.messageService.error('Please enter a valid VIN');
            this.vinSubject$.next('');
            return of(null);
          })
        ))
    )
      .subscribe((res: any) => {
        if (res) {
          const { year, make, model } = res;
          if (year && make && model) {
            this.forms.get('step2').get('year').patchValue(year);
            this.forms.get('step2').get('make').patchValue(make);
            this.forms.get('step2').get('model').patchValue(model);
          } else {
            this.messageService.error('Please enter a valid VIN');
            this.vinSubject$.next('');
          }
        }
      });
  }

  nextStep() {
    this.currentStep++;
    this.getFormData();
    if (this.currentStep === 6) {
      this.addTicketToOrder();
      this.getPaymentIntent();
    }
  }

  prevStep() {
    this.currentStep--;
    this.formLoaded$.next(false);
  }

  onSubmit() {
    this.ticket = { ...this.forms.value };
  }

  isStepValid(): boolean {
    const currentStepForm = this.forms.get(`step${this.currentStep}`);
    return currentStepForm ? currentStepForm.valid : false;
  }

  public customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService.uploadMedia(item).pipe(takeUntil(this.destroy$)).subscribe();
  };

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    this.selectedFiles = fileList;
    if (status === 'done') {
      this.imageList = [];
      fileList.forEach(file => this.imageList.push(file.response.Location));
      this.forms.get('step3').get('imageUpload').setValue(this.imageList);
      this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.messageService.error(`${file.name} file upload failed.`);
    }
  }

  handleImageRemove = (file: NzUploadFile) => {
    const removedFile = file.response.Location;
    this.imageList = this.imageList.filter(image => image !== removedFile);
    this.forms.get('step3').get('imageUpload').setValue(this.imageList);
    return true;
  }

  initForm() {
    this.forms = new FormGroup({
      step1: new FormGroup({
        plan: new FormControl(''),
      }),
      step2: new FormGroup({
        insurance: new FormControl(''),
        vin: new FormControl(''),
        make: new FormControl(''),
        year: new FormControl(''),
        model: new FormControl(''),
        mileage: new FormControl('')

      }),
      step4: new FormGroup({
        damage: new FormControl(''),
      }),
      step3: new FormGroup({
        imageUpload: new FormControl(''),
      }),
      step5: new FormGroup({
        btn: new FormControl(''),
      }),
      step6: new FormGroup({
        paymentSuccess: new FormControl(''),
      })
    });
  }

  getFormData() {
    this.formValues = this.forms.getRawValue();
  }

  getPaymentIntent() {
    this.spinner.show('payment-spinner')
    this.ticketService.getPaymentIntent(this.ticketsInOrder).then((res) => {
      this.clientSecret = res;
      this.spinner.hide('payment-spinner');
      this.handlePayment();
      this.formLoaded$.next(true);
    });
  }

  async handlePayment() {
    const stripe = await this.stripe;
    const options = {
      clientSecret: this.clientSecret,
      appearance: {},
    };
    this.elements = stripe.elements(options);
    const paymentElement = this.elements.create('payment');
    paymentElement.mount('#payment-element');
  }

  async submitPayment() {
    this.spinner.show('payment-spinner');
    this.formLoaded$.next(false);
    const paymentResponse$ = from((await this.stripe).confirmPayment({
      elements: this.elements,
      redirect: 'if_required'
    }));

    paymentResponse$.pipe(takeUntil(this.destroy$)).subscribe(res => this.handlePaymentResponse(res));
  }

  handlePaymentResponse(response: PaymentIntentResult) {
    if (response) {
      this.spinner.hide('payment-spinner');
      this.formLoaded$.next(true);
    }
    if (response.error) {
      this.messageService.error(response.error.message);
      this.paymentSuccess = false;
      this.messageService.error('Payment Failed');
    } else {
      this.paymentSuccess = true;
      this.messageService.success('Payment Successful');
      this.submitTicket();
    }
  }

  async submitTicket() {
    return await this.ticketService.submitTickets(this.ticketsInOrder).then(
      (res) => {
        this.ticketSubmitted.next(true);
        return res;
      },
      (err) => {
        return err;
      }
    )
  }

  mapFormData(formData: any) {
    const mappedData = {
      insurance: formData.step2.insurance.value as string,
      vin: formData.step2.vin as string,
      make: formData.step2.make as string,
      year: formData.step2.year as string,
      model: formData.step2.model as string,
      mileage: Number(formData.step2.mileage.replaceAll(',', '')),
      description: formData.step4.damage as string,
      images: formData.step3.imageUpload as string[],
      plan: formData.step1.plan.name as string,
      totalUSD: formData.step1.plan.cost as number,
      userId: this.userId
    }
    return mappedData;
  }

  onVinKeydown(event: any) {
    fromEvent(event.target, 'input')
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.vinSubject$.next(event.target.value);
      });
  }

  numberFormatter(value: string) {
    this.vehicleMileage = this.decimalPipe.transform(value.replace(',', ''), '1.0-0');
  }

  addAdditionalVehicle() {
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
    this.vehicleMileage = '';
    this.imageList = [];
    this.selectedFiles = [];
    this.currentStep = 1;
  }

  calculateOrderTotal() {
    let orderTotal = 0;
    this.ticketsInOrder.forEach(ticket => {
      orderTotal = orderTotal + ticket.totalUSD
    });
    return orderTotal;
  }
}
