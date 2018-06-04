import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { FirebaseListener } from '../../providers/firebase-service/FirebaseListener';
import { FirebaseAuthError } from '../../providers/firebase-service/FirebaseAuthError';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { Task } from '../../models/Task';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements FirebaseListener {

  uEmail:string;
  items=[];

 
  constructor(
    public navCtrl: NavController, 
    public keyboard: Keyboard, 
    public toastCtrl: ToastController,
    public firebaseService: FirebaseServiceProvider) {
    this.firebaseService.setFirebaseListener(this);
    this.checkSignIn();
  }
  checkSignIn() {
    this.firebaseService.checkSigning();
  }
  
  OnSignUpComplete(email: string): void {
    
  }
  OnSignInComplete(email: string): void {
    
  }
  OnSignInCheck(email: string): void {
    this.uEmail=email;
    this.firebaseService.getListOrderedByChild('/tasks', 'assignedTo', this.uEmail); 
  }
  OnSignOutComplete(): void {
   
  }
  OnAuthError(error: FirebaseAuthError): void {
    
  }
  OnDataListComplete(dataList: any[]): void {
    const list = dataList as Task[];
    //console.log(list.length);
    for(let i=0; i < list.length; i++){ 
      this.items.push(list[i]);
   }
    console.log(this.items) 
    console.log(list[1].assignedTo) 
  }
 
}
