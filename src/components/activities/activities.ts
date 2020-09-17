import { ActivityProvider } from './../../providers/activity-provider';
import { Component, Input, OnChanges } from '@angular/core';
import { Activity } from '../../model/activity';
import { NavController } from 'ionic-angular';
import { ActivityDetailPage } from '../../pages/activity-detail/activity-detail';

/*
  Generated class for the Activities component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'oorsi-mobile-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesComponent implements OnChanges {

  @Input() activities: Activity[] = [];

  constructor(private activityProvider: ActivityProvider, private navCtrl: NavController) {
    console.log('Hello Activities Component');
  }

  ngOnChanges() {
    console.log("ngOnChanges" + this.activities);
  }

  openActivity(activity: Activity) {
    console.log(activity);
    this.navCtrl.push(ActivityDetailPage, { activityId: activity.id })
  }


}
