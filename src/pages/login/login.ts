import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { TabsPage } from '../tabs/tabs';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';
import { PhoneNumberProvider } from '../../providers/phone-number/phone-number';
import { AddPhonePage } from '../add-phone/add-phone';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  errors: Error[] = [];
  loading: boolean = false;

  popTo: any;

  constructor(private authService: AuthService,
    private navController: NavController,
    private navParams: NavParams,
    private fb: Facebook,
    private phoneNumberProvider: PhoneNumberProvider) {
    this.authService.authenticationChanged.subscribe(data => {
      if (data == true) {
        this.closePage();
      }
    });

  }



  ionViewDidLoad() {
    this.popTo = this.navParams.get("popTo");
    console.log('ionViewDidLoad LoginPage' + this.popTo);

  }

  ionViewDidEnter() {
    this.loading = false;
    console.log('ionViewDidEnter LoginPage');
  }

  onLogin(ngForm: NgForm) {

    this.loading = true;
    this.authService.login(ngForm.value.email, ngForm.value.password).then(
      data => {
        this.loading = false;

        if (data == true) {
          // this.phoneNumberProvider.isPhoneNumberRequested().then(data => {
          //   if (data) {
          //     this.closePage();
          //   } else {
          //     this.phoneNumberProvider.hasPhoneNumber().subscribe(data => {
          //       if (data) {
          //         this.closePage()
          //       } else {
          //         this.navController.push(AddPhonePage, { popTo: this.popTo });
          //       }
          //     })
          //   }
          // })
          this.closePage();

        }
      },

    ).catch(err => {
      console.log('Error logging in ' + JSON.stringify(err.error))
      this.loading = false;
      this.errors = err.error;
    });
  }

  register() {
    this.navController.push(RegisterPage, { popTo: this.popTo });
  }

  onFacebookLoginClick() {
    console.log("onFacebookLoginClick");
    this.loading = true;

    this.fb.login(['email', 'public_profile', 'user_friends'])
      .then((response: FacebookLoginResponse) => {
        this.loading = false;
        if (response.status === "connected") {
          this.loginUsingFacebookToken(response.authResponse.accessToken);
        }
      })
      .catch(e => {
        console.log('Error logging into Facebook', e);
        this.loading = false;
      });


  }

  loginUsingFacebookToken(token: string) {
    console.log('loginUsingFacebookToken');
    this.loading = true;
    this.authService.facebookLogin(token).then(
      data => {
        this.loading = false;
        if (data == true) {
          this.phoneNumberProvider.isPhoneNumberRequested().then(data => {
            if (data) {
              this.closePage();
            } else {
              this.phoneNumberProvider.hasPhoneNumber().subscribe(data => {
                if (data) {
                  this.closePage()
                } else {
                  this.navController.push(AddPhonePage, { popTo: this.popTo });
                }
              })
            }
          })

        } else {
          this.navController.push(RegisterPage, { fbat: token, popTo: this.popTo })
        }

      }).catch(err => {
        console.log(JSON.stringify(err));
        this.loading = false;
      })
  }

  forgotPassword() {
    if (this.loading) {
      return;
    }
    this.navController.push(ForgotPasswordPage, { popTo: this.popTo });
  }

  closePage() {
    if (this.popTo) {
      this.navController.popTo(this.popTo);
    } else {
      this.navController.setRoot(TabsPage)
    }
  }

}
