import { NavController } from 'ionic-angular';
import { FacebookFriendsPage } from './../../pages/facebook-friends/facebook-friends';
import { Component } from '@angular/core';

/**
 * Generated class for the FacebookFriendsButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'facebook-friends-button',
  templateUrl: 'facebook-friends-button.html'
})
export class FacebookFriendsButtonComponent {


  constructor(private navCtrl: NavController) {
    console.log('Hello FacebookFriendsButtonComponent Component');
  }

  facebookFriends() {
    this.navCtrl.push(FacebookFriendsPage);
  }


}
