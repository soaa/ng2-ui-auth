import { Observable } from 'rxjs/Observable';
import { IOauth2Options, IOauth1Options } from './config.service';
/**
 * Created by Ron on 17/12/2015.
 */
export declare class PopupService {
    open(url: string, options: IOauth2Options | IOauth1Options, cordova: boolean | null): Observable<{}>;
    eventListener(popupWindow: Window, redirectUri: string): Observable<{}>;
    pollPopup(popupWindow: Window, redirectUri: string): Observable<{}>;
    private prepareOptions(options?);
    private stringifyOptions(options);
    private parseQueryString(joinedKeyValue);
    private isCordovaApp();
}
