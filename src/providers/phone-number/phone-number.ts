import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhoneNumber } from '../../model/phoneNumber';
import { OORSI_API_ENDPOINT } from '../../const';
import { PhoneNumberConfirmation } from '../../model/phoneNumberConfirmation';
import { Contact } from '@ionic-native/contacts';
import { User } from '../../model/user';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PhoneNumberProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PhoneNumberProvider {

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello PhoneNumberProvider Provider');
  }

  savePhoneNumber(phoneNumber: PhoneNumber): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'user/phoneNumber/save', phoneNumber);
  }

  confirmPhoneNumber(phoneNumberConfirmation: PhoneNumberConfirmation): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'user/phoneNumber/confirm', phoneNumberConfirmation);
  }

  searchPhoneNumber(contacts: string[]): Observable<PhoneNumber[]> {
    return this.http.post<PhoneNumber[]>(OORSI_API_ENDPOINT + 'phoneNumber/search', contacts);
  }

  formatPhoneNumber(phoneNumber: string): string {
    let formattedString: string = phoneNumber.replace(/\D/g, '');
    if (formattedString.startsWith("1")) {
      return "+" + formattedString;
    } else {
      return "+1" + formattedString;
    }
  }

  phoneNumberRequested() {
    this.storage.set('PHONE_NUMBER_REQUESTED', true)
  }

  isPhoneNumberRequested(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.storage.get('PHONE_NUMBER_REQUESTED').then(data => {
        if (data == true) {
          resolve(true);
        } else {
          resolve(false);
        }
      }).catch(err => resolve(false))
    })
  }

  hasPhoneNumber(): Observable<boolean> {
    return this.http.get<boolean>(OORSI_API_ENDPOINT + 'phoneNumber/hasPhoneNumber');
  }

}
