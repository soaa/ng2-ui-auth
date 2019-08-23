import { Observable } from 'rxjs';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
import { StorageType } from './storage-type.enum';
export declare class AuthService {
    private shared;
    private local;
    private oauth;
    constructor(shared: SharedService, local: LocalService, oauth: OauthService);
    login<T extends string | object = any>(user: string | object, url?: string): Observable<T>;
    signup<T = any>(user: string | object, url?: string): Observable<T>;
    logout(): Observable<void>;
    authenticate<T extends object | string = any>(name: string, userData?: any): Observable<T>;
    link<T extends object | string = any>(name: string, userData?: any): Observable<T>;
    unlink<T = any>(provider: string, url?: string): Observable<T>;
    isAuthenticated(): Promise<boolean>;
    getToken(): Promise<string | null>;
    setToken(token: string | object): Promise<void>;
    removeToken(): Promise<void>;
    getPayload(): Promise<any>;
    setStorageType(type: StorageType): Promise<boolean>;
    getExpirationDate(): Promise<Date | null>;
}
