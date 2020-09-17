import { AuthService } from './../../providers/auth.service';
import { User } from './../../model/user';
import { Friendship } from './../../providers/friendship';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FollowingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-following-list',
  templateUrl: 'following-list.html',
})
export class FollowingListPage {

  loading: boolean = false;

  users: User[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private friendshipProvider: Friendship, private authService: AuthService) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FollowingListPage');
    this.loading = true;
    console.log(JSON.stringify(this.navParams.get('user')));
    this.friendshipProvider.getFriends(this.navParams.get('user')).subscribe(data => {
      this.users = data;
      this.loading = false;
    }, err => {
      this.authService.checkError(err);
    });

  }

}
