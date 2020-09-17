import { TermsAndConditionsPage } from './../terms-and-conditions/terms-and-conditions';
import { TabsPage } from './../tabs/tabs';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Error } from './../../model/error';
import { LoginPage } from '../login/login';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Component, EventEmitter } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { PrivacyStatementPage } from '../privacy-statement/privacy-statement';
import { AddPhonePage } from '../add-phone/add-phone';
import { Storage } from '@ionic/storage';
import { BIRTHDAY_SAVED } from '../../const';
import { AddBirthdayPage } from '../add-birthday/add-birthday';

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {

    error: string;
    myForm: FormGroup;

    submitAttempt: boolean = false;
    loading: boolean = false;

    popTo: any;

    constructor(private navParams: NavParams, private authService: AuthService, private formBuilder: FormBuilder,
        private navController: NavController, private fb: Facebook, private modalController: ModalController, private storage: Storage) {
        this.myForm = this.formBuilder.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            birthDate: [],
            fbat: []
        });

        this.authService.authenticationChanged.subscribe(data => {
            if (data == true) {
                this.closePage();
            }
        });

    }

    ionViewDidLoad() {
        this.popTo = this.navParams.get("popTo");
    }


    ionViewDidEnter() {

        if (this.navParams.get('fbat')) {
            this.loading = true;
            this.authService.getFBUserInfo(this.navParams.get('fbat')).subscribe(user => {
                this.myForm.patchValue({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    fbat: this.navParams.get('fbat')
                })
                this.loading = false;
            }, err => { this.loading = false });

        }

    }

    register() {
        this.submitAttempt = true;
        if (this.myForm.valid) {
            this.loading = true;

            this.authService.register(this.myForm.value).then(
                result => {
                    debugger;
                    if (this.myForm.value.birthday) {
                        this.closePage();
                    } else {
                        this.navController.push(AddBirthdayPage, { popTo: this.popTo });
                    }
                    this.loading = false;
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

    login() {
        this.navController.push(LoginPage, { popTo: this.popTo });

    }

    isValid(errorObject): boolean {
        if (errorObject || errorObject == null) {
            return true;
        } else {
            return false;
        }
    }

    onFacebookLoginClick() {
        console.log("onFacebookLoginClick");
        this.loading = true;

        this.fb.login(['email', 'public_profile', 'user_friends'])
            .then((response: FacebookLoginResponse) => {
                if (response.status === "connected") {
                    this.authService.facebookLogin(response.authResponse.accessToken).then(
                        data => {
                            console.log(response);
                            if (data === true) {
                                this.closePage();
                            } else {
                                this.authService.getFBUserInfo(response.authResponse.accessToken).subscribe(user => {
                                    console.log(user);
                                    this.loading = false;
                                    this.myForm.patchValue({
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        fbat: response.authResponse.accessToken
                                    });
                                });
                            }
                        }).catch(err => {
                            console.log(err);
                            location.reload;
                            this.loading = false;
                        });
                }
            })
            .catch(e => {
                console.log('Error logging into Facebook', e);
                this.loading = false;
            });




    }

    closePage() {
        if (this.popTo) {
            this.navController.popTo(this.popTo);
        } else {
            this.navController.setRoot(TabsPage)
        }
    }


    openPrivacyStatement() {
        this.modalController.create(PrivacyStatementPage).present();
    }

    openTermsAndConditions() {
        this.modalController.create(TermsAndConditionsPage).present();
    }

    test() {
        this.navController.push(AddBirthdayPage, { popTo: this.popTo });
    }

}
