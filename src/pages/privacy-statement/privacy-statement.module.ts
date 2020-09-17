import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrivacyStatementPage } from './privacy-statement';

@NgModule({
  declarations: [
    PrivacyStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(PrivacyStatementPage),
  ],
})
export class PrivacyStatementPageModule {}
