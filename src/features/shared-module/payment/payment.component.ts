import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { PaymentIntentResult, loadStripe } from '@stripe/stripe-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Subject, from, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketService } from 'src/features/dashboard-module/ticketing/ticket.service';

@Component({
  selector: 'swp-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements AfterViewInit, OnDestroy {
  @Input() ticketsInOrder: any[];
  @Output() paymentStatus = new EventEmitter<boolean>();
  public formLoaded$ = new BehaviorSubject<boolean>(false);
  public paymentSuccess = false;
  private stripe: Promise<any> = loadStripe(environment?.STRIPE_API);
  private destroy$ = new Subject<boolean>();
  private clientSecret: string;
  private elements: any;

  constructor(
    private messageService: NzMessageService,
    private ticketService: TicketService,
    private spinner: NgxSpinnerService,
    private modalService: NzModalService,
  ) {}

  ngAfterViewInit(): void {
    this.getPaymentIntent();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  calculateOrderTotal() {
    let orderTotal = 0;
    this.ticketsInOrder.forEach((ticket) => {
      orderTotal = orderTotal + ticket.totalUSD;
    });
    return orderTotal;
  }

  async getPaymentIntent() {
    try {
      this.spinner.show('payment-spinner');
      this.clientSecret = await this.ticketService.getPaymentIntent(
        this.ticketsInOrder,
      );
      this.spinner.hide('payment-spinner');
      this.handlePayment();
      this.formLoaded$.next(true);
    } catch (error) {
      console.error(error);
      this.spinner.hide('payment-spinner');
    }
  }

  async handlePayment() {
    try {
      const stripe = await this.stripe;
      const options = {
        clientSecret: this.clientSecret,
      };
      this.elements = stripe.elements(options);
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
    } catch (error) {
      console.error(error);
    }
  }

  async submitPayment() {
    this.spinner.show('payment-spinner');
    this.formLoaded$.next(false);
    const paymentResponse$ = from(
      (await this.stripe).confirmPayment({
        elements: this.elements,
        redirect: 'if_required',
      }),
    );

    paymentResponse$
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => this.handlePaymentResponse(res));
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
      this.paymentStatus.emit(true);
    }
  }

  handleModalClose() {
    this.modalService.closeAll();
  }
}
