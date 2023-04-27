import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, filter, from, fromEvent, lastValueFrom, of, Subject, switchMap, take, takeUntil } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js/pure';
import { PaymentIntentResult, Stripe, StripeElements } from '@stripe/stripe-js';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';
import { SessionQuery } from 'src/app/session-store/domain-state/session.query';
import { TicketService } from './ticket.service';
import { DecimalPipe } from '@angular/common';
import { SharedUtilsService } from 'src/features/shared-module/shared-utils/shared-utils.service';
import { insuranceList } from 'src/features/shared-module/shared-utils/shared.model';
import { Ticket } from './store/ticket.model';

@Component({
  selector: 'app-ticketing',
  templateUrl: './ticketing.component.html',
  styleUrls: ['./ticketing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe]
})
export class TicketingComponent implements OnInit, OnDestroy {
  userId: string;
  forms: FormGroup = new FormGroup({});
  currentStep = 1;
  ticket: any;
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
  private vinSubject = new Subject<string>();


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
      name: 'plan1',
      id: 0,
      description: 'Description1',
      image: 'imgurl',
      cost: 100

    },
    {
      name: 'plan2',
      id: 1,
      description: 'Description2',
      image: 'imgurl',
      cost: 200

    },
    {
      name: 'plan3',
      id: 2,
      description: 'Description3',
      image: 'imgurl',
      cost: 300

    },
    {
      name: 'plan4',
      id: 3,
      description: 'Description4',
      image: 'imgurl',
      cost: 400

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
    private http: HttpClient,
    private messageService: NzMessageService,
    private spinner: SpinnerService,
    private cd: ChangeDetectorRef,
    private sessionQuery: SessionQuery,
    private ticketService: TicketService,
    private decimalPipe: DecimalPipe,
    private utilService: SharedUtilsService
  ) { }

  ngOnInit() {
    this.destroy$.next(false);
    this.sessionQuery.email$
      .pipe(
        take(1),
        takeUntil(this.destroy$)
      )
      .subscribe(email => this.userId = email);
    this.stripe = loadStripe('pk_test_51MVpHRIQ2JRXZFlUPWOlmMdpAQBZy2ShjwPFt5LOdX9T2nX25EvEWP0VJD0HJC2LZjMnQJKWo0ogJCCoubhha3F800EWRPDsmL');
    this.initForm();

    this.vinSubject.pipe(
      debounceTime(500),
      filter(vin => vin.length > 0 && vin.length < 25),
      distinctUntilChanged(),
      switchMap(vin => from(this.utilService.getVehichleByVin(vin))
        .pipe(
          takeUntil(this.destroy$),
          catchError((err: HttpErrorResponse) => {
            this.messageService.error('Please enter a valid VIN');
            this.vinSubject.next('');
            return of(null); // Return an observable to continue the stream
          })
        ))
    )
      .subscribe((res: any) => {
        if (res) {
          const { year, make, model } = res.body;
          if (year && make && model) {
            this.forms.get('step2').get('year').patchValue(year);
            this.forms.get('step2').get('make').patchValue(make);
            this.forms.get('step2').get('model').patchValue(model);
          } else {
            this.messageService.error('Please enter a valid VIN');
            this.vinSubject.next('');
          }
        }
      });
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
      this.getPaymentIntent();
    }
  }

  prevStep() {
    this.currentStep--;
    this.formLoaded$.next(false);
  }

  onSubmit() {
    this.ticket = { ...this.forms.value };
    console.log(this.ticket);
  }

  isStepValid(): boolean {
    const currentStepForm = this.forms.get(`step${this.currentStep}`);
    return currentStepForm ? currentStepForm.valid : false;
  }

  public customReq = (item: NzUploadXHRArgs) => {
    return this.ticketService.uploadPhotos(item).pipe(takeUntil(this.destroy$))
      .subscribe();
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
    console.log(this.formValues);
  }

  getPaymentIntent() {
    this.spinner.show('payment-spinner')
    const req = new HttpRequest('POST', 'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/payment/payment-intent', this.ticketsInOrder, {
      withCredentials: true
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<object>) => {
        if (event instanceof HttpResponse) {
          this.clientSecret = event.body['clientSecret'];
          this.formLoaded$.next(true);
          return event.body
        }
        else {
          return event.type
        }
      },
      err => { err },
      () => { this.spinner.hide('payment-spinner'); this.handlePayment(); });
  }

  async handlePayment() {
    const stripe = await this.stripe;
    const options = {
      clientSecret: this.clientSecret,
      // Fully customizable with appearance API.
      appearance: {},
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
    this.elements = stripe.elements(options);

    // Create and mount the Payment Element
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

    paymentResponse$.subscribe(res => this.handlePaymentResponse(res));
  }

  handlePaymentResponse(response: PaymentIntentResult) {
    if (response) {
      this.spinner.hide('payment-spinner');
      this.formLoaded$.next(true);
    }
    if (response.error) {
      this.messageService.error(response.error.message);
    } else {
      this.paymentSuccess = true;
      this.submitTicket();
      this.messageService.success('Payment Successful');
    }
  }

  async submitTicket() {
    const req = new HttpRequest('PUT', 'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/content/ticket/upload', this.ticketsInOrder, {
      reportProgress: true,
      withCredentials: true,
    });
    try {
      const response = await lastValueFrom(this.http.request(req));
      if (response) {
        this.ticketSubmitted.emit(true);
        return response;
      }
    } catch {
      return console.log('there was an error submitting your ticket')
    }
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
        this.vinSubject.next(event.target.value);
      });
  }

  numberFormatter(value: string) {
    console.log(value)
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
    console.log(this.ticketsInOrder);
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
