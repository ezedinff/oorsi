import { ActivityProvider } from './../../providers/activity-provider';
import { AuthService } from '../../providers/auth.service';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ACTIVITY_TYPES, Activity } from '../../model/activity';
import { LoginPage } from "../login/login";
import { RegisterPage } from "../register/register";
import { AddBirthdayPage } from '../add-birthday/add-birthday';

@Component({
  selector: 'page-news-feed',
  templateUrl: 'news-feed.html'
})
export class NewsFeedPage {

  activities: Activity[] = []
  activityTypes: string[] = ACTIVITY_TYPES;

  loading: boolean = false;

  isLoggedIn: boolean;

  constructor(private activityProvider: ActivityProvider, private authService: AuthService, private navController: NavController) {
  }

  ionViewDidLoad() {
    this.loading = true;

    this.isLoggedIn = this.authService.isLoggedIn;
    console.log("NewsFeedPage ionViewDidLoad" + this.isLoggedIn);


    this.authService.authenticationChanged.subscribe(data => {
      this.loading = true;
      this.isLoggedIn = data;
      this.loadPage().then(data => {
        this.loading = false;
      });
    });
    this.loadPage().then(data => {
      this.loading = false;
    });

  }

  loadPage(): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      if (this.isLoggedIn == true) {
        this.activityProvider.getNewsFeed().subscribe(
          data => {
            this.activities = data;
            resolve();
          }, err => {
            resolve();
          }
        )
      } else {
        resolve();
        this.resetPage();
      }

    });


  }

  resetPage() {
    this.activities = [];
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    this.loadPage().then(refresher.complete());

  }

  login() {
    this.navController.push(LoginPage, { popTo: NewsFeedPage });
  }

  register() {
    this.navController.push(RegisterPage, { popTo: NewsFeedPage });
  }

  addProductToWishlist(): void {
    // this.navController.push(Ad);
  }

  addBirthday(): void {
    this.navController.push(AddBirthdayPage);
  }


}