import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { OORSI_API_ENDPOINT } from '../../const';

/**
 * Generated class for the TermsAndConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {

  termsAndConditions: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    debugger;
    console.log('ionViewDidLoad TermsAndConditionsPage');
    this.http.get(OORSI_API_ENDPOINT + 'termsAndConditions', { responseType: 'text' }).subscribe(data => { this.termsAndConditions = data }, error => {
      this.http.get('assets/html/termsAndConditions.html', { responseType: 'text' }).subscribe(data => this.termsAndConditions = data)
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
