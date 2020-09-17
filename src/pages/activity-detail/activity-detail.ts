import { ProductDetailPage } from './../shop/product/product-detail/product-detail';
import { ProfilePage } from './../profile/profile';
import { User } from './../../model/user';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../model/activity';
import { AuthService } from '../../providers/auth.service';
import { ActivityProvider } from '../../providers/activity-provider';
import { Product } from '../../model/product';

/*
 Generated class for the ActivityDetail page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-activity-detail',
  templateUrl: 'activity-detail.html'
})
export class ActivityDetailPage {

  activity: Activity;
  comments: Comment[] = [];
  comment: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private activityProvider: ActivityProvider) {
    this.authService.authenticationChanged.subscribe(data => {
      if (data == false) {
        this.navCtrl.popAll();
      }
    })

  }

  ionViewDidLoad() {
    this.activityProvider.getActivity(this.navParams.get('activityId')).subscribe(
      data => {
        this.activity = data;
      }, err => {
        this.authService.checkError(err);
      }
    );
    this.activityProvider.getCommentsForActivity(this.navParams.get('activityId')).subscribe(
      data => {
        this.comments = data;
      }, err => {
        this.authService.checkError(err);
      }
    );
  }

  ionViewDidEnter() {
    if (this.authService.isLoggedIn == false) {
      this.navCtrl.popAll();
    }
  }

  postComment() {
    if (this.comment.trim() != '') {
      this.activityProvider.comment(this.activity, this.comment).subscribe(data => {
        this.comment = '';
        this.comments.unshift(data);
      });
    }
  }

  deleteComment(comment: Comment) {

  }

  openProfile(user: User) {
    this.navCtrl.push(ProfilePage, { user: user });
  }

  openProduct(product: Product, forUser: User) {
    this.navCtrl.push(ProductDetailPage, { productId: product.productId, for: forUser.userID });
  }

  toggleLike() {
    if (this.activity.liked == true) {
      this.activityProvider.unlike(this.activity).subscribe(data => {
        this.activity.liked = false;
        this.activity.numberOfLikes = this.activity.numberOfLikes - 1;
      });
    } else {
      this.activityProvider.like(this.activity).subscribe(data => {
        this.activity.liked = true;
        this.activity.numberOfLikes = this.activity.numberOfLikes + 1;
      });
    }
  }



}
