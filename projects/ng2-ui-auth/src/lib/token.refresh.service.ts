import { Injectable } from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';

@Injectable()
export class TokenRefreshService  {

  requestTokenRefresh<T extends object | string = any>(refreshToken: string): Observable<T> {
    return EMPTY;
  }

}
