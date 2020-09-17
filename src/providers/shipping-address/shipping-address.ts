import { Address } from './../../model/address';
import { OORSI_API_ENDPOINT } from './../../const';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../model/order';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ShippingAddressProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ShippingAddressProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ShippingAddressProvider Provider');
  }

  getShippingMethods(): Observable<Address[]> {
    return this.http.get<Address[]>(OORSI_API_ENDPOINT + 'address/all');
  }

  addShippingMethod(address: Address): Observable<Address> {
    return this.http.get<Address> (OORSI_API_ENDPOINT + 'address/save');
  }

  getShippingAddress(shppingAddressID: number) {
    
  }

}
