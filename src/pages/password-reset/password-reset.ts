import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Error } from '../../model/error';

/**
 * Generated class for the PasswordResetPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  myForm: FormGroup;
  submitAttempt: boolean = false;
  loading: boolean = false;

  popTo: any;

  constructor(public navController: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService) {
    this.myForm = this.formBuilder.group({
      token: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });

    this.authService.authenticationChanged.subscribe(data => {
      if (data == true) {
        this.closePage();
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
    this.popTo = this.navParams.get("popTo");

  }

  resetPassword() {

    this.submitAttempt = true;
    this.loading = true;
    if (this.myForm.valid) {
      this.authService.resetPassword(this.myForm.value).then(
        result => {
          this.loading = false;
          this.closePage();
        }
      ).catch(err => {
        this.loading = false;
        let errors: Error[] = err.error;
        for (let error of errors) {
          if (this.myForm.controls[error.fieldName]) {
            this.myForm.controls[error.fieldName].setErrors({ remote: error.message });
          }
        }
      });
    } else {
    }

  }

  closePage() {
    if (this.popTo) {
      this.navController.popTo(this.popTo);
    } else {
      this.navController.setRoot(TabsPage)
    }
  }

}
