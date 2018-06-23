import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage implements FirebaseListener {

  private task: any;
  private isDone;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseServiceProvider
  ) {
    this.firebaseService.setFirebaseListener(this);
    this.task = navParams.get("item");
    this.isDone = this.task.values.isDone;
    console.log(this.task);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskPage');
  }

  taskDone(): void {
    this.task.values.isDone = true;
    this.firebaseService.updateData("/tasks", this.task.key, this.task.values);
  }

  dismiss(): void {
    this.navCtrl.pop();
  }
  
  OnSignUpComplete(email: string): void {

  }

  OnSignInComplete(email: string): void {

  }

  OnSignInCheck(email: string): void {

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
    this.isDone = true;
  }

  OnDataRemoveComplete(): void {

  }

  OnDataOperatoinError(): void {

  }
}
