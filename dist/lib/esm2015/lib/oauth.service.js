/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Injector } from '@angular/core';
import { joinUrl } from './utils';
import { mapTo, switchMap } from 'rxjs/operators';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { from, of } from 'rxjs';
import { PopupService } from './popup.service';
import { ConfigService } from './config.service';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';
export class OauthService {
    /**
     * @param {?} http
     * @param {?} shared
     * @param {?} config
     * @param {?} popup
     */
    constructor(http, shared, config, popup) {
        this.http = http;
        this.shared = shared;
        this.config = config;
        this.popup = popup;
        this.depProviders = [
            { provide: HttpClient, useValue: this.http },
            { provide: PopupService, useValue: this.popup },
            { provide: ConfigService, useValue: this.config }
        ];
        this.deps = [HttpClient, PopupService, ConfigService];
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    authenticate(name, userData) {
        /** @type {?} */
        const provider = this.providerOf(name);
        return provider.open(this.config.options.providers[name], userData || {}).pipe(switchMap(response => {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (this.config.options.providers[name].url) {
                return from(this.shared.setToken(response)).pipe(mapTo(response));
            }
            return of(response);
        }));
    }
    /**
     * @protected
     * @param {?} name
     * @return {?}
     */
    providerOf(name) {
        return this.config.options.providers[name].oauthType === '1.0'
            ? Injector.create({ providers: [...this.depProviders, { provide: Oauth1Service, deps: this.deps }] }).get(Oauth1Service)
            : Injector.create({ providers: [...this.depProviders, { provide: Oauth2Service, deps: this.deps }] }).get(Oauth2Service);
    }
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    unlink(provider, url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl), method = 'POST') {
        return this.http.request(method, url, { body: { provider } });
    }
}
OauthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
OauthService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService },
    { type: PopupService }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.depProviders;
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.deps;
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.http;
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.shared;
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.config;
    /**
     * @type {?}
     * @protected
     */
    OauthService.prototype.popup;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGguc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzb2FhL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL29hdXRoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDbEMsT0FBTyxFQUFDLEtBQUssRUFBRSxTQUFTLEVBQW1CLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsSUFBSSxFQUFjLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMxQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFJbEQsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUFRdkIsWUFBc0IsSUFBZ0IsRUFBWSxNQUFxQixFQUFZLE1BQXFCLEVBQVksS0FBbUI7UUFBakgsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFZLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBWSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBYztRQVBwSCxpQkFBWSxHQUFHO1lBQ2hDLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRTtZQUM1QyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0MsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO1NBQ2xELENBQUM7UUFDaUIsU0FBSSxHQUFHLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUVzRSxDQUFDOzs7Ozs7O0lBRXBJLFlBQVksQ0FBNEIsSUFBWSxFQUFFLFFBQWM7O2NBQ25FLFFBQVEsR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFFckQsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUMvRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDbkIsNkRBQTZEO1lBQzdELDhEQUE4RDtZQUM5RCwyQkFBMkI7WUFDM0IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNuRTtZQUVELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDOzs7Ozs7SUFFUyxVQUFVLENBQUMsSUFBWTtRQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEtBQUssS0FBSztZQUM1RCxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO1lBQ3hILENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM3SCxDQUFDOzs7Ozs7OztJQUVNLE1BQU0sQ0FBSSxRQUFnQixFQUFFLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNO1FBQzNILE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUksTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7WUFwQ0YsVUFBVTs7OztZQUhGLFVBQVU7WUFEVixhQUFhO1lBRGIsYUFBYTtZQURiLFlBQVk7Ozs7Ozs7SUFRbkIsb0NBSUU7Ozs7O0lBQ0YsNEJBQW9FOzs7OztJQUV4RCw0QkFBMEI7Ozs7O0lBQUUsOEJBQStCOzs7OztJQUFFLDhCQUErQjs7Ozs7SUFBRSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHttYXBUbywgc3dpdGNoTWFwLCBzd2l0Y2hNYXBUbywgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVwUHJvdmlkZXJzID0gW1xuICAgIHsgcHJvdmlkZTogSHR0cENsaWVudCwgdXNlVmFsdWU6IHRoaXMuaHR0cCB9LFxuICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5wb3B1cCB9LFxuICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlVmFsdWU6IHRoaXMuY29uZmlnIH1cbiAgXTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlcHMgPSBbSHR0cENsaWVudCwgUG9wdXBTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnU2VydmljZSwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgcHJvdmlkZXI6IElPYXV0aFNlcnZpY2UgPSB0aGlzLnByb3ZpZGVyT2YobmFtZSk7XG5cbiAgICByZXR1cm4gcHJvdmlkZXIub3BlbjxUPih0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXSwgdXNlckRhdGEgfHwge30pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXG4gICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxuICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0udXJsKSB7XG4gICAgICAgICAgcmV0dXJuIGZyb20odGhpcy5zaGFyZWQuc2V0VG9rZW4ocmVzcG9uc2UpKS5waXBlKG1hcFRvKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2YocmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByb3ZpZGVyT2YobmFtZTogc3RyaW5nKTogSU9hdXRoU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLm9hdXRoVHlwZSA9PT0gJzEuMCdcbiAgICAgID8gSW5qZWN0b3IuY3JlYXRlKHsgcHJvdmlkZXJzOiBbLi4udGhpcy5kZXBQcm92aWRlcnMsIHsgcHJvdmlkZTogT2F1dGgxU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH1dIH0pLmdldChPYXV0aDFTZXJ2aWNlKVxuICAgICAgOiBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDJTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0gfSkuZ2V0KE9hdXRoMlNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIHVubGluazxUPihwcm92aWRlcjogc3RyaW5nLCB1cmwgPSBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy51bmxpbmtVcmwpLCBtZXRob2QgPSAnUE9TVCcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCB1cmwsIHsgYm9keTogeyBwcm92aWRlciB9IH0pO1xuICB9XG59XG4iXX0=