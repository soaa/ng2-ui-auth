import { Observable } from 'rxjs';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
import { IOauthService } from './oauth-service';
export declare class OauthService {
    protected http: HttpClient;
    protected shared: SharedService;
    protected config: ConfigService;
    protected popup: PopupService;
    protected readonly depProviders: ({
        provide: typeof HttpClient;
        useValue: HttpClient;
    } | {
        provide: typeof PopupService;
        useValue: PopupService;
    } | {
        provide: typeof ConfigService;
        useValue: ConfigService;
    })[];
    protected readonly deps: (typeof HttpClient | typeof ConfigService | typeof PopupService)[];
    constructor(http: HttpClient, shared: SharedService, config: ConfigService, popup: PopupService);
    authenticate<T extends object | string>(name: string, userData?: any): Observable<T>;
    protected providerOf(name: string): IOauthService;
    unlink<T>(provider: string, url?: string, method?: string): Observable<T>;
}
