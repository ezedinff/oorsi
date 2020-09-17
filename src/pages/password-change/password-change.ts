import { Toast } from '@ionic-native/toast';
import { Error } from './../../model/error';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { UserManagementProvider } from '../../providers/user-management-provider';

/**
 * Generated class for the PasswordChangePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {

  myForm: FormGroup;
  submitAttempt: boolean = false;
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService, private toast: Toast, private userManagementProvider: UserManagementProvider) {
    this.myForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  changePassword() {

    this.submitAttempt = true;
    this.loading = true;
    if (this.myForm.valid) {
      this.userManagementProvider.changePassword(this.myForm.value).subscribe(
        result => {
          this.toast.showShortCenter('Password Changed Successfuly');
          this.navCtrl.pop();
        },
        err => {
          this.loading = false;
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
