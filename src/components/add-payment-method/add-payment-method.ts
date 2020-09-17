import { STRIPE_PUBLISHABLE_KEY } from './../../const';
import { Component } from '@angular/core';
import { PaymentProvider } from '../../providers/payment-provider';
import { Stripe } from '@ionic-native/stripe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ViewController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';


@Component({
  selector: 'add-payment-method',
  templateUrl: 'add-payment-method.html'
})
export class AddPaymentMethodComponent {

  errorText: string;
  error: boolean = false;

  myForm: FormGroup;

  submitAttempt: boolean;

  loading: boolean = false;

  canScan: boolean = false;

  constructor(private paymentService: PaymentProvider, private stripe: Stripe, private formBuilder: FormBuilder,
    public viewCtrl: ViewController, private cardIO: CardIO) {
    console.log('Hello AddPaymentMethod Component');

    this.myForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      expMonth: ['', [Validators.required]],
      expYear: ['', [Validators.required]],
    });
  }

  ionViewDidEnter() {
    this.cardIO.canScan()
      .then(
      (res: boolean) => {
        this.canScan = res;
      })
  }

  ngOnInit() {
    this.stripe.setPublishableKey(STRIPE_PUBLISHABLE_KEY);
  }

  submit(form) {
    this.submitAttempt = true;
    this.errorText = undefined;
    if (this.myForm.valid) {
      this.loading = true;
      this.stripe.createCardToken(this.myForm.value).then(token => {
        this.paymentService.sendToken(token, true).subscribe(data => {
          this.viewCtrl.dismiss(data);
          this.loading = false;
        });
      }).catch(error => {
        console.log(error);
        this.error = true;
        this.loading = false;


        if (error.param) {
          this.myForm.controls[error.param].setErrors({ remote: error.errorText });
        } else { this.errorText = error; }
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scanCard() {
    this.cardIO.canScan()
      .then(
      (res: boolean) => {
        this.canScan = res;
        if (res) {
          let options = {
            requireExpiry: true,
            requireCVV: true,
          };
          this.cardIO.scan(options).then(data => {

            this.myForm.patchValue({
              number: data.cardNumber,
              expMonth: data.expiryMonth,
              expYear: data.expiryYear,
              cvc: data.cvv
            });

          });
        }
      }
      );
  }


}
