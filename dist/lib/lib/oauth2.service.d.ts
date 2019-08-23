import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOauth2Options } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
export declare class Oauth2Service implements IOauthService {
    protected http: HttpClient;
    protected popup: PopupService;
    protected config: ConfigService;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService);
    open<T extends object | string = any>(oauthOptions: IOauth2Options, userData: object): Observable<T>;
    protected exchangeForToken<T>(options: IOauth2Options, authorizationData: object, oauthData: object, userData: object): Observable<T>;
    protected getAuthorizationData(options: IOauth2Options): {
        [key: string]: string;
    };
}
