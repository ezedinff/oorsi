import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FacebookFriendsPage } from '../facebook-friends/facebook-friends';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the ConnectFacebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-connect-facebook',
  templateUrl: 'connect-facebook.html',
})
export class ConnectFacebookPage {

  popTo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private facebookProvider: FacebookProvider, private fb: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectFacebookPage');
  }

  connectFacebook() {
    this.fb.login(['email', 'public_profile', 'user_friends'])
      .then((response: FacebookLoginResponse) => {
        if (response.status === "connected") {
          this.facebookProvider.connectFacebook(response.authResponse.accessToken).subscribe(
            data => {
              this.navCtrl.push(FacebookFriendsPage, { popTo: this.popTo })
            }
          );
        }
      })
  }

  later(){
    this.closePage();
  }

  closePage() {
    if (this.popTo) {
      this.navCtrl.popTo(this.popTo);
    } else {
      this.navCtrl.setRoot(TabsPage)
    }
  }

}
