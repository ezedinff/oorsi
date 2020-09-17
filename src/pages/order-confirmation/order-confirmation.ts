import { OrderProvider } from './../../providers/order-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OrderConfirmation page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html'
})
export class OrderConfirmationPage {

  private order: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderProvider) { }

  ionViewDidEnter() {
    this.orderService.getOrder(this.navParams.get('orderId'))
      .subscribe(
      data => {
        this.order = data;
      }
      )
  }

}
