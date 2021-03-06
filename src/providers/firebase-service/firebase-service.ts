import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

import { User } from '../../models/User';
import { FirebaseListener } from './FirebaseListener';
import { FirebaseAuthError } from './FirebaseAuthError';

/*
  Generated class for the FirebaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseServiceProvider {

  private firebaseListener: FirebaseListener;

  constructor(
    public http: HttpClient,
    public fireDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    public toastCtrl: ToastController) {
    console.log('FirebaseServiceProvider Provider');
  }

  public signUpUser(user: User): void {
    this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((response)=> {
        if(response) {
          if(this.firebaseListener) {
            this.firebaseListener.OnSignUpComplete(response.user.email);
          }
        } else {
          if(this.firebaseListener) {
            this.firebaseListener.OnSignUpComplete(null);
          }
        }
      })
      .catch((error)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnAuthError(FirebaseAuthError.SIGNUPERROR);
        }
      })
  }

  public signInUser(user: User): void {
    this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((response)=> {
        if(response) {
          if(this.firebaseListener) {
            this.firebaseListener.OnSignInComplete(response.user.email);
          }
        } else {
          if(this.firebaseListener) {
            this.firebaseListener.OnSignInComplete(null);
          }
        }
      })
      .catch((error)=> {
        this.firebaseListener.OnAuthError(FirebaseAuthError.SIGNINERROR);
      })
  }

  public checkSigning(): void {
    this.fireAuth.authState.subscribe((res)=> {
      if(res) {
        if(this.firebaseListener) {
          this.firebaseListener.OnSignInCheck(res.email);
        }
      } else {
        if(this.firebaseListener) {
          this.firebaseListener.OnSignInCheck(null);
        }
      }
    });
  }

  public signOut(): void {
    this.fireAuth.auth.signOut()
      .then((res)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnSignOutComplete();
        }
      })
      .catch((error)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnAuthError(FirebaseAuthError.SIGNOUTERROR);
        }
      })
  }

  public deleteUser(user: User): void {
    this.fireAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((res)=> {
        console.log(res);
          this.fireAuth.authState.subscribe((response)=> {
            console.log(response);
            response.delete().then((resp)=>{console.log(resp)})
          });
      })
      .catch((error)=> {
        console.log(error);
      })
  }

  public getList(path: string) {
    this.fireDB.list(path).snapshotChanges()
        .subscribe((data)=> {
          if(this.firebaseListener) {
            const dataArray: Array<Object> = [];
            data.forEach((res)=> {
              dataArray.push({key: res.key, values: res.payload.val()})
            });
            this.firebaseListener.OnDataListComplete(dataArray as any[]);
          }
        });
  }

  public getListOrderedByChild(path: string, orderByChild: string, equalTo: string) {
    this.fireDB.list(path, (ref)=> ref.orderByChild(orderByChild).equalTo(equalTo)).snapshotChanges()
        .subscribe((data)=> {
          if(this.firebaseListener) {
            const dataArray: Array<Object> = [];
            data.forEach((res)=> {
              dataArray.push({key: res.key, values: res.payload.val()})
            });
            this.firebaseListener.OnDataListComplete(dataArray as any[]);
          }
        });
  }

  public createData(path: string, object: any) {
    this.fireDB.list(path).push(object)
      .then((res)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnDataCreateComplete();
        }
      });
  }

  public updateData(path: string, key: string, newObject: any) {
    this.fireDB.list(path, (ref)=> ref.orderByKey().equalTo(key)).update(key, newObject)
      .then((res)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnDataUpdateComplete();
        }
      })
      .catch((error)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnDataOperatoinError();
        }
      })
  }

  public removeData(path: string, key: string) {
    this.fireDB.list(path).remove(key)
      .then((res)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnDataRemoveComplete();
        }
      })
      .catch((error)=> {
        if(this.firebaseListener) {
          this.firebaseListener.OnDataOperatoinError();
        }
      })
  }

  setFirebaseListener(firebaseListener) {
    this.firebaseListener = firebaseListener;
  }
}