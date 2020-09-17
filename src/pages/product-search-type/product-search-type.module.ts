import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductSearchTypePage } from './product-search-type';

@NgModule({
  declarations: [
    ProductSearchTypePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductSearchTypePage),
  ],
})
export class ProductSearchTypePageModule {}
