import { Component } from '@angular/core';
import { NavController, ToastController,ModalController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Task } from '../../models/Task';
import { LoadingControllerProvider } from '../../providers/loading-controller/loading-controller';
import { LoginPage } from '../login/login';
import { UtilityProvider } from '../../providers/utility/utility';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements FirebaseListener {

  public userEmail: string;
  public items: any = [];

  constructor(
    public navCtrl: NavController,
    private modal: ModalController,
    public keyboard: Keyboard,
    public toastCtrl: ToastController,
    public firebaseService: FirebaseServiceProvider,
    public loadingCtrl: LoadingControllerProvider,
    public utilityCtrl: UtilityProvider
  ) {
    this.firebaseService.setFirebaseListener(this);
    this.firebaseService.checkSigning();
    this.loadingCtrl.showLoader("dots", "Please wait...");
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

  }
  OnAuthError(error: FirebaseAuthError): void {

  }
  OnDataListComplete(dataList: any[]): void {
    this.loadingCtrl.dismissLoader();
    if (dataList.length == 0) {
      this.utilityCtrl.showSimpleAlert("Oops!", "There are no task assigned to you right now. Check again later.", ["OK"]);
    } else {
      for (let i = 0; i < dataList.length; i++) {
        this.items.push(dataList[i]);
      }
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

  openModal(item){
    console.log(item);
    const myModal=this.modal.create('ModalPage',{data:item});
    myModal.present();
  }
}
