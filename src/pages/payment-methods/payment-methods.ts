import { AuthService } from './../../providers/auth.service';
import { Card } from './../../model/card';
import { PaymentProvider } from './../../providers/payment-provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddPaymentMethodComponent } from '../../components/add-payment-method/add-payment-method';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the PaymentMethodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html',
})
export class PaymentMethodsPage {

  paymentMethods: Card[] = [];

  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private paymentProvider: PaymentProvider,
    private authService: AuthService, private modalController: ModalController, public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodsPage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter PaymentMethodsPage');
    this.loading = true;
    this.paymentProvider.getAllPayments().subscribe(data => {
      this.paymentMethods = data;
      this.loading = false;
    }, err => {
      this.loading = false;
      this.authService.checkError(err);
    });
  }

  addPaymentMethod() {
    let paymentMethodModal = this.modalController.create(AddPaymentMethodComponent);
    paymentMethodModal.onDidDismiss(data => {
      if (data) {
        this.paymentMethods.push(data);
      }
    });
    paymentMethodModal.present()
  }

  cardOptions(card: Card) {
    if (this.loading) {
      return;
    }
    let actionSheet = this.actionSheetController.create({
      title: card.brand + ' ending in ' + card.last4,
      buttons: [
        // {
        //   text: 'Set as Default',
        //   handler: () => {
        //     this.loading = true;
        //     this.paymentProvider.changeDefaultCard(card).subscribe(data => {
        //       this.loading = false;
        //       this.ionViewDidEnter();
        //     }, err => {
        //       this.loading = false;
        //       this.ionViewDidEnter();
        //     });
        //   }
        // },
         {
          text: 'Delete',
          handler: () => {
            this.loading = true;
            this.paymentProvider.deleteCard(card).subscribe(data => {
              this.loading = false;
              this.ionViewDidEnter();
            }, err => {
              this.authService.checkError(err);
              this.ionViewDidEnter();
              this.loading = false;
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
