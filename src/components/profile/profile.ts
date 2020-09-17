import { FollowingListPage } from './../../pages/following-list/following-list';
import { FollowerListPage } from './../../pages/follower-list/follower-list';
import { NavController } from 'ionic-angular';
import { Friendship } from './../../providers/friendship';
import { Component, Input } from '@angular/core';
import { User } from '../../model/user';

/*
  Generated class for the Profile component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'oorsi-user-profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {

  @Input() editAllowed: boolean = false;

  @Input() user: User;


  constructor(private friendshipService: Friendship, private navController: NavController) {
    console.log('Hello Profile Component');
  }

  ngOnChanges() {
    console.log(this.user);
  }

  onFollow() {
    if (!this.user.followed) {
      this.friendshipService.follow(this.user).subscribe(data => {
        this.user.followed = true;
      });
    }
    else {
      this.friendshipService.unfollow(this.user).subscribe(data => {
        this.user.followed = false;
      });
    }

  }

  showFollowers() {
    this.navController.push(FollowerListPage, { user: this.user })
  }

  showFollowing() {
    this.navController.push(FollowingListPage, { user: this.user })
  }


}
