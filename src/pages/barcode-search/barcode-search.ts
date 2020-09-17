import { Product } from '../../model/product';
import { ProductService } from '../../providers/product.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


/**
 * Generated class for the BarcodeSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-barcode-search',
  templateUrl: 'barcode-search.html',
})
export class BarcodeSearchPage {

  barcodeData: string;

  products: Product[] = []
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private productService: ProductService) {
  }

  ionViewDidEnter() {
    this.searchProductByBarcode(this.navParams.get("barcodeData"));
  }

  searchProductByBarcode(barcodeData: string) {
    this.barcodeData = barcodeData;
    this.loading = true;
    if (barcodeData)
      this.productService.getProductsByUPC(barcodeData).subscribe(data => {
        this.loading = false;
        this.products = data
      });
    else {

    }
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.searchProductByBarcode(barcodeData.text);
    }, (err) => {
      // An error occurred
    });
  }

}
