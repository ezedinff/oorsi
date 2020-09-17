import { WishListProduct } from './../../model/wishlistproduct';
import { WishlistProvider } from './../../providers/wishlist-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth.service';

/*
  Generated class for the WishlistPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-wishlist-page',
  templateUrl: 'wishlist-page.html'
})
export class WishlistPage {


  wishlistProducts: WishListProduct[] = [];
  loggedIn: boolean;
  loading: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private wishlistService: WishlistProvider, 
    private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn;
    this.authService.authenticationChanged.subscribe(data => {
      this.loggedIn = data;
      this.load();
    })
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter WishlistPagePage');
    this.load();
  }

  onDeleteWishlistProduct(wishlistProduct: WishListProduct) {
    this.wishlistService.deleteWishListProduct(wishlistProduct).subscribe(
      data => {
        this.wishlistProducts.splice(this.wishlistProducts.indexOf(wishlistProduct), 1);
      },
      err => { }
    );
  }

  load() {
    if (this.loggedIn) {
      this.wishlistService.getWishList()
        .subscribe(
        data => {
          this.wishlistProducts = data;
        }

        )
    } else {
      this.wishlistProducts = [];
    }

  }


  login() {
    console.log("Pushing: " + LoginPage)
    this.navCtrl.push(LoginPage, { popTo: WishlistPage });
  }

  register() {
    this.navCtrl.push(RegisterPage, { popTo: WishlistPage });
  }
}
