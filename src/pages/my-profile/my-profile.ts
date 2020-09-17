import { FollowingListPage } from './../following-list/following-list';
import { FollowerListPage } from './../follower-list/follower-list';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { UserManagementProvider } from '../../providers/user-management-provider';
import { User } from '../../model/user';
import AuthenticatedPage from '../authenticated-page';
import { AuthService } from '../../providers/auth.service';

/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html'
})
export class MyProfilePage extends AuthenticatedPage {




  user: User;

  canEdit: boolean;

  loading: boolean = false;

  constructor(navCtrl: NavController, public navParams: NavParams,
    public actionSheetController: ActionSheetController,
    private camera: Camera, private imagePicker: ImagePicker,
    private userManagementProvider: UserManagementProvider, authService: AuthService) {
    super(authService, navCtrl);
    userManagementProvider.userInfoEmmiter.subscribe(data => this.user = data);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.userManagementProvider.updateUserInfo();

  }

  ionViewDidEnter() {

  }

  profilePictureClicked() {
    if (this.loading) {
      return;
    }
    let actionSheet = this.actionSheetController.create({
      title: 'Profile Picture',
      buttons: [
        {
          text: 'Upload from Gallery',
          handler: () => {

            this.imagePicker.getPictures({ quality: 100, maximumImagesCount: 1 }).then((results) => {
              console.log(results)
              for (var i = 0; i < results.length; i++) {
                this.loading = true;
                this.userManagementProvider.uploadProfilePicture(results[0]).then(data => {
                  this.loading = false;
                }).catch(err => {
                  this.loading = false;
                });
              }
            }, (err) => { });
          }
        }, {
          text: 'Take New Picture',
          handler: () => {
            this.camera.getPicture({
              quality: 100,
              destinationType: this.camera.DestinationType.FILE_URI,
              targetWidth: 1000,
              targetHeight: 1000
            }).then((imageData) => {
              this.loading = true;
              this.userManagementProvider.uploadProfilePicture(imageData).then(data => { this.loading = false; }).catch(err => { this.loading = false; });
            }, (err) => {
              console.log(err);
            });
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  showFollowers() {
    this.navCtrl.push(FollowerListPage, { user: this.user })
  }

  showFollowing() {
    this.navCtrl.push(FollowingListPage, { user: this.user })
  }





}
