import { IOauthService } from './oauth-service.interface';
import { StorageService } from './storage.service';
import { PopupService } from './popup.service';
import { Injectable, Injector, Provider, ReflectiveInjector } from '@angular/core';
import { Oauth1Service } from './oauth1.service';
import { Oauth2Service } from './oauth2.service';
import { SharedService } from './shared.service';
import { joinUrl } from './utils';
import { ConfigService, IOauth1Options } from './config.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class OauthService {
    readonly depProviders = [
        { provide: HttpClient, useValue: this.http },
        { provide: PopupService, useValue: this.popup },
        { provide: ConfigService, useValue: this.config },
    ];
    readonly deps = [HttpClient, PopupService, ConfigService];

    constructor(
        protected http: HttpClient,
        protected shared: SharedService,
        protected config: ConfigService,
        protected popup: PopupService) { }

    public authenticate<T extends object | string>(name: string, userData?: any): Observable<T> {
        const provider: IOauthService = this.providerOf(name);

        return provider.open<T>(this.config.options.providers[name], userData || {})
            .pipe(switchMap((response) => {
                // this is for a scenario when someone wishes to opt out from
                // satellizer's magic by doing authorization code exchange and
                // saving a token manually.
                if (this.config.options.providers[name].url) {
                    return Observable.from(this.shared.setToken(response)).map(() => response);
                }

                return Observable.of(response);
            }));
    }

    protected providerOf(name: string):IOauthService {
      return this.config.options.providers[name].oauthType === '1.0'
        ? Injector.create([
          ...this.depProviders,
          { provide: Oauth1Service, deps: this.deps },
        ]).get(Oauth1Service)
        : Injector.create([
          ...this.depProviders,
          { provide: Oauth2Service, deps: this.deps },
        ]).get(Oauth2Service);
    }

    public unlink<T>(
        provider: string,
        url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl),
        method = 'POST') {
        return this.http.request<T>(method, url, { body: { provider } });
    }
}
