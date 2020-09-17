import { AppManagementProvider } from '../providers/app-management/app-management';
import { Toast } from '@ionic-native/toast';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyProfilePage } from './../pages/my-profile/my-profile';
import { PICTURE_REPO_URL, GA_TRACKING_ID } from './../const';
import { User } from '../model/user';
import { UserManagementProvider } from './../providers/user-management-provider';
import { OrderListPage } from './../pages/order-list/order-list';
import { LoginPage } from '../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthService } from '../providers/auth.service';
import { RegisterPage } from '../pages/register/register';

import { About } from '../pages/about/about';
import { MyAccountPage } from '../pages/my-account/my-account';
import { InvitePage } from '../pages/invite/invite';
import { AppRate } from '@ionic-native/app-rate';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Storage } from '@ionic/storage';
import { WelcomePage } from '../pages/welcome/welcome';


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    tabsPage = TabsPage;
    loginPage = LoginPage;
    signupPage = RegisterPage;
    ordersPage = OrderListPage;
    profilePage = MyProfilePage;
    myAccountPage = MyAccountPage;

    isAuthenticated: boolean = false;
    firstTime: boolean = false;

    loggedInUser: User;
    imagesURL: string = PICTURE_REPO_URL;

    @ViewChild('nav') navController: NavController;

    constructor(platform: Platform, private authService: AuthService,
        private menuController: MenuController, private userManagementProvider: UserManagementProvider,
        private statusBar: StatusBar, private splashScreen: SplashScreen,
        private toast: Toast, private appManagementProvider: AppManagementProvider,
        private appRate: AppRate, private ga: GoogleAnalytics, private storage: Storage) {

        splashScreen.show();
        this.isAuthenticated = this.authService.isLoggedIn;
        console.log('listen to authentication changed emitter')
        this.authService.authenticationChanged.subscribe((data) => {
            console.log('Loading tabs page after successful login')
            this.isAuthenticated = data;
        });

        this.userManagementProvider.userInfoEmmiter.subscribe(data => this.loggedInUser = data);


        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();


            // Enable to debug issues.
            //   window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

            var notificationOpenedCallback = function (jsonData) {
                console.log('OneSignal notificationOpenedCallback: ' + JSON.stringify(jsonData));
            };


            window["plugins"].OneSignal
                .startInit("01feb06f-fa88-49f9-9490-3bce7d39d401", "267588671412")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();

            window["plugins"].OneSignal.getPermissionSubscriptionState(function (status) {
                console.log("OneSignal subscription state" + JSON.stringify(status))
            });


            this.ga.startTrackerWithId(GA_TRACKING_ID)
                .then(() => {
                    console.log('Google analytics is ready now');
                    this.ga.trackView('app.component');
                    // Tracker is ready
                    // You can now track pages or set additional information such as AppVersion or UserId
                })
                .catch(e => console.log('Error starting GoogleAnalytics', e));

            this.storage.get('isFirsttime').then(data => {
                this.navController.push(WelcomePage);
            });
        });

    }

    openPage(page) {
        console.log("Opening page:" + page);
        this.navController.setRoot(page);
        this.menuController.close();
    }

    login() {
        this.navController.push(LoginPage);
    }

    register() {
        this.navController.push(RegisterPage);
    }


    logout() {
        this.authService.logout();
        // this.push.unregister();
        this.menuController.close();
    }

    about() {
        this.openPage(About);
    }

    share() {
        this.openPage(InvitePage);
    }

    feedback() {
        this.appRate.preferences = {
            usesUntilPrompt: 3,
            storeAppURL: {
                ios: 'com.oorsi.socialshop',
                android: 'market://details?id=<package_name>',
            }
        };

        this.appRate.promptForRating(true);
    }
}
