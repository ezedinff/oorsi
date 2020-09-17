import { Order } from './../model/order';
import { OORSI_API_ENDPOINT } from './../const';
import { Observable } from 'rxjs/Observable';


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the OrderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrderProvider {

  constructor(private authHttp: HttpClient) { }


  getOrder(orderID: number): Observable<any> {
    return this.authHttp.get(OORSI_API_ENDPOINT + 'order/id/' + orderID);
  }

  getAllOrders(): Observable<Order[]> {
    return this.authHttp.get<Order[]>(OORSI_API_ENDPOINT + 'order/all');
  }

}
