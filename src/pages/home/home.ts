import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Task } from '../../models/Task';
import { LoadingControllerProvider } from '../../providers/loading-controller/loading-controller';
import { LoginPage } from '../login/login';
import { UtilityProvider } from '../../providers/utility/utility';
import { TaskPage } from '../task/task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements FirebaseListener {

  public userEmail: string;
  public items: any = [];
  public isDataAvailable = true;

  constructor(
    public navCtrl: NavController,
    public keyboard: Keyboard,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingControllerProvider,
    public utilityCtrl: UtilityProvider,
    public modalCtrl: ModalController
  ) {
    this.firebaseService.setFirebaseListener(this);
    this.firebaseService.checkSigning();
    this.loadingCtrl.showLoader("dots", "Please wait...");
  }

  openItem(item: any): void {
    this.modalCtrl.create(TaskPage, {"item": item}).present();
  }

  logOutDialog(): void {
    this.utilityCtrl.showSimpleAlert(
      "LogOut",
      "Do you want to log out",
      [
        {
          text: 'Yes',
          handler: data=> {
              this.firebaseService.signOut();
          }
        },
        {
          text: 'No'
        }
      ]);
  }

  OnSignUpComplete(email: string): void {

  }

  OnSignInComplete(email: string): void {

  }

  OnSignInCheck(email: string): void {
    if (!email) {
      this.loadingCtrl.dismissLoader();
      this.navCtrl.setRoot(LoginPage);
    } else {
      this.userEmail = email;
      this.firebaseService.getListOrderedByChild('/tasks', 'assignedTo', this.userEmail);
    }
  }
  OnSignOutComplete(): void {
    this.navCtrl.setRoot(LoginPage);
  }
  OnAuthError(error: FirebaseAuthError): void {

  }
  OnDataListComplete(dataList: any[]): void {
    this.loadingCtrl.dismissLoader();
    this.items = [];
    dataList.forEach((item)=> {
      if(item.values.isAssigned) {
        this.items.push(item);
      }
    });
    if (this.items.length == 0) {
      this.isDataAvailable = false;
      this.items = [];
      this.utilityCtrl.showSimpleAlert("Oops!", "There are no task assigned to you right now. Check again later.", ["OK"]);
    } else {
      this.isDataAvailable = true;
    }
  }

  OnDataCreateComplete(): void {

  }

  OnDataUpdateComplete(): void {

  }

  OnDataRemoveComplete(): void {

  }

  OnDataOperatoinError(): void {

  }
}
