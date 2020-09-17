import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OORSI_API_ENDPOINT } from '../../const';



/*
  Generated class for the PushNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PushNotificationProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PushNotificationProvider Provider');
  }

  public savePlayerIDs() {
    console.log('PushNotificationProvider savePlayerIDs');
    window["plugins"].OneSignal.getIds(ids => {
      console.log(JSON.stringify(ids));
      this.http.post(OORSI_API_ENDPOINT + 'push/savePlayerID', ids['userId']).subscribe();
    });
  }

  public deletePlayerIDs() {
    console.log('PushNotificationProvider deletePlayerIDs');
    this.http.post(OORSI_API_ENDPOINT + 'push/deletePlayerID', null).subscribe();

  }

}
