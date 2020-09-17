import { CheckoutPage } from './../checkout/checkout';
import { User } from './../../model/user';
import { CartProduct } from './../../model/cartProduct';
import { CartProvider } from './../../providers/cart-provider';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html'
})
export class CartPage {

    users: User[] = [];
    loading: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private cartService: CartProvider, private toast: Toast, private toastController: ToastController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CartPage');
        this.loading = true;
        this.cartService.getCart().subscribe(data => {
            let cartProducts: CartProduct[] = data;
            for (let cartProduct of cartProducts) {
                let added: boolean = false;
                for (let user of this.users) {
                    if (cartProduct.forUser.userID === user.userID) {
                        cartProduct.forUser = user;
                        user.cartProducts.push(cartProduct);
                        added = true;
                        break;
                    }
                }

                if (!added) {
                    let user: User = new User(cartProduct.forUser);
                    cartProduct.forUser = user;
                    user.cartProducts.push(cartProduct);
                    this.users.push(user);
                }

            }

            this.loading = false;
        });
    }

    onDeleteCartProduct(cartProduct: CartProduct) {
        this.cartService.deleteCartProduct(cartProduct).then(data => {
            for (let cp of cartProduct.forUser.cartProducts) {
                if (cp.id == cartProduct.id) {
                    cartProduct.forUser.cartProducts.splice(cartProduct.forUser.cartProducts.indexOf(cp), 1);
                    let toast = this.toastController.create({
                        message: cartProduct.product.name + ' removed from cart!',
                        position: 'top',
                        duration: 3000
                    });
                    toast.present();
                    break;
                }
            }
        });
    }

    checkout(forUser: number) {
        this.navCtrl.push(CheckoutPage, { forUser: forUser });
    }

    decreaseQuantity(item: CartProduct) {
        if (item.quantity > 1)
            item.quantity--;
    }

    increaseQuantity(item: CartProduct) {
        item.quantity++;
    }

    updateQuantity(item: CartProduct) {
        this.cartService.updateCartProduct(item).then(data => {
            this.toast.showShortCenter("Quantity Updated!");

        }).catch(err => { });
    }


}
