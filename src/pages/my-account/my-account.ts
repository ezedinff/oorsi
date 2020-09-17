import { User } from './../../model/user';
import { About } from '../about/about';
import { PasswordChangePage } from './../password-change/password-change';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserManagementProvider } from '../../providers/user-management-provider';
import { ShippingAddressesPage } from '../shipping-addresses/shipping-addresses';
import { PaymentMethodsPage } from '../payment-methods/payment-methods';
import { MyProfilePage } from '../my-profile/my-profile';
import AuthenticatedPage from '../authenticated-page';
import { AuthService } from '../../providers/auth.service';
import { AddPhonePage } from '../add-phone/add-phone';

/**
 * Generated class for the MyAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage extends AuthenticatedPage {

  loggedInUser: User;

  constructor(navCtrl: NavController, public navParams: NavParams,
    private userManagementProvider: UserManagementProvider, authService: AuthService) {
    super(authService, navCtrl);

  }

  ionViewDidLoad() {
    this.loggedInUser = this.userManagementProvider.loggedInUser;
    this.userManagementProvider.userInfoEmmiter.subscribe(data => this.loggedInUser = data);
  }

  openMyProfilePage() {
    this.navCtrl.push(MyProfilePage);
  }

  changePassword() {
    this.navCtrl.push(PasswordChangePage);
  }

  openAboutPage() {
    this.navCtrl.push(About);
  }

  shippingMethods() {
    this.navCtrl.push(ShippingAddressesPage);
  }

  paymentCards() {
    this.navCtrl.push(PaymentMethodsPage);
  }

  addPhoneNumber() {
    this.navCtrl.push(AddPhonePage, { popTo: MyAccountPage })
  }

}
