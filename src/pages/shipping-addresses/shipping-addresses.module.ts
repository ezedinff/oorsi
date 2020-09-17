import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingAddressesPage } from './shipping-addresses';

@NgModule({
  declarations: [
    ShippingAddressesPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingAddressesPage),
  ],
})
export class ShippingAddressesPageModule {}
