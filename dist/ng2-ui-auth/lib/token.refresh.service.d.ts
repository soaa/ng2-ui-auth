import { Observable } from 'rxjs';
export declare class TokenRefreshService {
    requestTokenRefresh<T extends object | string = any>(refreshToken: string): Observable<T>;
}
