import { Observable } from 'rxjs/Observable';
import { OORSI_API_ENDPOINT } from './../const';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { WishListProduct } from '../model/wishlistproduct';
import { Activity } from '../model/activity';
import { HttpParams } from '@angular/common/http';

/*
  Generated class for the NewsFeedProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ActivityProvider {

  constructor(private authHttp: HttpClient) {
    console.log('Hello NewsFeedProvider Provider');
  }


  getNewsFeed(fromDate?: Date): Observable<Activity[]> {
    let params: HttpParams = new HttpParams();
    if (fromDate) {
      params.append('fromDate', '' + fromDate);
    }
    return this.authHttp.get<Activity[]>(OORSI_API_ENDPOINT + 'news/json', { params: params });
  }

  getActivityForUser(userId: number, fromDate?: Date): Observable<Activity[]> {
    return this.authHttp.get<Activity[]>(OORSI_API_ENDPOINT + 'activity/forUser/' + userId);
  }

  getActivity(id: number): Observable<Activity> {
    return this.authHttp.get<Activity>(OORSI_API_ENDPOINT + 'activity/' + id + '/detail.json');
  }

  like(activity: Activity): Observable<any> {

    return this.authHttp.post(OORSI_API_ENDPOINT + 'activity/like', activity.id);
  }

  unlike(activity: Activity): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + 'activity/unlike', activity.id);
  }

  comment(activity: Activity, comment: string): Observable<any> {
    return this.authHttp.post(OORSI_API_ENDPOINT + 'activity/comment/add', { activityId: activity.id, comment: comment });
  }

  getCommentsForActivity(activityId: number): Observable<Comment[]> {
    return this.authHttp.get<Comment[]>(OORSI_API_ENDPOINT + 'activity/' + activityId + "/comments.json");
  }

}
