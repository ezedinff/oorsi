import { OrderProvider } from './../../providers/order-provider';
import { Order } from './../../model/order';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import AuthenticatedPage from '../authenticated-page';

/*
  Generated class for the OrderList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-list',
  templateUrl: 'order-list.html'
})
export class OrderListPage extends AuthenticatedPage {

  orders: Order[] = [];

  loading: boolean;

  constructor(private orderService: OrderProvider, navCtrl: NavController, authService: AuthService) {
    super(authService, navCtrl);
    this.loading = true;
  }

  ionViewDidLoad() {
    this.loading = true;
    this.orderService.getAllOrders().subscribe(data => {
      this.orders = data;
      this.loading = false;
    });

  }

}
