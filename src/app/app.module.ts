import { FollowingListPage } from './../pages/following-list/following-list';
import { FollowerListPage } from './../pages/follower-list/follower-list';
import { FacebookFriendsButtonComponent } from './../components/facebook-friends-button/facebook-friends-button';
import { TermsAndConditionsPageModule } from './../pages/terms-and-conditions/terms-and-conditions.module';
import { PrivacyStatementPageModule } from './../pages/privacy-statement/privacy-statement.module';
import { BarcodeSearchPage } from '../pages/barcode-search/barcode-search';
import { AddShippingAddressPageModule } from '../pages/add-shipping-address/add-shipping-address.module';
import { PaymentMethodsPageModule } from './../pages/payment-methods/payment-methods.module';
import { ShippingAddressesPageModule } from './../pages/shipping-addresses/shipping-addresses.module';
import { MyAccountPage } from '../pages/my-account/my-account';
import { FriendSearchInputComponent } from './../components/friend-search-input/friend-search-input';
import { PasswordResetPageModule } from './../pages/password-reset/password-reset.module';
import { ForgotPasswordPageModule } from '../pages/forgot-password/forgot-password.module';
import { AppVersion } from '@ionic-native/app-version';
import { FacebookFriendsPage } from './../pages/facebook-friends/facebook-friends';
import { AboutModule } from './../pages/about/about.module';
import { BrowserModule } from '@angular/platform-browser';
import { ProfileComponent } from '../components/profile/profile';
import { ImgURLPipe } from './../pipes/ImgURLPipe';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { ProfilePage } from './../pages/profile/profile';
import { ProfileProvider } from '../providers/profile-provider';
import { Stripe } from '@ionic-native/stripe';
import { AddPaymentMethodComponent } from '../components/add-payment-method/add-payment-method';
import { OrderListPage } from './../pages/order-list/order-list';
import { PaymentProvider } from '../providers/payment-provider';
import { CheckoutProvider } from './../providers/checkout';
import { CartProvider } from './../providers/cart-provider';
import { AddToCartButtonComponent } from '../components/add-to-cart-button/add-to-cart-button';
import { WishlistProvider } from './../providers/wishlist-provider';
import { FriendSearchPagePage } from './../pages/friends/friend-search-page/friend-search-page';
import { FriendsPage } from './../pages/friends/friends';
import { RegisterPage } from './../pages/register/register';
import { NewsFeedPage } from './../pages/news-feed/news-feed';
import { ProductDetailPage } from './../pages/shop/product/product-detail/product-detail';
import { ProductSearchPage } from './../pages/shop/product/product-search/product-search';
import { ProductService } from '../providers/product.service';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ShopPage } from '../pages/shop/shop';
import { ProductItemPage } from '../pages/shop/product/product-item/product-item';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { AuthService } from '../providers/auth.service';

import { HttpModule, RequestOptions, Http } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { FormsModule } from '@angular/forms';
import { LoginPage } from '../pages/login/login';
import { Friendship } from '../providers/friendship';

import { MomentModule } from 'angular2-moment/moment.module';
import { FriendsItemComponent } from '../components/friends-item/friends-item.component';
import { WishlistPage } from '../pages/wishlist-page/wishlist-page';
import { WishlistItemComponent } from '../components/wishlist-item-component/wishlist-item-component';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { AddressProvider } from '../providers/address-provider';
import { OrderConfirmationPage } from '../pages/order-confirmation/order-confirmation';
import { OrderProvider } from '../providers/order-provider';
import { Facebook } from '@ionic-native/facebook';
import { Camera } from '@ionic-native/camera';
import { UserManagementProvider } from '../providers/user-management-provider';
import { Transfer } from '@ionic-native/transfer';
import { ActivityDetailPage } from '../pages/activity-detail/activity-detail';
import { MyProfilePage } from '../pages/my-profile/my-profile';
import { ActivityProvider } from '../providers/activity-provider';
import { ActivitiesComponent } from '../components/activities/activities';
import { ActivityItemComponent } from '../components/activity-item/activity-item';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Toast } from '@ionic-native/toast';
import { FacebookProvider } from '../providers/facebook/facebook';

import { IonicImageViewerModule } from 'ionic-img-viewer';
import { AppManagementProvider } from '../providers/app-management/app-management';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PushNotificationProvider } from '../providers/push-notification/push-notification';
import { AppRate } from '@ionic-native/app-rate';
import { InvitePageModule } from '../pages/invite/invite.module';
import { PasswordChangePageModule } from '../pages/password-change/password-change.module';
import { ShippingAddressProvider } from '../providers/shipping-address/shipping-address';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CardIO } from '@ionic-native/card-io';
import { ErrorHandlerProvider } from '../providers/error-handler/error-handler';
import { EditShippingAddressPageModule } from '../pages/edit-shipping-address/edit-shipping-address.module';
import { TokenInterceptorProvider } from '../providers/token-interceptor/token-interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Contacts } from '@ionic-native/contacts';
import { PhoneNumberProvider } from '../providers/phone-number/phone-number';
import { SearchContactPage } from '../pages/search-contact/search-contact';

import { ConnectFacebookPage } from '../pages/connect-facebook/connect-facebook';
import { FacebookFriendsListComponent } from '../components/facebook-friends-list/facebook-friends-list';
import { PhoneConfirmationPage } from '../pages/phone-confirmation/phone-confirmation';
import { AddPhonePage } from '../pages/add-phone/add-phone';
import { WelcomePage } from '../pages/welcome/welcome';
import { AddBirthdayPageModule } from '../pages/add-birthday/add-birthday.module';
import { BirthdayProvider } from '../providers/birthday/birthday';
import { ProductSearchTypePage } from '../pages/product-search-type/product-search-type';
import { ProductSearchTypePageModule } from '../pages/product-search-type/product-search-type.module';






declare var window;




@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        ShopPage, ProductSearchPage, ProductItemPage, ProductDetailPage,
        NewsFeedPage, LoginPage, RegisterPage, FriendsPage, FriendsItemComponent,
        FriendSearchPagePage, WishlistPage, WishlistItemComponent,
        AddToCartButtonComponent, CartPage, CheckoutPage, ProfilePage, AddPaymentMethodComponent,
        OrderConfirmationPage, OrderListPage, ImgURLPipe, ActivityDetailPage, MyProfilePage,
        ProfileComponent, ActivitiesComponent, ActivityItemComponent, FriendSearchInputComponent,
        FacebookFriendsPage, MyAccountPage, BarcodeSearchPage, FacebookFriendsButtonComponent,
        FollowerListPage, FollowingListPage, SearchContactPage, ConnectFacebookPage, FacebookFriendsListComponent, PhoneConfirmationPage, AddPhonePage,
        WelcomePage],
    imports: [
        IonicModule.forRoot(MyApp), HttpClientModule, FormsModule, IonicStorageModule.forRoot({
            name: '__oorsi_db',
            driverOrder: ['sqlite']
        }), MomentModule, BrowserModule, AboutModule, IonicImageViewerModule, InvitePageModule,
        ForgotPasswordPageModule, PasswordChangePageModule, PasswordResetPageModule,
        ShippingAddressesPageModule, PaymentMethodsPageModule, AddShippingAddressPageModule,
        PrivacyStatementPageModule, TermsAndConditionsPageModule, EditShippingAddressPageModule, AddBirthdayPageModule, ProductSearchTypePageModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        ShopPage,
        ProductSearchPage, ProductDetailPage, ProductDetailPage, NewsFeedPage,
        LoginPage, RegisterPage, FriendsPage, FriendSearchPagePage,
        WishlistPage, CartPage, CheckoutPage, OrderConfirmationPage, OrderListPage, AddPaymentMethodComponent,
        ProfilePage, ActivityDetailPage, MyProfilePage, FacebookFriendsPage, MyAccountPage, BarcodeSearchPage,
        FacebookFriendsButtonComponent, FollowerListPage, FollowingListPage, SearchContactPage,
        ConnectFacebookPage, FacebookFriendsListComponent, PhoneConfirmationPage, AddPhonePage, WelcomePage

    ],
    providers: [IonicErrorHandler, [{ provide: ErrorHandler, useClass: ErrorHandlerProvider }], ProductService, AuthService, Friendship,
        ActivityProvider, WishlistProvider, CartProvider, CheckoutProvider, AddressProvider, PaymentProvider,
        OrderProvider, ProfileProvider, UserManagementProvider, Transfer, File, AppRate,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorProvider,
            multi: true
        }, Stripe, Facebook, Camera, ImagePicker, StatusBar,
        SplashScreen, Toast,
        FacebookProvider,
        UserManagementProvider,
        AppManagementProvider, AppVersion, SocialSharing,
        PushNotificationProvider,
        ShippingAddressProvider, BarcodeScanner, CardIO,
        ErrorHandlerProvider, GoogleAnalytics, Contacts, PhoneNumberProvider,
        BirthdayProvider

    ]
})
export class AppModule { }
