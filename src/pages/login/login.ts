import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Config } from '../../Config/AppConfig';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from '../../models/User';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service'
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { HomePage } from '../home/home';
import { FCM } from '@ionic-native/fcm';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements FirebaseListener {

  public user: User = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider,
    public fcmCtrl: FCM
  ) {
    this.firebaseService.setFirebaseListener(this);
  }

  signIn() {
    if (!this.user.email || !this.user.password) {
      this.showAlert("Login Error", "Fields cannot be empty");
    } else {
      this.user.email = this.user.email.concat("@gmail.com");
      this.firebaseService.signInUser(this.user);
    }
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }

  OnSignUpComplete(email: string): void {

  }

  OnSignInComplete(email: string): void {
    this.firebaseService.getListOrderedByChild("/users", "email", email);
  }

  OnSignInCheck(email: string): void {

  }

  OnSignOutComplete(): void {

  }

  OnAuthError(error: FirebaseAuthError): void {

  }

  OnDataListComplete(dataList: any[]): void {
    this.fcmCtrl.getToken()
      .then((token)=> {
        dataList[0].values.notificationToken = token;
        this.firebaseService.updateData("/users", dataList[0].key, dataList[0].values);
      });
  }

  OnDataCreateComplete(): void {

  }

  OnDataUpdateComplete(): void {
    this.navCtrl.setRoot(HomePage);
  }

  OnDataRemoveComplete(): void {

  }

  OnDataOperatoinError(): void {
    
  }

  showAlert(title: string, message: string): void {
    let alertMsg = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Dismiss']
    });
    alertMsg.present();
  }
}