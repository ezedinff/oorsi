import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PagesAddAmazonProductPage } from './pages-add-amazon-product';

@NgModule({
  declarations: [
    PagesAddAmazonProductPage,
  ],
  imports: [
    IonicPageModule.forChild(PagesAddAmazonProductPage),
  ],
})
export class PagesAddAmazonProductPageModule {}
