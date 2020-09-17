import { AuthService } from './../../providers/auth.service';
import { Friendship } from './../../providers/friendship';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FollowerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-follower-list',
  templateUrl: 'follower-list.html',
})
export class FollowerListPage {

  loading: boolean = false;

  users: User[] = []
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private friendshipProvider: Friendship, private authService: AuthService) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FollowerListPage');
    this.loading = true;
    console.log(JSON.stringify(this.navParams.get('user')));
    
    this.friendshipProvider.getFollowers(this.navParams.get('user')).subscribe(data => {
      this.users = data;
      this.loading = false;
    }, err => {
      console.log(JSON.stringify(err));
      this.authService.checkError(err);
    });

  }


}
