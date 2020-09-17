import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Friendship } from '../../../providers/friendship';
import { User } from '../../../model/user';
import { ProfilePage } from '../../profile/profile';

/*
  Generated class for the FriendSearchPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-friend-search-page',
  templateUrl: 'friend-search-page.html'
})
export class FriendSearchPagePage {

  searchString: string = '';

  users: User[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private friendshipService: Friendship) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendSearchPagePage');

    this.searchString = this.navParams.get('searchString');
    this.friendshipService.search(this.searchString)
      .subscribe(
      data => {
        this.users = data;
      }

      )

  }

  openProfile(user: User) {
    this.navCtrl.push(ProfilePage, { user: user });
  }

}
