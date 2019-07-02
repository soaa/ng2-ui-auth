import { ConfigService } from './config.service';
import { StorageType } from './storage-type.enum';
export declare abstract class StorageService {
    abstract updateStorageType(storageType: StorageType): boolean;
    abstract get(key: string): Promise<string>;
    abstract set(key: string, value: string, date: string): Promise<void>;
    abstract remove(key: string): Promise<void>;
}
/**
 * Created by Ron on 17/12/2015.
 */
export declare class BrowserStorageService extends StorageService {
    private config;
    private store;
    private storageType;
    constructor(config: ConfigService);
    updateStorageType(storageType: StorageType): boolean;
    get(key: string): Promise<string>;
    set(key: string, value: string, date: string): Promise<void>;
    remove(key: string): Promise<void>;
    private checkIsStorageAvailable(storageType);
    private isWindowStorageAvailable(storageType);
    private isCookieStorageAvailable();
    private setCookie(key, value, expires?, path?);
    private removeCookie(key, path?);
    private getCookie(key);
}
