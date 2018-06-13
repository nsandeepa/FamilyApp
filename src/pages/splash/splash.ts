import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';

import { HomePage } from "../home/home";
import { LoginPage } from '../login/login';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { User } from '../../models/User';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { Task } from '../../models/Task';
import { LoadingControllerProvider } from '../../providers/loading-controller/loading-controller';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html'
})
export class SplashPage implements FirebaseListener {

  public usersRef: Observable<any[]>;
  public userArray: any[];

  public users: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireDb: AngularFireDatabase,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingControllerProvider,
    public fcmCtrl: FCM
  ) {
    this.firebaseService.setFirebaseListener(this);
    this.firebaseService.checkSigning();
    this.loadingCtrl.showLoader("dots", "Checking...")
    this.registerFCM();
  }

  registerFCM() {
    this.fcmCtrl.subscribeToTopic("test");
    this.fcmCtrl.getToken()
      .then((token)=> {
        this.firebaseService.createData("/testing", {token: token});
      });
  
    this.fcmCtrl.onNotification().subscribe(data => {
      if(data.wasTapped){
        this.showToast("Backgrounddddd");
      } else {
        this.showToast("Foregrounddddd");
      }});
  }

  OnSignUpComplete(email: string): void {

  }

  OnSignInComplete(email: string): void {

  }

  OnSignInCheck(email: string): void {
    this.loadingCtrl.dismissLoader();
    if(!email) {
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.navCtrl.setRoot(HomePage);
    }
  }

  OnSignOutComplete(): void {

  }

  OnAuthError(error: FirebaseAuthError): void {

  }

  OnDataListComplete(dataList: any[]): void {

  }

  OnDataCreateComplete(): void {

  }

  OnDataUpdateComplete(): void {

  }

  OnDataRemoveComplete(): void {

  }

  OnDataOperatoinError(): void {

  }

  showToast(message: string) {
    let signInToast = this.toastCtrl.create({
      message: message,
      duration: 1000
    });
    signInToast.present();
  }
}
