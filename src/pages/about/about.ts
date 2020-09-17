import { AppVersion } from '@ionic-native/app-version';
import { AppManagementProvider } from '../../providers/app-management/app-management';
import { Component, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the About page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {

  currentSnapshot: any = "No Snapshot";
  currentSnapshotEmmiter: EventEmitter<any>;

  versionNumber: string;
  versionCode: string | number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private appManagementProvider: AppManagementProvider, private appVersion: AppVersion) {
    this.currentSnapshotEmmiter = appManagementProvider.currentSnapshotChangeEmmiter;
  }

  ionViewDidLoad() {
    this.currentSnapshot = this.appManagementProvider.getCurrentSnapshot();
    this.currentSnapshotEmmiter.subscribe(data => {
      this.currentSnapshot = data;
    });

    this.appVersion.getVersionNumber().then(data => { this.versionNumber = data });
    this.appVersion.getVersionCode().then(data => { this.versionCode = data });
  }



}
