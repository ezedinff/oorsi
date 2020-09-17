import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddShippingAddressPage } from './add-shipping-address';

@NgModule({
  declarations: [
    AddShippingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddShippingAddressPage),
  ],
})
export class AddShippingAddressPageModule {}
