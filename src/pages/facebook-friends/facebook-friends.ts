import { AuthService } from '../../providers/auth.service';
import { User } from './../../model/user';
import { Facebook } from '@ionic-native/facebook';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the FacebookFriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-facebook-friends',
  templateUrl: 'facebook-friends.html',
})
export class FacebookFriendsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookFriendsPage');
  }


}
