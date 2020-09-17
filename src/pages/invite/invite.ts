import { OORSI_BANNER } from './../../const';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the InvitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html',
})
export class InvitePage {

  canShareViaTwitter: boolean = true;
  canShareViaEmail: boolean = true;
  canShareViaFacebook: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {
    // this.socialSharing.canShareVia('com.apple.social.facebook').then(() => this.canShareViaFacebook = true);
    // this.socialSharing.canShareVia('twitter').then(() => this.canShareViaTwitter = true);
    // this.socialSharing.canShareViaEmail().then(() => this.canShareViaEmail = true);
  }

  ionViewDidLoad() {


  }

  shareViaTwitter() {
    this.socialSharing.shareViaTwitter("Download OOrsi App!", OORSI_BANNER, "https://www.oorsi.com");
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook("Download OOrsi App!", OORSI_BANNER, "https://www.oorsi.com");
  }

  shareViaEmail() {
    this.socialSharing.shareViaEmail("Join OOrsi.com", "Join OOrsi.com", ['']);
  }

  shareViaMessage() {
    this.socialSharing.shareViaSMS("Join OOrsi.com", '');
  }



}
