import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { HomePage } from "../home/home";
import { LoginPage } from '../login/login';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 class User {
   constructor(public email) {}
 }

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage {

  isLoggedIn: boolean;

  public usersRef: Observable<any[]>;
  public userArray: User[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireDb: AngularFireDatabase,
    public toastCtrl: ToastController) {
    // this.usersRef = fireDb.list('/users').valueChanges();
    // this.usersRef.subscribe((data)=> {
    //   this.userArray = data as User[];
    //   console.log(data)
    //   this.OnFirebaseData();
    // })
    fireDb.list('users').snapshotChanges().subscribe((data)=>
      data.map((actions)=>
        console.log(actions.payload.key)
      )
    )
  }

  OnFirebaseData() {
    let dataToast = this.toastCtrl.create({
      message: this.userArray[2].email,
      duration: 1000
    });
    dataToast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  goHome() {
    this.navCtrl.setRoot(HomePage);
  }

  goLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
