import { Observable } from 'rxjs/Observable';
import { OORSI_API_ENDPOINT } from './../const';

import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public authHttp: HttpClient) {
    console.log('Hello ProfileProvider Provider');
  }

  getUserInfo(id: number): Observable<User> {
    return this.authHttp.get<User>(OORSI_API_ENDPOINT + "p/" + id + "/info.json");
  }

}
