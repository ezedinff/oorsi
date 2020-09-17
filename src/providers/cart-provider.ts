import { CartProduct } from './../model/cartProduct';
import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';


import { OORSI_API_ENDPOINT } from '../const';
import { Product } from '../model/product';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CartProvider {

  cartUpdated: EventEmitter<number>;

  constructor(private http: HttpClient) {
    this.cartUpdated = new EventEmitter<number>();
  }

  getCart(): Observable<CartProduct[]> {

    return this.http.get<CartProduct[]>(OORSI_API_ENDPOINT + 'cart/products');
  }

  getCartSize(): Observable<number> {

    return this.http.get<number>(OORSI_API_ENDPOINT + 'cart/size');
  }

  updateCartSize(): void {
    this.getCartSize().subscribe(data => this.cartUpdated.emit(data));
  }

  deleteCartProduct(cartProduct: CartProduct): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      this.http.post(OORSI_API_ENDPOINT + 'cart/remove',
        {
          forId: cartProduct.forUser.userID,
          productId: cartProduct.product.productId
        },
        { responseType: 'text' }
      ).subscribe(data => {
        console.log('CartProvider')
        this.updateCartSize();
        resolve(data)
      });
    });
  }

  addProductToCart(product: Product, to?: User) {

    let cartProduct;

    if (null != product.productId) {
      cartProduct = { 'productId': product.productId }
    } else {
      cartProduct = { 'retailer': product.retailerId, 'sku': product.sku }
    }

    if (to) {
      cartProduct.to = to.userID;
    }

    return new Promise<any>((resolve, reject) => {
      this.http.post(OORSI_API_ENDPOINT + 'cart/add', cartProduct).subscribe(data => {
        this.updateCartSize();
        resolve(data);
      })
    });
  }

  updateCartProduct(cartProduct: CartProduct): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http.post(OORSI_API_ENDPOINT + 'cart/product/update', { to: cartProduct.forUser.userID, productId: cartProduct.product.productId, quantity: cartProduct.quantity }).subscribe(data => {
        this.updateCartSize();
        resolve(data);
      });
    })
  }


}
