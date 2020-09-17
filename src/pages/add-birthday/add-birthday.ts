import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { BirthdayProvider } from '../../providers/birthday/birthday';
import { ProductSearchTypePage } from '../product-search-type/product-search-type';

/**
 * Generated class for the AddBirthdayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-birthday',
  templateUrl: 'add-birthday.html',
})
export class AddBirthdayPage {

  errors: Error[] = [];
  loading: boolean = false;

  popTo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private birthdayProvider: BirthdayProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddBirthdayPage');
  }

  save(from: NgForm) {
    this.loading = true;
    this.birthdayProvider.addBirthday(from.value).subscribe(data => {
      this.loading = false;
      this.navCtrl.push(ProductSearchTypePage, { popTo: this.popTo });
    }, error => {
      this.loading = false;
      console.log(error);
    })
  }

}
