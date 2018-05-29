import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { HomePage } from "../home/home";
import { LoginPage } from '../login/login';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { User } from '../../models/User';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//  class User {
//    public key: string;
//    public details: any;
//    constructor(key, details) {
//      this.key = key;
//      this.details = details;
//    }
//  }

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage implements FirebaseListener {

  isLoggedIn: boolean;

  items = [
    {
      "email": "sdafasdf"
    },
    {
      "email": "234234"
    }
  ];

  public usersRef: Observable<any[]>;
  //public userArray: User[];

  public users: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseServiceProvider) {
      this.firebaseService.setFirebaseListener(this);
      this.usersRef = fireDb.list('/users', ref=> ref.orderByChild('email').equalTo('imesha.ag@gmail.com')).valueChanges();
    // this.usersRef.subscribe((data)=> {
    //   this.userArray = data as User[];
    //   console.log(data)
    //   this.OnFirebaseData();
    // })
    // this.users = fireDb.list('/users', ref=> ref.orderByChild('email').equalTo('imesha.ag@gmail.com')).snapshotChanges();
    // this.users.subscribe( data =>{
    //   console.log(data.length)  
    //   if (data) {
    //     data.map( test =>{
    //       console.log(test.key + " -> " + JSON.stringify(test.payload.val()));
    //     });  		
    //   } else {
    //     console.log("No Data");
    //   }
    // });
    //this.firebaseService.checkSigninig();
  }

  OnFirebaseData() {
    // let dataToast = this.toastCtrl.create({
    //   message: this.userArray[2].key,
    //   duration: 1000
    // });
    // dataToast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

  signUp() {
    const user: User = {
      email: "nilupul@gmail.com",
      password: "XXX111"
    };
    this.firebaseService.signUpUser(user);
  }

  signIn() {
    const user: User = {
      email: "nilupul@gmail.com",
      password: "XXX111"
    };
    this.firebaseService.signInUser(user);
  }

  checkSignIn() {
    this.firebaseService.checkSigning();
  }

  signOut() {
    this.firebaseService.signOut();
  }

  deleteUser() {
    this.firebaseService.deleteUser(null);
  }

  OnSignUpComplete(email: string): void {
    this.showToast(email)
  }

  OnSignInComplete(email: string): void {
    this.showToast(email);
  }

  OnSignInCheck(email: string): void {
    this.showToast(email);
  }

  OnSignOutComplete(): void {

  }

  OnAuthError(error: FirebaseAuthError): void {
    this.showToast("error");
  }

  showToast(message: string) {
    let signInToast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    signInToast.present();
  }
}
