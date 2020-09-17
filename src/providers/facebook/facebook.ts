import { User } from './../../model/user';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OORSI_API_ENDPOINT } from '../../const';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FacebookProvider {

  constructor(public http: HttpClient) {
    console.log('Hello FacebookProvider Provider');
  }

  public getFBFriends(accessToken: string): Observable<User[]> {
    return this.http.get<User[]>(OORSI_API_ENDPOINT + 'friends/fb/search?accessToken=' + accessToken);
  }

  public connectFacebook(accessToken: string): Observable<User[]> {
    return this.http.post<any>(OORSI_API_ENDPOINT + 'fb/connect', accessToken);
  }

}
