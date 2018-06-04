import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';

/*
  Generated class for the LoadingControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoadingControllerProvider {

  public loader: Loading;

  constructor(
    public http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
    console.log('Hello LoadingControllerProvider Provider');
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
}
