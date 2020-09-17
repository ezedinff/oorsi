import { ProfileProvider } from './../../providers/profile-provider';
import { User } from '../../model/user';
// import { UserManagementProvider } from '../../providers/user-management-provider';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ActivityProvider } from '../../providers/activity-provider';
import { Activity } from '../../model/activity';
import { AuthService } from '../../providers/auth.service';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { PasswordResetPage } from '../password-reset/password-reset';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {

    base64Image: string;
    user: User;

    canEdit: boolean;

    activities: Activity[] = [];

    loading: boolean = false;

    isLoggedIn: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams,
        public actionSheetController: ActionSheetController, private camera: Camera,
        private imagePicker: ImagePicker, private profileProvider: ProfileProvider,
        private activityProvider: ActivityProvider, private authService: AuthService) {
        this.isLoggedIn = this.authService.isLoggedIn;
        this.authService.authenticationChanged.subscribe(data => this.isLoggedIn = data);

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ProfilePage');
        this.user = this.navParams.get('user');
        this.profileProvider.getUserInfo(this.user.userID).subscribe(data => { this.user = data; console.log(this.user) });

        this.activityProvider.getActivityForUser(this.navParams.get('user').userID).subscribe(
            data => {
                this.activities = data;
                console.log("profile.ionViewDidEnter" + this.activities);
            }, err => {
            }
        )
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter ProfilePage');
    }

    ngOnChanges() {
        console.log(this.user);
    }

    login() {
        this.navCtrl.push(LoginPage, { popTo: ProfilePage });
    }

    register() {
        this.navCtrl.push(RegisterPage, { popTo: ProfilePage });
    }








}
