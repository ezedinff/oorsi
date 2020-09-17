import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { Product } from '../../../../model/product';

/*
  Generated class for the ProductItem page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-item',
  templateUrl: 'product-item.html'
})
export class ProductItemPage {

  @Input() product: Product;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  onClick() {
    if (null != this.product.productId)
      this.navCtrl.push(ProductDetailPage, { productId: this.product.productId });
    else
      this.navCtrl.push(ProductDetailPage, { retailer: this.product.retailerId, sku: this.product.sku });
  }

  // get discount percent
  discountPercent(originPrice, salePrice) {
    return Math.round((salePrice - originPrice) * 100 / originPrice)
  }


}
