import { AddShippingAddressPage } from './../add-shipping-address/add-shipping-address';
import { Card } from './../../model/card';
import { AddPaymentMethodComponent } from '../../components/add-payment-method/add-payment-method';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentProvider } from '../../providers/payment-provider';
import { AddressProvider } from './../../providers/address-provider';
import { Address } from './../../model/address';
import { CheckoutProvider } from './../../providers/checkout';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../model/user';
import { CartProduct } from '../../model/cartProduct';
import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';
import { Observable } from 'rxjs/Observable';

// import {Observable} from 'rxjs/Rx';

/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-checkout',
    templateUrl: 'checkout.html'
})
export class CheckoutPage {

    user: User;

    addresses: Address[] = [];
    paymentMethods: Card[] = [];

    myForm: FormGroup;

    submitAttempt: boolean = false;

    private loading: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private checkoutService: CheckoutProvider, private addressService: AddressProvider, private paymentService: PaymentProvider, private formBuilder: FormBuilder, private modalController: ModalController) {

        this.myForm = this.formBuilder.group({
            shipTo: [1],
            shippingAddress: [],
            paymentMethod: [null, Validators.required]
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CheckoutPage');
    }

    // ionViewDidEnter() {
    //     this.loading = true;
    //     console.log('test ' + JSON.stringify(Observable));
    //     Observable.forkJoin([this.checkoutService.getCheckoutProducts(this.navParams.get('forUser')),
    //     this.addressService.getAllAddresses(),
    //     this.paymentService.getAllPayments()]).subscribe((result: any) => {
    //         let cartProducts: CartProduct[] = result[0];
    //         if (cartProducts && null != cartProducts && cartProducts.length > 0) {
    //             this.user = new User(cartProducts[0].forUser);
    //             for (let cartProduct of cartProducts) {
    //                 this.user.addCartProduct(cartProduct);
    //             }
    //         }

    //         this.addresses = result[1];
    //         this.paymentMethods = result[2];
    //         this.loading = false;
    //     })

    // }

    ionViewDidEnter() {
        this.checkoutService.getCheckoutProducts(this.navParams.get('forUser')).subscribe(data => {
            let cartProducts: CartProduct[] = data;
            if (cartProducts && null != cartProducts && cartProducts.length > 0) {
                this.user = new User(cartProducts[0].forUser);
                for (let cartProduct of cartProducts) {
                    this.user.addCartProduct(cartProduct);
                }
            }
        });
        this.addressService.getAllAddresses().subscribe(data => this.addresses = data);
        this.paymentService.getAllPayments().subscribe(data =>
            this.paymentMethods = data
        );

    }

    placeOrder() {
        this.submitAttempt = true;
        if (this.myForm.valid) {
            this.myForm.value.forUser = this.user.userID;
            this.checkoutService.submitOrder(this.myForm.value).subscribe(data => {
                this.navCtrl.setRoot(OrderConfirmationPage, { orderId: data.id });

            });
        }
    }

    addPaymentMethod() {
        let paymentMethodModal = this.modalController.create(AddPaymentMethodComponent);
        paymentMethodModal.onDidDismiss(data => {
            if (data) {
                this.paymentMethods.push(data);
                this.myForm.setValue({
                    paymentMethod: data.id,
                });
            }
        });
        paymentMethodModal.present()
    }

    addShippingAddress() {
        let modal = this.modalController.create(AddShippingAddressPage);
        modal.onDidDismiss(data => {
            if (data) {
                this.addresses.push(data);
                this.myForm.setValue({
                    shippingAddress: data.id,
                });
            }
        });
        modal.present()
    }

}
