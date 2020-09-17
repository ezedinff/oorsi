import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditShippingAddressPage } from './edit-shipping-address';

@NgModule({
  declarations: [
    EditShippingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(EditShippingAddressPage),
  ],
})
export class EditShippingAddressPageModule {}
