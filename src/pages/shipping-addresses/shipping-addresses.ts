import { Address } from './../../model/address';
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address-provider';
import { AuthService } from '../../providers/auth.service';
import { AddShippingAddressPage } from '../add-shipping-address/add-shipping-address';
import { EditShippingAddressPage } from '../edit-shipping-address/edit-shipping-address';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the ShippingAddressesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shipping-addresses',
  templateUrl: 'shipping-addresses.html',
})
export class ShippingAddressesPage {

  addresses: Address[] = [];
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private addressProvider: AddressProvider,
    public authService: AuthService, private modalController: ModalController, public actionSheetController: ActionSheetController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShippingAddressesPage');
  }


  ionViewDidEnter() {
    console.log('ionViewDidLoad ShippingAddressesPage');
    this.loading = true;
    this.addressProvider.getAllAddresses().subscribe(data => {
      this.addresses = data;
      this.loading = false;
    },
      err => {
        this.authService.checkError(err);
        this.loading = false;
      })
  }

  addShippingAddress() {
    let modal = this.modalController.create(AddShippingAddressPage);
    modal.onDidDismiss(data => {
      if (data) {
        this.addresses.push(data);
      }
    });
    modal.present();
  }

  editShippingAddress(address: Address) {
    let modal = this.modalController.create(EditShippingAddressPage, { address: address });
    modal.onDidDismiss((data: Address) => {
      if (data) {
        let updated: boolean = false;
        this.addresses.forEach((address, i) => {
          if (data.id == address.id) {
            this.addresses[i] = data;
            updated = true;
          }
        });
        if (!updated) {
          this.addresses.push(data);
        }


      }
    });
    modal.present();

  }

  shippingAddressOptions(address: Address) {
    if (this.loading) {
      return;
    }
    let actionSheet = this.actionSheetController.create({
      title: address.address1,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.editShippingAddress(address);
          }
        }, {
          text: 'Set as Default',
          handler: () => {
            this.addressProvider.makeDefault(address).subscribe(data => {
              console.log(this.addresses.indexOf(address));
              this.addresses.forEach((item, i) => {
                item.default = false;
              });
              address.default = true;
            }, err => {
              this.authService.checkError(err)
            });
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.addressProvider.delete(address).subscribe(data => {
              this.ionViewDidEnter();
            }, err => {
              this.authService.checkError(err)
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }




}
