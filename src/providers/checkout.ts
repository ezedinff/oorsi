
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { OORSI_API_ENDPOINT } from '../const';
import { CartProduct } from '../model/cartProduct';

/*
  Generated class for the Checkout provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CheckoutProvider {

  constructor(private http: HttpClient) { }

  getCheckoutProducts(forUser?: number): Observable<CartProduct[]> {
    return this.http.get<CartProduct[]> (OORSI_API_ENDPOINT + 'checkout/products/' + forUser);
  }

  submitOrder(checkoutForm: any): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'order/submit', checkoutForm);
  }

}
