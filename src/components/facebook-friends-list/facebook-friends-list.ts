import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { AuthService } from '../../providers/auth.service';
import { FacebookProvider } from '../../providers/facebook/facebook';
import { Facebook } from '@ionic-native/facebook';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';

/**
 * Generated class for the FacebookFriendsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'oorsi-mobile-facebook-friends-list',
  templateUrl: 'facebook-friends-list.html'
})
export class FacebookFriendsListComponent implements OnInit {


  loading: boolean = false;

  users: User[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private facebook: Facebook, private facebookProvider: FacebookProvider, private authService: AuthService) {
    console.log('Hello FacebookFriendsListComponent Component');
  }

  ngOnInit() {
    this.loading = true;
    this.facebook.getLoginStatus().then(response => {
      if (response.status === 'connected') {
        this.searchFBFriends(response.authResponse.accessToken);
      }
      else {
        this.facebook.login(['user_friends']).then(response => {
          if (response.status === 'connected') {
            this.searchFBFriends(response.authResponse.accessToken);
          } else {
            this.loading = false;
          }
        });
      }
    });

  }

  searchFBFriends(accessToken: string) {
    this.facebookProvider.getFBFriends(accessToken)
      .subscribe(
        data => {
          this.users = data;
          this.loading = false;
        }, err => {
          this.loading = false;
          this.authService.checkError(err);
        }
      )

  }

  openProfile(user: User) {
    this.navCtrl.push(ProfilePage, { user: user });
  }

}
