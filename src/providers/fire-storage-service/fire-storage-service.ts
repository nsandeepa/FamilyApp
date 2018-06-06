import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { FireStorageListener } from './FireStorageListener';
import { FireStorageError } from './FireStorageError';

/*
  Generated class for the FireStorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FireStorageServiceProvider {

  private fireStorageListener: FireStorageListener; 

  constructor(
    public http: HttpClient,
    public fireStorage: AngularFireStorage
  ) {
  }

  public uploadFile(file: any, fileName: string, filePath): void {
    const reference = this.fireStorage.ref(filePath + fileName);
    reference.put(file)
      .then((res)=> {
        if(res) {
          if(this.fireStorageListener) {
            res.ref.getDownloadURL()
          }
        } else {
          if(this.fireStorageListener) {
            this.fireStorageListener.OnStorageOperationError(FireStorageError.UPLOADERROR);
          }
        }
      })
      .catch((error)=> {
        if(this.fireStorageListener) {
          this.fireStorageListener.OnStorageOperationError(FireStorageError.UPLOADERROR);
        }
      });
  }

  public getDownloadUrl(filePath: string, fileName: string) {
    this.fireStorage.ref(filePath + fileName).getDownloadURL()
      .subscribe((res)=>{
        if(res) {
          if(this.fireStorageListener) {
            this.fireStorageListener.OnDownloadUrlCompleted(res);
          }
        } else {
          if(this.fireStorageListener) {
            this.fireStorageListener.OnStorageOperationError(FireStorageError.DOWNLOADURLERROR);
          }
        }
      });
  }

  public setFireStorageListener(fireStorageListener: FireStorageListener) {
    this.fireStorageListener = fireStorageListener;
  }

}
