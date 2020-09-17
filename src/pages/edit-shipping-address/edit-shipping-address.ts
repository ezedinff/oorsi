import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { FormBuilder } from '@angular/forms';
import { AddressProvider } from '../../providers/address-provider';
import { AuthService } from '../../providers/auth.service';
import { Validators } from '@angular/forms';

/**
 * Generated class for the EditShippingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-shipping-address',
  templateUrl: 'edit-shipping-address.html',
})
export class EditShippingAddressPage {

  myForm: FormGroup;
  errorText: string;

  submitAttempt: boolean;

  loading: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, fb: FormBuilder, private addressProvider: AddressProvider, private authService: AuthService) {

    this.myForm = fb.group({
      'id': [''],
      'name': ['', Validators.required],
      'address1': ['', Validators.required],
      'address2': [''],
      'city': ['', Validators.required],
      'state': ['', Validators.required],
      'zip': ['', [Validators.required]],
      'phoneNumber': ['', [Validators.required]]
      
    })

  }

  ionViewDidLoad() {
    console.log('EditShippingAddressPage ionViewDidLoad');
    this.loading = true;
    if (this.navParams.get('address')) {
      this.addressProvider.getAddress(this.navParams.get('address').id).subscribe(address => {
        this.loading = false;
        if (address) {
          this.myForm.patchValue({
            'id': address.id,
            'name': address.name,
            'address1': address.address1,
            'address2': address.address2,
            'city': address.city,
            'state': address.state,
            'zip': address.zip,
            'phoneNumber': address.phoneNumber
          });
        }

      }, err => {
        !this.authService.checkError(err);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit() {
    this.submitAttempt = true;
    if (this.myForm.valid) {
      this.loading = true;
      this.addressProvider.saveAddress(this.myForm.value).subscribe(data => {
        this.loading = false;
        this.viewCtrl.dismiss(data);
      }, err => {
        this.authService.checkError(err);
        this.loading = false;
      });
    }
  }


}
