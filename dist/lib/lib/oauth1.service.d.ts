import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOauth1Options } from './config-interfaces';
import { ConfigService } from './config.service';
import { IOauthService } from './oauth-service';
import { PopupService } from './popup.service';
export declare class Oauth1Service implements IOauthService {
    protected http: HttpClient;
    protected popup: PopupService;
    protected config: ConfigService;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService);
    open<T extends object | string = any>(oauthOptions: IOauth1Options, userData: object): Observable<T>;
    protected exchangeForToken<T>(oauthOptions: IOauth1Options, authorizationData: object, oauthData: object, userData: object): Observable<T>;
}
