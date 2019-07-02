import { IOauthService } from './oauth-service.interface';
import { PopupService } from './popup.service';
import { ConfigService, IOauth1Options } from './config.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class Oauth1Service implements IOauthService {
    protected http: HttpClient;
    protected popup: PopupService;
    protected config: ConfigService;
    constructor(http: HttpClient, popup: PopupService, config: ConfigService);
    open<T extends object | string = any>(oauthOptions: IOauth1Options, userData: object): Observable<T>;
    protected exchangeForToken<T>(oauthOptions: IOauth1Options, authorizationData: object, oauthData: object, userData: object): Observable<T>;
}
