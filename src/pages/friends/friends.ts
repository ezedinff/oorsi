import { RegisterPage } from './../register/register';
import { LoginPage } from './../login/login';
import { User } from '../../model/user';
import { Friendship } from './../../providers/friendship';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { FacebookFriendsPage } from '../facebook-friends/facebook-friends';
import { AuthService } from '../../providers/auth.service';
import { SearchContactPage } from '../search-contact/search-contact';


@Component({
  selector: 'page-news-feed',
  templateUrl: 'friends.html'
})
export class FriendsPage {

  loggedIn: boolean;
  loading: boolean = false;
  users: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private friendshipService: Friendship, private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn;
    this.authService.authenticationChanged.subscribe(data => {
      this.loggedIn = data;
      this.loadFriends();
    })


  }

  ionViewDidEnter() {
    this.loadFriends();
  }

  loadFriends() {
    if (this.loggedIn) {
      console.log('ionViewDidLoad FriendsPage');
      this.loading = true;
      this.friendshipService.getFriends().subscribe(data => {
        this.users = data;
        for (let user of this.users) {
          user.followed = true;
        }
        this.loading = false;
      }, err => {
        this.authService.checkError(err);
      });
    } else {
      this.users = [];
    }
  }

  openProfile(user: User) {
    this.navCtrl.push(ProfilePage, { user: user });
  }

  facebookFriends() {
    this.navCtrl.push(FacebookFriendsPage);
  }

  contactFriends() {
    this.navCtrl.push(SearchContactPage);
  }

  login() {
    console.log("Pushing: " + LoginPage)
    this.navCtrl.push(LoginPage, { popTo: FriendsPage });
  }

  register() {
    this.navCtrl.push(RegisterPage, { popTo: FriendsPage });
  }

}
