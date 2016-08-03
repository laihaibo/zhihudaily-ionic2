import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav,Modal} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ListPage} from './pages/list/list';
import {Login} from './pages/login/login';
import {ItemDetailsPage} from './pages/item-details/item-details';


@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController
    // private navCtrl: NavController
  ) {
    this.initializeApp();
    // this.navCtrl=navCtrl;

    // set our app's pages
    this.pages = [
      { title: '首页', component: HelloIonicPage },
      { title: '栏目', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  login(){
    let modal = Modal.create(Login);
    this.menu.close();
    this.nav.present(modal);
    console.log('xixi');
  }
  collection(){
    let modal = Modal.create(Login);
    this.menu.close();
    this.nav.present(modal);
    console.log('xixi');
  }
}

ionicBootstrap(MyApp);
