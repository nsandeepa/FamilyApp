import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import { Config } from '../../Config/AppConfig';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from '../../models/User';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service'
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { HomePage } from '../home/home';
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
    public firebaseService: FirebaseServiceProvider
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
    let signInToast = this.toastCtrl.create({
      message: "Signed In",
      duration: 1000
    });
    signInToast.present();
    this.navCtrl.setRoot(HomePage);
  }

  OnSignInCheck(email: string): void {

  }

  OnSignOutComplete(): void {

  }

  OnAuthError(error: FirebaseAuthError): void {

  }

  OnDataListComplete(dataList: any[]): void {

  }

  showAlert(title: string, message: string): void {
    let alertMsg = this.alertCtrl.create({
      title: 'Login Error',
      subTitle: 'Fields cannot be empty',
      buttons: ['Dismiss']
    });
    alertMsg.present();
  }
}