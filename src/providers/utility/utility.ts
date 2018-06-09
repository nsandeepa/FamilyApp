import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController, Alert } from 'ionic-angular';

/*
  Generated class for the UtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilityProvider {

  public loader: Loading;
  public alert: Alert;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {
    console.log('Hello UtilityProvider Provider');
  }

  public showLoader(spinner: string, content: string): void {
    this.loader = this.loadingCtrl.create({
      spinner: spinner,
      content: content
    });
    this.loader.present();
  }

  public dismissLoader(): void {
    this.loader.dismiss();
  }

  public showSimpleAlert(title: string, subTitle: string, buttons: string[]): void {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: buttons
    });
    alert.present();
  }
}