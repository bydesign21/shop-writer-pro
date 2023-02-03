import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ComponentRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { Subscription } from 'rxjs';
import { loadStripe } from '@stripe/stripe-js/pure';
import { Stripe } from '@stripe/stripe-js';
import { SpinnerService } from 'src/features/shared-module/spinner/spinner.service';


@Component({
  selector: 'app-ticketing-container',
  templateUrl: './ticketing-container.component.html',
  styleUrls: ['./ticketing-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketingContainerComponent implements OnInit {
  forms: FormGroup = new FormGroup({});
  currentStep = 1;
  ticket: any;
  imageList = [];
  selectedFiles = [];
  stripe: Promise<Stripe>;
  formValues: any;
  clientSecret: string;

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
      cost: '$200'

    },
    {
      name: 'plan2',
      id: 1,
      description: 'Description2',
      image: 'imgurl',
      cost: '$300'

    },
    {
      name: 'plan3',
      id: 2,
      description: 'Description3',
      image: 'imgurl',
      cost: '$400'

    },
    {
      name: 'plan4',
      id: 3,
      description: 'Description4',
      image: 'imgurl',
      cost: '$500'

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
  ]


  constructor(
    private http: HttpClient,
    private messageService: NzMessageService,
    private spinner: SpinnerService
  ) { }

  async ngOnInit() {
    this.stripe = loadStripe('pk_test_51MVpHRIQ2JRXZFlUPWOlmMdpAQBZy2ShjwPFt5LOdX9T2nX25EvEWP0VJD0HJC2LZjMnQJKWo0ogJCCoubhha3F800EWRPDsmL');
    this.initForm();
  }

  nextStep() {
    this.currentStep++;
    this.getFormData();
    if (this.currentStep === 6) {
      this.getPaymentIntent();
    }
  }

  prevStep() {
    this.currentStep--;
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
    const formData = new FormData();
    formData.append('file', item.file as any, item.file.filename);
    const req = new HttpRequest('POST', 'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/content/media/upload/ticket', formData, {
      reportProgress: true,
      withCredentials: true,
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // calculate the progress percentage
            const percentDone = Math.round((event.loaded / event.total!) * 100);
            // pass the percentage to the item that is currently being uploaded
            item.onProgress!(percentDone, item.file!);
          }
        } else if (event instanceof HttpResponse) {
          // success
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      (err: HttpErrorResponse) => {
        // failed
        item.onError!(err, item.file!);
      }
    );
  };

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    this.selectedFiles = fileList;
    if (status === 'done') {
      this.imageList = [];
      fileList.forEach(file => this.imageList.push(file.response.Location));
      this.forms.get('step4').get('imageUpload').setValue(this.imageList);
      this.messageService.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.messageService.error(`${file.name} file upload failed.`);
    }
  }

  handleImageRemove = (file: NzUploadFile) => {
    const removedFile = file.response.Location;
    this.imageList = this.imageList.filter(image => image !== removedFile);
    this.forms.get('step4').get('imageUpload').setValue(this.imageList);
    return true;
  }

  initForm() {
    this.forms = new FormGroup({
      step1: new FormGroup({
        plan: new FormControl(''),
      }),
      step2: new FormGroup({
        vin: new FormControl(''),
        make: new FormControl(''),
        year: new FormControl(''),
        model: new FormControl(''),
        mileage: new FormControl('')

      }),
      step3: new FormGroup({
        damage: new FormControl(''),
      }),
      step4: new FormGroup({
        imageUpload: new FormControl(''),
      }),
      step5: new FormGroup({
        btn: new FormControl(''),
      }),
    });
  }

  getFormData() {
    this.formValues = this.forms.getRawValue();
  }

  async getPaymentIntent() {
    this.spinner.show()
    const req = new HttpRequest('POST', 'https://5dy63k615f.execute-api.us-east-1.amazonaws.com/dev/core/payment/payment-intent', this.formValues, {
      withCredentials: true
    });
    return this.http.request(req).subscribe(
      (event: HttpEvent<{}>) => {
        if (event instanceof HttpResponse) {
          this.clientSecret = event.body['clientSecret']
          return event.body
        }
        else {
          return event.type
        }
      },
      err => { err },
      () => { this.spinner.hide(); this.handlePayment() });
  }

  async handlePayment() {
    const stripe = await this.stripe;
    const options = {
      clientSecret: this.clientSecret,
      // Fully customizable with appearance API.
      appearance: {},
    };

    // Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 3
    const elements = stripe.elements(options);

    // Create and mount the Payment Element
    const paymentElement = elements.create('payment');
    paymentElement.mount('#payment-element');
  }
}
