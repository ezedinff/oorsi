import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OORSI_API_ENDPOINT } from '../../const';

/*
  Generated class for the BirthdayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BirthdayProvider {

  constructor(public http: HttpClient) {
    console.log('Hello BirthdayProvider Provider');
  }

  addBirthday(birthday): Observable<void> {
    return this.http.post<void>(OORSI_API_ENDPOINT + 'user/birthday/save', birthday);
  }

}
