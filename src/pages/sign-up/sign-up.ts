import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupUser } from '../../models/SignupUser';
import { LoginPage } from '../login/login';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service'
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError'; 

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
export class SignUpPage {

  signupUser: SignupUser ={
      email: "",
      password: "",
      name: "",
      confirmPassword: ""
  }

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      public firebaseService: FirebaseServiceProvider) {
          this.firebaseService.setFirebaseListener(this);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  signUp(){

    console.log(this.signupUser.name);
    console.log(this.signupUser.email);
    console.log(this.signupUser.password);
    console.log(this.signupUser.confirmPassword);

   if(!this.signupUser.name || !this.signupUser.email || !this.signupUser.password || !this.signupUser.confirmPassword){
        let alert1 = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Fields cannot be empty',
          buttons: ['Dismiss']
        });

        alert1.present();

   } else if(!(this.signupUser.password === this.signupUser.confirmPassword)){
        let alert2 = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Password not mached',
          buttons: ['Dismiss']
        });
        alert2.present();
    } else if((this.signupUser.password.length<6 )){
        let alert2 = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: 'Password must be at least 6 characters',
          buttons: ['Dismiss']
        });
        alert2.present();
   }else{
        this.signupUser.email = this.signupUser.email.concat( "@gmail.com" );
        this.firebaseService.signUpUser(this.signupUser);

   }
  }

  goToSignIn() {
    this.navCtrl.push(LoginPage);
  }

  OnSignUpComplete(email: string){
    console.log("success");

  }
  OnSignInComplete(email: string){
  
  }
  OnSignInCheck(email: string){

  }
  OnSignOutComplete(){

  }
  OnAuthError(error: FirebaseAuthError){

  }
}
