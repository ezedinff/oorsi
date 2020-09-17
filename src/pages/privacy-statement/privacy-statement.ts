import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { OORSI_API_ENDPOINT } from '../../const';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the PrivacyStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-privacy-statement',
  templateUrl: 'privacy-statement.html',
})
export class PrivacyStatementPage {

  privacyStatement: any = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    debugger;
    console.log('ionViewDidLoad TermsAndConditionsPage');
    this.http.get(OORSI_API_ENDPOINT + 'privacyStatement', { responseType: 'text' }).subscribe(data => { this.privacyStatement = data }, error => {
      this.http.get('assets/html/privacyStatement.html', { responseType: 'text' }).subscribe(data => this.privacyStatement = data)
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
