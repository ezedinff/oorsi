import { BarcodeSearchPage } from './../../../barcode-search/barcode-search';
import { Toast } from '@ionic-native/toast';
import { AuthService } from './../../../../providers/auth.service';
import { ProfileProvider } from '../../../../providers/profile-provider';

import { ProductSearchPage } from './../product-search/product-search';
import { Product } from './../../../../model/product';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { WishlistProvider } from '../../../../providers/wishlist-provider';
import { CartProvider } from '../../../../providers/cart-provider';
import { ADDED_TO_CART, ADD_TO_CART } from '../../../../const';
import { ProductService } from '../../../../providers/product.service';
import { User } from '../../../../model/user';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-product-detail',
    templateUrl: 'product-detail.html',
})
export class ProductDetailPage {

    product: Product;
    forUser: User;

    searchString: string;

    inWishList: boolean = false;

    addToCartButton = ADD_TO_CART;
    addToCartButtonForUser: string = ADD_TO_CART;

    loading: boolean = false;

    canScan: boolean = false;

    loggedIn: boolean = false;
    constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductService,
        private wishlistProvider: WishlistProvider, private cartProvider: CartProvider, private profileProvider: ProfileProvider,
        private authService: AuthService, private toastController: ToastController, private barcodeScanner: BarcodeScanner, private platform: Platform) {


    }

    ionViewDidEnter() {
        this.loading = true;
        if (this.navParams.get('productId')) {
            this.productService.getProductById(this.navParams.get('productId')).subscribe(data => {
                this.product = data;
                this.checkIfInWishlist();
                this.loading = false;
            });
        } else {
            this.productService.getProductBySku(this.navParams.get('retailer'), this.navParams.get('sku')).subscribe(data => {
                this.product = data;
                this.checkIfInWishlist();
                this.loading = false;
            });
        }

        if (this.navParams.get('for')) {
            this.profileProvider.getUserInfo(this.navParams.get('for')).subscribe(data => {
                this.forUser = data;
            }, err => {
            });
        }

        this.loggedIn = this.authService.isLoggedIn;
        this.authService.authenticationChanged.subscribe(data => this.loggedIn = data);

    }

    private checkIfInWishlist() {
        this.wishlistProvider.isInWishlist(this.product).subscribe(data => this.inWishList = data);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProductDetailPage');
        if (this.platform.is('ios')) {
            this.canScan = true;
        }
    }

    onSearch() {
        this.navCtrl.push(ProductSearchPage, { searchString: this.searchString });
    }

    toggleWishList(product) {
        this.inWishList = true;
        this.wishlistProvider.addProductToWishlist(product).subscribe();
    }

    addToCart() {
        this.addToCartButton = ADDED_TO_CART;
        this.cartProvider.addProductToCart(this.product).then(data => {
            let toast = this.toastController.create({
                message: this.product.name + ' added to cart!',
                position: 'top',
                duration: 3000
            });
            toast.present();
        }, err => {
            this.addToCartButton = ADD_TO_CART;
            this.authService.checkError(err);
        });
    }

    addToCartForUser() {
        this.addToCartButtonForUser = ADDED_TO_CART;
        this.cartProvider.addProductToCart(this.product, this.forUser).then(data => {
            let toast = this.toastController.create({
                message: "Added to Cart for " + this.forUser.firstName,
                position: 'top',
                duration: 3000
            });
            toast.present();
        }, err => {
            this.authService.checkError(err);
            this.addToCartButton = ADD_TO_CART;
        });
    }

    scanBarcode() {
        this.barcodeScanner.scan().then((barcodeData) => {
            this.navCtrl.push(BarcodeSearchPage, { barcodeData: barcodeData.text });
        }, (err) => {
            // An error occurred
        });
    }
}

