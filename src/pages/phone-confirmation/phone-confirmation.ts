import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneNumberProvider } from '../../providers/phone-number/phone-number';
import { NgForm } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the PhoneConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phone-confirmation',
  templateUrl: 'phone-confirmation.html',
})
export class PhoneConfirmationPage {

  errors: Error[] = [];
  loading: boolean = false;

  popTo: any;

  constructor(public navController: NavController, public navParams: NavParams, private phoneNumberProvider: PhoneNumberProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPhonePage');
  }

  save(from: NgForm) {
    this.loading = true;
    this.phoneNumberProvider.confirmPhoneNumber(from.value).subscribe(data => {
      this.loading = false;
      this.closePage();
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  closePage() {
    if (this.popTo) {
      this.navController.popTo(this.popTo);
    } else {
      this.navController.setRoot(TabsPage)
    }
  }

  skip() {
    this.closePage();
  }


}
