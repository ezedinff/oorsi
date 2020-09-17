import { CartPage } from './../../pages/cart/cart';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartProvider } from '../../providers/cart-provider';

/*
  Generated class for the AddToCartButton component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'add-to-cart-button',
  templateUrl: 'add-to-cart-button.html'
})
export class AddToCartButtonComponent implements OnInit {

  cartSize: number;
  cartUpdatedEmmiter: EventEmitter<number>;

  constructor(private navCtrl: NavController, private cartProvider: CartProvider) {
    this.cartUpdatedEmmiter = this.cartProvider.cartUpdated;
  }

  ngOnInit() {

    this.cartProvider.getCartSize().subscribe(data => {
      console.log('getCartSize cart size:' + data);
      this.cartSize = data;
    });
    this.cartUpdatedEmmiter.subscribe(data => {
      console.log('cartUpdatedEmmiter cart size:' + data);
      this.cartSize = data;
    });
  }


  goToCart() {
    this.navCtrl.push(CartPage);
  }


}
