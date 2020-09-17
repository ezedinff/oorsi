import { AuthService } from './auth.service';
import { OORSI_API_ENDPOINT } from './../const';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';

/*
  Generated class for the Friendship provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Friendship {

  constructor(private http: HttpClient) { }

  public search(s: string): Observable<User[]> {
    return this.http.get<User[]>(OORSI_API_ENDPOINT + 'friends/search?s=' + s);
  }

  public getFriends(user?: User): Observable<User[]> {

    let searchParams = new HttpParams();

    if (user) {
      searchParams.append("userID", "" + user.userID);
    }
    return this.http.get<User[]>(OORSI_API_ENDPOINT + 'friends', { params: searchParams });
  }

  public getFollowers(user?: User): Observable<User[]> {
    let searchParams = new HttpParams();
    searchParams.append("userID", "" + user.userID);
    return this.http.get<User[]>(OORSI_API_ENDPOINT + 'friends/followers', { params: searchParams });
  }

  public follow(user: User) {
    return this.sendFollowUnfollowRequest(user, "friends/follow");
  }

  public unfollow(user: User) {
    return this.sendFollowUnfollowRequest(user, "friends/unfollow");
  }

  public sendFollowUnfollowRequest(user: User, url: string) {

    return this.http.post(OORSI_API_ENDPOINT + url, { userID: user.userID });
  }

}
