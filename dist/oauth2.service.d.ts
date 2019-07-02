import { IOauthService } from './oauth-service.interface';
import { Observable } from 'rxjs/Observable';
import { ConfigService, IOauth2Options } from './config.service';
import { PopupService } from './popup.service';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
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
