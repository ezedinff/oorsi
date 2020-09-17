import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressProvider } from '../../providers/address-provider';
import { AuthService } from '../../providers/auth.service';

/**
 * Generated class for the AddShippingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-shipping-address',
  templateUrl: 'add-shipping-address.html',
})
export class AddShippingAddressPage {

  myForm: FormGroup;
  errorText: string;

  submitAttempt: boolean;
  loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, fb: FormBuilder, private addressProvider: AddressProvider, private authService: AuthService) {
    this.myForm = fb.group({
      'name': ["", Validators.required],
      'address1': ["", Validators.required],
      'address2': [""],
      'city': ["", Validators.required],
      'state': ["", Validators.required],
      'zip': ["", [Validators.required]],
      'phoneNumber': ["", [Validators.required]]

    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddShippingAddressPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.submitAttempt = true;

    if (this.myForm.valid) {
      this.loading = true;
      this.addressProvider.saveAddress(this.myForm.value).subscribe(data => {
        this.viewCtrl.dismiss(data);
        this.loading = false;
      }, err => {
        this.loading = false;
        if (!this.authService.checkError(err)) {

        }
      });
    }
  }

}
