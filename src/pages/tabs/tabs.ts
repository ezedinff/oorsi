import { WishlistPage } from './../wishlist-page/wishlist-page';
import { FriendsPage } from './../friends/friends';
import { Component } from '@angular/core';

import { ShopPage } from '../shop/shop';
import { NewsFeedPage } from '../news-feed/news-feed';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  tabShop: any = ShopPage;
  tabNewsFeed: any = NewsFeedPage;
  tabFriends: any = FriendsPage;
  tabWishList: any = WishlistPage;


  constructor() {

    

  }
}
