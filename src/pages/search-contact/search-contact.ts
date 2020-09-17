import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ActionSheetButton } from 'ionic-angular';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { PhoneNumberProvider } from '../../providers/phone-number/phone-number';
import { User } from '../../model/user';
import { PhoneNumber } from '../../model/phoneNumber';
import { ProfilePage } from '../profile/profile';
import { SocialSharing } from '@ionic-native/social-sharing';


/**
 * Generated class for the SearchContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-contact',
  templateUrl: 'search-contact.html',
})
export class SearchContactPage {

  userContacts: Contact[] = [];

  phoneNumbers: PhoneNumber[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private contacts: Contacts,
    private phoneNumberProvider: PhoneNumberProvider, private socialSharing: SocialSharing, public actionSheetController: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchContactPage');
    this.contacts.find(["name", "phoneNumbers"]).then(contacts => {

      this.phoneNumberProvider.searchPhoneNumber(this.convertToPhoneNumberList(contacts)).subscribe(data => {
        this.phoneNumbers = data;
        for (let contact of contacts) {
          let userExists: boolean = false;
          if (null != contact.phoneNumbers) {
            for (let phoneNumber of contact.phoneNumbers) {
              for (let userPhoneNumber of this.phoneNumbers) {
                if (this.phoneNumberProvider.formatPhoneNumber(phoneNumber.value) == userPhoneNumber.phoneNumber) {
                  userExists = true;
                }
              }
            }
          } else {
            // set user exists true, so the user is not listed if it doesn't have any contact numbers
            userExists = true;
          }
          if (!userExists) {
            this.userContacts.push(contact);
          }
        }
      });
    })
  }

  convertToPhoneNumberList(contacts: Contact[]): string[] {
    let phoneNumbers: string[] = new Array();

    if (contacts && null != contacts) {
      for (let contact of contacts) {
        if (contact.phoneNumbers && null != contact.phoneNumbers) {
          for (let phoneNumber of contact.phoneNumbers) {
            if (null != phoneNumber && phoneNumber.value) {
              phoneNumbers.push(phoneNumber.value);
            }
          }
        }
      }
    }

    return phoneNumbers;
  }

  openProfile(user: User) {
    this.navCtrl.push(ProfilePage, { user: user });
  }

  invite(contact: Contact) {
    if (contact.phoneNumbers.length == 1) {
      this.socialSharing.shareViaSMS("Join OOrsi.com", contact.phoneNumbers[0].value);
    }
    else {
      var actionSheetButtons: ActionSheetButton[] = [];
      for (let phoneNumber of contact.phoneNumbers) {
        actionSheetButtons.push({
          text: phoneNumber.value,
          handler: () => {
            this.socialSharing.shareViaSMS("Join OOrsi.com", phoneNumber.value);
          }
        });
      }
      let actionSheet = this.actionSheetController.create({
        title: 'Invite ' + contact.name.formatted,
        buttons: actionSheetButtons
      });
      actionSheet.present();
    }
  }

}
