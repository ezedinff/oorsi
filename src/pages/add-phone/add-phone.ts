import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneNumberProvider } from '../../providers/phone-number/phone-number';
import { TabsPage } from '../tabs/tabs';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { NgForm } from '@angular/forms';
import { PhoneConfirmationPage } from '../phone-confirmation/phone-confirmation';

/**
 * Generated class for the AddPhonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-phone',
  templateUrl: 'add-phone.html',
})
export class AddPhonePage {

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
    this.phoneNumberProvider.savePhoneNumber(from.value).subscribe(data => {
      this.loading = false;
      this.navController.push(PhoneConfirmationPage, { popTo: this.popTo });
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

  skip() {
    this.phoneNumberProvider.phoneNumberRequested();
    this.closePage();
  }

  closePage() {
    if (this.popTo) {
      this.navController.popTo(this.popTo);
    } else {
      this.navController.setRoot(TabsPage)
    }
  }



}
