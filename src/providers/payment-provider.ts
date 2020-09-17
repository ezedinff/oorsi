import { OORSI_API_ENDPOINT } from './../const';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Observable } from 'rxjs/Observable';

import { Card } from '../model/card';

/*
  Generated class for the PaymentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PaymentProvider {


  constructor(private authHttp: HttpClient) {

  }


  sendToken(token: any, setAsDefault: boolean): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + "payment/add", { token: token.id, setAsDefault: setAsDefault });
  }

  getAllPayments(): Observable<Card[]> {
    return this.authHttp.get<Card[]>(OORSI_API_ENDPOINT + 'payment/all');
  }
  deleteCard(card: Card): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + 'payment/' + card.id + '/delete', null);
  }

  changeDefaultCard(card: Card): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + 'payment/' + card.id + '/default', null);
  }

}
