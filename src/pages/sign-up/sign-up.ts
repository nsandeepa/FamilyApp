import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { SignupUser } from '../../models/SignupUser';
import { LoginPage } from '../login/login';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service'
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { HomePage } from '../home/home';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage implements FirebaseListener {

  public signupUser: SignupUser = {
    name: "",
    email: "",
    adminEmail: "",
    password: "",
    confirmPassword: ""
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider,
    public fcmCtrl: FCM
  ) {
    this.firebaseService.setFirebaseListener(this);
  }

  signUp() {
    if (!this.signupUser.name || !this.signupUser.email || !this.signupUser.password || !this.signupUser.confirmPassword) {
      this.showAlert("Login Error", "Fields cannot be empty!");
    } else if (!(this.signupUser.password === this.signupUser.confirmPassword)) {
      this.showAlert("Login Error", "Password does not match!");
    } else if ((this.signupUser.password.length < 6)) {
      this.showAlert("Login Error", "Password must be at least 6 characters.");
    } else {
      this.signupUser.email = this.signupUser.email.concat("@gmail.com");
      this.signupUser.adminEmail = this.signupUser.adminEmail.concat("@gmail.com");
      this.firebaseService.signUpUser(this.signupUser);
    }
  }

  goToSignIn() {
    this.navCtrl.pop();
  }
  
  OnSignUpComplete(email: string): void {
    this.fcmCtrl.getToken()
      .then((token)=> {
        const newUser = {
          email: email,
          name: this.signupUser.name,
          adminEmail: this.signupUser.adminEmail,
          notificationToken: token
        };
        this.firebaseService.createData("/users", newUser);
      });
  }

  OnSignInComplete(email: string): void {

  }

  OnSignInCheck(email: string): void {

  }

  OnSignOutComplete(): void {

  }
  
  OnAuthError(error: FirebaseAuthError): void {

  }

  OnDataCreateComplete(): void {
    this.navCtrl.setRoot(HomePage);
  }

  OnDataListComplete(dataList: any[]) {

  }

  OnDataUpdateComplete(): void {

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