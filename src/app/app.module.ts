import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard } from '@ionic-native/keyboard';
import { HttpClientModule } from '@angular/common/http';
import { FCM } from '@ionic-native/fcm';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SplashPage } from '../pages/splash/splash';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { FirebaseConfig } from '../Config/FirebaseConfig';
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { FireStorageServiceProvider } from '../providers/fire-storage-service/fire-storage-service';
import { LoadingControllerProvider } from '../providers/loading-controller/loading-controller';
import { UtilityProvider } from '../providers/utility/utility';
import { MainPage } from '../pages/main/main';
import { NotificationPage } from '../pages/notification/notification';
import { ProfilePage } from '../pages/profile/profile';
import { TaskPage } from '../pages/task/task';

      
@NgModule({
  declarations: [
    MyApp,
    SplashPage,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    NotificationPage,
    ProfilePage,
    TaskPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false, 
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SplashPage,
    LoginPage,
    SignUpPage,
    MainPage,
    HomePage,
    NotificationPage,
    ProfilePage,
    TaskPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Keyboard,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    LoadingControllerProvider,
    FireStorageServiceProvider,
    UtilityProvider,
    FCM
  ]
})
export class AppModule {}
