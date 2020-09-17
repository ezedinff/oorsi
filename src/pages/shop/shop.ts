import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ProductService } from './../../providers/product.service';
import { ProductDetailPage } from './product/product-detail/product-detail';
import { ProductSearchPage } from './product/product-search/product-search';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Product } from '../../model/product';
import { BarcodeSearchPage } from '../barcode-search/barcode-search';

/*
  Generated class for the Shop page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-shop',
    templateUrl: 'shop.html'
})
export class ShopPage {

    searchString: string = '';

    trendingProducts: Product[] = [];

    loading: boolean = false;

    canScan: boolean = false;

    constructor(public navCtrl: NavController, private productService: ProductService, private barcodeScanner: BarcodeScanner,
        private platform: Platform) {
    }


    ionViewDidLoad() {
        this.loading = true;
        this.productService.trendingProducts().subscribe(data => {
            this.trendingProducts = data;
            this.loading = false;
        });

        if (this.platform.is('ios')) {
            this.canScan = true;
        }
    }

    onSearch() {
        this.navCtrl.push(ProductSearchPage, { searchString: this.searchString });
    }

    viewItem(product: Product) {
        if (null != product.productId)
            this.navCtrl.push(ProductDetailPage, { productId: product.productId });
        else
            this.navCtrl.push(ProductDetailPage, { retailer: product.retailerId, sku: product.sku });
    }

    scanBarcode() {
        this.barcodeScanner.scan().then((barcodeData) => {
            this.navCtrl.push(BarcodeSearchPage, { barcodeData: barcodeData.text });
        }, (err) => {
            // An error occurred
        });
    }
}
