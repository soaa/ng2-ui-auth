import { StorageType } from './storage-type.enum';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
import { Tokens } from './config-interfaces';
import { TokenRefreshService } from './token.refresh.service';
export declare class SharedService {
    private storage;
    private config;
    private tokenRefreshService;
    tokenName: string;
    refreshTokenName: string;
    constructor(storage: StorageService, config: ConfigService, tokenRefreshService: TokenRefreshService);
    getRefreshToken(): Promise<string>;
    getToken(): Promise<string>;
    getPayload(token?: string): Promise<any>;
    setToken(response: string | object): Promise<Tokens>;
    removeToken(): Promise<void>;
    isAuthenticated(token?: string): Promise<boolean>;
    isValidToken(token: string): boolean;
    getExpirationDate(token?: string): Promise<Date>;
    logout(): Observable<any>;
    setStorageType(type: StorageType): boolean;
    private b64DecodeUnicode;
}
