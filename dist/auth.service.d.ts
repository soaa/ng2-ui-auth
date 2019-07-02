import { SharedService } from './shared.service';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { Observable } from 'rxjs/Observable';
import { StorageType } from './storage-type.enum';
import { Tokens } from './config.service';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class AuthService {
    private shared;
    private local;
    private oauth;
    constructor(shared: SharedService, local: LocalService, oauth: OauthService);
    login<T extends string | object = any>(user: string | object, url?: string): Observable<T>;
    signup<T = any>(user: string | object, url?: string): Observable<T>;
    logout(): Observable<void>;
    authenticate<T = any>(name: string, userData?: any): Observable<T>;
    link<T = any>(name: string, userData?: any): Observable<T>;
    unlink<T = any>(provider: string, url?: string): Observable<T>;
    isAuthenticated(): Promise<boolean>;
    getToken(): Promise<string | null>;
    setToken(token: string | object): Promise<Tokens>;
    removeToken(): Promise<void>;
    getPayload(): Promise<any>;
    setStorageType(type: StorageType): boolean;
    getExpirationDate(): Promise<Date | null>;
}
