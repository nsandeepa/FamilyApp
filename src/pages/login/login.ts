import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController  } from 'ionic-angular';

import { Config } from '../../Config/AppConfig';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from '../../models/User';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service'
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError'; 
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

  user: User = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,
    public firebaseService: FirebaseServiceProvider) {
      this.firebaseService.setFirebaseListener(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {

    if(!this.user.email || !this.user.password){
  
        let alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Fields cannot be empty',
          buttons: ['Dismiss']
        });
        alert.present();
       
    }else{
          let signInToast = this.toastCtrl.create({
            message: "Signed In",
            duration: 1000
          });
          signInToast.present();
          this.user.email = this.user.email.concat( "@gmail.com" );
        
          this.firebaseService.signInUser(this.user);
        }
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }
  OnSignUpComplete(email: string){

  }
  OnSignInComplete(email: string){
    let signInToast = this.toastCtrl.create({
      message: email,
      duration: 1000
    });
    signInToast.present();
  }
  OnSignInCheck(email: string){

  }
  OnSignOutComplete(){

  }
  OnAuthError(error: FirebaseAuthError){

  }


}