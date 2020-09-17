import { NavController } from 'ionic-angular';
import { WishListProduct } from './../../model/wishlistproduct';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductDetailPage } from '../../pages/shop/product/product-detail/product-detail';


@Component({
  selector: 'wishlist-item-component',
  templateUrl: 'wishlist-item-component.html'
})
export class WishlistItemComponent {

  @Input() showRemoveButton: boolean = false;

  @Input() item: WishListProduct;

  @Output() onDeleteWishlistProduct = new EventEmitter<WishListProduct>();

  @Output() onVieweWishlistProduct = new EventEmitter<WishListProduct>();

  constructor(private navCtrl: NavController) {
    console.log('Hello WishlistItemComponent Component');
  }

  onDelete() {
    this.onDeleteWishlistProduct.emit(this.item);
  }


  viewItem() {
    this.navCtrl.push(ProductDetailPage, { productId: this.item.product.productId });
  }


}
