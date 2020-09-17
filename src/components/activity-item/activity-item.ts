import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Activity } from '../../model/activity';
import { ActivityProvider } from '../../providers/activity-provider';

/*
  Generated class for the ActivityItem component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'oorsi-mobile-activity-item',
  templateUrl: 'activity-item.html'
})
export class ActivityItemComponent {

  @Input() activity: Activity;

  @Output() activityClickedEmitter: EventEmitter<Activity>;

  constructor(private activityProvider: ActivityProvider) {
    console.log('Hello ActivityItem Component');
    this.activityClickedEmitter = new EventEmitter();
  }

  toggleLike() {
    if (this.activity.liked == true) {
      this.activity.liked = false;
      this.activity.numberOfLikes = this.activity.numberOfLikes - 1;

      this.activityProvider.unlike(this.activity).subscribe(data => {

      }, error => {
        this.activity.liked = true;
        this.activity.numberOfLikes = this.activity.numberOfLikes + 1;
      });
    } else {
      this.activity.liked = true;
      this.activity.numberOfLikes = this.activity.numberOfLikes + 1;

      this.activityProvider.like(this.activity).subscribe(data => {

      }, error => {
        this.activity.liked = false;
        this.activity.numberOfLikes = this.activity.numberOfLikes - 1;
      });
    }
  }

  activityClicked() {

    this.activityClickedEmitter.emit(this.activity);

  }



}
