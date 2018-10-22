import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TokenRefreshService  {
  
  requestTokenRefresh<T extends object | string = any>(refreshToken: string): Observable<T> {
    return of(null);
  }

}