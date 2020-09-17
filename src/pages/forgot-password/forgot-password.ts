import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Error } from '../../model/error';
import { PasswordResetPage } from '../password-reset/password-reset';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  myForm: FormGroup;
  submitAttempt: boolean = false;
  loading: boolean = false;

  popTo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService) {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.popTo = this.navParams.get("popTo");
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  requestCode() {

    this.submitAttempt = true;
    if (this.myForm.valid) {
      this.loading = true;
      this.authService.requestCode(this.myForm.value).subscribe(
        result => {
          console.log("resetPassword success" + result);
          this.loading = false;
          this.navCtrl.push(PasswordResetPage, { popTo: this.popTo });
        },
        err => {
          console.log("resetPassword failure" + err);
          this.loading = false
          let errors: Error[] = err.error;
          for (let error of errors) {
            if (this.myForm.controls[error.fieldName]) {
              this.myForm.controls[error.fieldName].setErrors({ remote: error.message });
            }
          }
        });
    }

  }

}
