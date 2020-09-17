import { User } from './../../model/user';
import { Friendship } from './../../providers/friendship';

import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'oorsi-mobile-friends-item',
  templateUrl: 'friends-item.component.html',
  // styleUrls: ['./friends-item.component.scss']
})
export class FriendsItemComponent implements OnChanges {

  @Input() user: User;

  followButtonText: string = "Follow";

  @Output() profileEmitter: EventEmitter<User>;


  constructor(private friendshipService: Friendship) {
    console.log("FriendsItemComponent");
    this.profileEmitter = new EventEmitter;

  }

  ngDoCheck() {
    if (this.user.followed) {
      this.followButtonText = "Following";
    } else {
      this.followButtonText = "Follow";
    }
  }

  onFollow() {
    if (!this.user.followed) {
      this.user.followed = true;
      this.friendshipService.follow(this.user).subscribe(data => {

      });
    }
    else {
      this.user.followed = false;
      this.friendshipService.unfollow(this.user).subscribe(data => {

      });
    }

  }

  ngOnChanges() {
    console.log(this.user);
  }

  openUserProfile() {
    this.profileEmitter.emit(this.user);

  }

}
