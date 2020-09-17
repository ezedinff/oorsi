import { WishListProduct } from './../model/wishlistproduct';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { OORSI_API_ENDPOINT } from '../const';
import { Product } from '../model/product';

/*
  Generated class for the WishlistProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class WishlistProvider {

  constructor(private http: HttpClient) {
    console.log('Hello WishlistProvider Provider');
  }

  getWishList(): Observable<any> {
    return this.http.get(OORSI_API_ENDPOINT + 'wishlist/list.json');
  }

  getWishlistItem(wishlistProductID: number): Observable<WishListProduct> {
    let searchParams = new HttpParams();
    searchParams.append('wishlistProductID', '' + wishlistProductID);
    return this.http.get<WishListProduct>(OORSI_API_ENDPOINT + 'wishlist', { params: searchParams });
  }

  deleteWishListProduct(wishlistProduct: WishListProduct): Observable<any> {
    return this.http.post(OORSI_API_ENDPOINT + 'wishlist/delete', wishlistProduct.product, { responseType: 'text' });
  }


  addProductToWishlist(product: Product) {
    return this.http.post(OORSI_API_ENDPOINT + 'wishlist/add', product);
  }

  isInWishlist(product: Product): Observable<boolean> {
    let params = new HttpParams();

    if (product.productId && null != product.productId) {
      params.set('productId', '' + product.productId);
    } else {
      params.set('retailer', '' + product.retailerId);
      params.set('sku', '' + product.sku);
    }

    return this.http.get<boolean>(OORSI_API_ENDPOINT + 'wishlist/isInWishList', { params: params });
  }

}
