import { CartProvider } from './cart-provider';
import { UserManagementProvider } from './user-management-provider';
import { User } from './../model/user';
import { Observable, Subject } from 'rxjs/Rx';

import { EventEmitter, Injectable } from '@angular/core';
import { OORSI_API_ENDPOINT, GA_TRACKING_ID } from '../const';
import { Storage } from '@ionic/storage';

import { JwtHelper } from 'angular2-jwt';
import { Header } from 'ionic-angular/umd';
import { LoginPage } from '../pages/login/login';
import { HttpClient } from '@angular/common/http';
import { Token } from '../model/token';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { PushNotificationProvider } from './push-notification/push-notification';

// import { Push, PushObject, PushOptions } from '@ionic-native/push';



@Injectable()
export class AuthService {



    public isLoggedIn: boolean;
    public authenticationChanged: EventEmitter<boolean>;
    public fbat: string;

    public loggedInUserId: number;



    constructor(private http: HttpClient, private storage: Storage, private userManagementProvider: UserManagementProvider,
        private cartProvider: CartProvider, private ga: GoogleAnalytics, private pushProvider: PushNotificationProvider) {
        this.isLoggedIn = false;
        this.authenticationChanged = new EventEmitter<boolean>();
        this.authenticationChanged.subscribe(data => this.cartProvider.updateCartSize());
        this.checkAuthentication();
    }


    checkAuthentication() {
        this.storage.get('currentUser').then(data => {
            this.authenticationSuccessful(data, true);
        });
    }

    authenticationSuccessful(token: string, ignoreSavingToken?: boolean) {
        let jwtHelper: JwtHelper = new JwtHelper();
        if (token != null && !jwtHelper.isTokenExpired(token)) {
            if (ignoreSavingToken == undefined || ignoreSavingToken == true) {
                this.storage.set('currentUser', token);
            }
            this.authenticationChanged.emit(true);
            this.isLoggedIn = true;
            this.loggedInUserId = jwtHelper.decodeToken(token).id;
            this.userManagementProvider.updateUserInfo();
            this.ga.startTrackerWithId(GA_TRACKING_ID)
                .then(() => {
                    console.log('Google analytics is ready now');
                    this.ga.trackView('app.component');
                    this.ga.setUserId('' + this.loggedInUserId);
                    // Tracker is ready
                    // You can now track pages or set additional information such as AppVersion or UserId
                })
                .catch(e => console.log('Error starting GoogleAnalytics', e));
            this.pushProvider.savePlayerIDs();
        } else {
            this.logout();
        }
    }

    checkError(err) {
        if (err && err != null && err.status == 401) {
            this.logout();
            return true;
        }
    }

    login(username: string, password: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'login', { username: username, password: password })
                .subscribe(data => {
                    // login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        this.authenticationSuccessful(token);
                        resolve(true);
                    } else {
                        // return false to indicate failed login
                        resolve(false);
                    }
                }, err => reject(err));
        });

    }

    register(loginFormValue): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'register', loginFormValue)
                .subscribe(data => {
                    // login successful if there's a jwt token in the response
                    let token = data && data.token;
                    if (token) {
                        // store username and jwt token in local storage to keep user logged in between page refreshes
                        this.authenticationSuccessful(token)

                        // return true to indicate successful login
                        resolve(true);
                    } else {
                        //this.isLoggedIn.emit(this.canActivate());
                        // return false to indicate failed login
                        resolve(false);
                    }
                }, err => reject(err));
        })
    }

    facebookLogin(accessToken: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'fbLogin', accessToken)
                .subscribe(response => {
                    // login successful if there's a jwt token in the response
                    let token = response && response.token;
                    if (token) {
                        this.authenticationSuccessful(token);
                        // return true to indicate successful login
                        resolve(true);
                    } else {
                        // this.isLoggedIn.emit(this.canActivate());
                        // return false to indicate failed login
                        resolve(false);
                    }

                }, err => reject(err));
        })
    };

    getFBUserInfo(accessToken): Observable<User> {
        return this.http.post<User>(OORSI_API_ENDPOINT + 'fbUserInfo', accessToken);

    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.pushProvider.deletePlayerIDs();
        this.storage.remove('currentUser');
        this.isLoggedIn = false;
        this.authenticationChanged.emit(false);
    }

    requestCode(resetPasswordRequest): Observable<any> {
        return this.http.post(OORSI_API_ENDPOINT + 'password/reset/token', resetPasswordRequest);
    }

    resetPassword(resetPasswordRequest): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.http.post<Token>(OORSI_API_ENDPOINT + 'password/reset', resetPasswordRequest)
                .subscribe(response => {
                    // login successful if there's a jwt token in the response
                    let token = response && response.token;
                    if (token) {
                        this.authenticationSuccessful(token);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, err => reject(err));
        })
    }









}
