import { IOauthService } from './oauth-service.interface';
import { PopupService } from './popup.service';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class OauthService {
    protected http: HttpClient;
    protected shared: SharedService;
    protected config: ConfigService;
    protected popup: PopupService;
    readonly depProviders: ({
        provide: typeof HttpClient;
        useValue: HttpClient;
    } | {
        provide: typeof PopupService;
        useValue: PopupService;
    } | {
        provide: typeof ConfigService;
        useValue: ConfigService;
    })[];
    readonly deps: (typeof ConfigService | typeof PopupService | typeof HttpClient)[];
    constructor(http: HttpClient, shared: SharedService, config: ConfigService, popup: PopupService);
    authenticate<T extends object | string>(name: string, userData?: any): Observable<T>;
    protected providerOf(name: string): IOauthService;
    unlink<T>(provider: string, url?: any, method?: string): Observable<T>;
}
