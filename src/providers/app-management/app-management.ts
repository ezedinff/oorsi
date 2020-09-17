import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


/*
  Generated class for the AppManagementProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AppManagementProvider {

  private currentSnapshot: any;
  currentSnapshotChangeEmmiter: EventEmitter<any>

  constructor() {
    console.log('Hello AppManagementProvider Provider');
    this.currentSnapshotChangeEmmiter = new EventEmitter();
  }

  setCurrentSnapshot(currentSnapshot: any) {
    this.currentSnapshot = currentSnapshot;
    this.currentSnapshotChangeEmmiter.emit(currentSnapshot);
  }

  getCurrentSnapshot() {
    return this.currentSnapshot;
  }





}
