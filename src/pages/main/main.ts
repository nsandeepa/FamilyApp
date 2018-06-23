import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignUpPage } from '../sign-up/sign-up';
import { NotificationPage } from '../notification/notification';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
  
  private rootPage;
  private homePage;
  private notificationPage;
  private profilePage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.rootPage = HomePage;
    this.homePage = HomePage;
    this.notificationPage = NotificationPage;
    this.profilePage = ProfilePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  openPage(p) {
    this.rootPage = p;
  }

}
