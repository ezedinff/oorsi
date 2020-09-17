import { Observable } from 'rxjs/Observable';
import { User } from './../model/user';
import { OORSI_API_ENDPOINT } from './../const';
import { Injectable, resolveForwardRef, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';



import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { Storage } from '@ionic/storage';


@Injectable()
export class UserManagementProvider {

    userInfoEmmiter: EventEmitter<User>;
    loggedInUser: User;


    constructor(public http: HttpClient, private transfer: Transfer, private file: File, private storage: Storage) {
        console.log('Hello UserManagementProvider Provider');
        this.userInfoEmmiter = new EventEmitter();
    }

    uploadProfilePicture(filePath: string): Promise<any> {

        let fileTransfer: TransferObject = this.transfer.create();

        return new Promise<any>((resolve, reject) => {
            this.storage.get("currentUser").then(token => {
                let options: FileUploadOptions = {
                    fileKey: 'file',
                    fileName: 'upload.jpg',
                    headers: { Authorization: token }
                }

                let uploadUrl = OORSI_API_ENDPOINT + 'user/profile/picture/upload';
                console.log(uploadUrl);

                fileTransfer.upload(filePath, encodeURI(uploadUrl), options, true)
                    .then((data) => {
                        resolve(data);
                        console.log("fucking success:" + data);
                        //update user info so that the profile Picture gets updated
                        this.updateUserInfo();
                    }, (err) => {
                        console.log("fucking error:" + JSON.stringify(err));
                        resolve(err);
                    })

            });
        });
    }

    updateUserInfo() {
        return this.http.get<User>(OORSI_API_ENDPOINT + "user/info.json").subscribe(data => {
            this.loggedInUser = data;
            this.userInfoEmmiter.emit(this.loggedInUser);
        }, err => {
            console.log("Error loading user info");
            this.userInfoEmmiter.emit(undefined);
        });
    }

    changePassword(changePasswordRequest): Observable<any> {
        return this.http.post(OORSI_API_ENDPOINT + 'user/password/change', changePasswordRequest);
    }
}
