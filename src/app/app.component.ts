import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
<<<<<<< HEAD
import { HomePage } from '../pages/home/home';
=======
>>>>>>> 4bd667e9848fb59a1a6d23d79665fe67c64dc73b
import { SplashPage } from '../pages/splash/splash';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SplashPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}