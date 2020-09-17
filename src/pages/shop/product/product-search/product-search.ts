import { BarcodeSearchPage } from './../../../barcode-search/barcode-search';
import { ProductService } from './../../../../providers/product.service';
import { Product } from './../../../../model/product';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-product-search',
  templateUrl: 'product-search.html'
})
export class ProductSearchPage implements OnInit {

  products: Product[] = [];

  searchString: string = '';

  canScan: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, private productService: ProductService,
    private barcodeScanner: BarcodeScanner, private platform: Platform) {

  }

  ionViewDidLoad() {
    if (this.platform.is('ios')) {
      this.canScan = true;
    }
  }

  ngOnInit() {
    this.searchString = this.navParams.get('searchString');
    this.onSearch();
  }

  onSearch() {
    this.products = [];
    this.productService.search(this.searchString)
      .subscribe(
      data => {
        this.products = data;
      }

      )

  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      this.navCtrl.push(BarcodeSearchPage, { barcodeData: barcodeData.text });
    }, (err) => {
      // An error occurred
    });
  }



}
