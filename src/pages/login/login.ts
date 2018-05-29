import { Component ,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,AlertController  } from 'ionic-angular';

import { Config } from '../../Config/AppConfig';
import { SignUpPage } from '../sign-up/sign-up';
import { User } from '../../models/User';
 
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
export class LoginPage {

  // @ViewChild('mobileno') mobileno;
  // @ViewChild('password') password;
  user: User = {
    email: "",
    password: ""
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signIn() {

    if(!this.user.email && !this.user.password){
      console.log("empty");
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
  }
     console.log(this.user.password);
    
  }

  goToSignUp() {
    this.navCtrl.push(SignUpPage);
  }

}