
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OORSI_API_ENDPOINT } from '../const';
import { Address } from '../model/address';
import { HttpClient, HttpParams } from '@angular/common/http';

/*
  Generated class for the AddressProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AddressProvider {

  constructor(private http: HttpClient) { }

  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(OORSI_API_ENDPOINT + 'address/all');
  }

  validateAddress(address: string): Observable<string> {
    let searchParams = new HttpParams();
    searchParams.append("address", address);
    return this.http.get<string>('https://maps.googleapis.com/maps/api/geocode/json', { params: searchParams });
  }

  saveAddress(address): Observable<Address> {
    return this.http.post<Address>(OORSI_API_ENDPOINT + 'address/save', address);
  }

  getAddress(id: number): Observable<Address> {
    return this.http.get<Address>(OORSI_API_ENDPOINT + 'address/' + id + '/get');
  }

  makeDefault(address): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'address/' + address.id + '/makeDefault', null);
  }

  delete(address): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'address/' + address.id + '/delete', null);
  }



}
