import { FriendSearchPagePage } from './../../pages/friends/friend-search-page/friend-search-page';
import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FriendSearchInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'friend-search-input',
  templateUrl: 'friend-search-input.html'
})
export class FriendSearchInputComponent {

  @Input() searchString: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendSearchInputPagePage');
  }


  onSearch() {
    if (this.searchString && !/^\s*$/.test(this.searchString)) {
      this.navCtrl.push(FriendSearchPagePage, { searchString: this.searchString })
    }
  }

}
