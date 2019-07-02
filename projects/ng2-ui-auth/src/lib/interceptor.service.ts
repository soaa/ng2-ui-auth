import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import {from, Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private shared: SharedService, private config: ConfigService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { authHeader, authToken } = this.config.options;

    return from(Promise.all([this.shared.getToken(), this.shared.isAuthenticated()]))
      .pipe(
        switchMap((auth) => {
          const token = auth[0];
          const isAuthenticated = auth[1];

          const newReq =
            isAuthenticated && !req.headers.has(authHeader) ? req.clone({setHeaders: {[authHeader]: `${authToken} ${token}`}}) : req;
          return next.handle(newReq);
        })
      );
  }
}
