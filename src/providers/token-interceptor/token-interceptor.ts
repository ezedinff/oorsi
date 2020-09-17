import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

/*
  Generated class for the TokenInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TokenInterceptorProvider {


  constructor(private storage: Storage) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return Observable.fromPromise(this.storage.get('currentUser')).flatMap((token: string) => {
      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: token
          }
        });
      }
      return next.handle(request);
    })


  }

}
