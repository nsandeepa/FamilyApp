import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  

  constructor(public navCtrl: NavController, public keyboard: Keyboard, public toastCtrl: ToastController) {
    
  }

}



