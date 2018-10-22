import { TokenRefreshService } from './token.refresh.service';
/**
 * Created by Ron on 17/12/2015.
 */
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Injectable } from '@angular/core';
import { ConfigService, Tokens } from './config.service';
import { StorageService } from './storage.service';
import { StorageType } from './storage-type.enum';

/**
 * Created by Ron on 17/12/2015.
 */

@Injectable()
export class SharedService {
    public tokenName = this.config.options.tokenPrefix
        ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
        : this.config.options.tokenName;

    public refreshTokenName = this.config.options.tokenPrefix
        ? [this.config.options.tokenPrefix, this.config.options.refreshTokenName].join(this.config.options.tokenSeparator)
        : this.config.options.refreshTokenName;


    constructor(
        private tokenRefreshService: TokenRefreshService,
        private storage: StorageService,
        private config: ConfigService) { }


    public async getRefreshToken() {
        let refreshToken = await this.storage.get(this.refreshTokenName);
        return refreshToken;
    }

    public async getToken() {
        let token = await this.storage.get(this.tokenName);
        return token;
    }

    public async getPayload(token?: string) {
        token = token || await this.getToken();
        if (!token) {
          token = await this.getToken();
        }

        if (token && token.split('.').length === 3) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(this.b64DecodeUnicode(base64));
            } catch (e) {
                return undefined;
            }
        }
    }

    public async setToken(response: string | object) {
        if (!response) {
            // console.warn('Can\'t set token without passing a value');
            return null;
        }

        let tokens: Tokens;
        if (typeof response === 'string') {
            tokens = {accessToken: response};
        } else {
            tokens = this.config.options.resolveToken(response, this.config.options);
        }

        if (tokens.accessToken) {
            const expDate = await this.getExpirationDate(tokens.accessToken);
            await this.storage.set(this.tokenName, tokens.accessToken, expDate ? expDate.toUTCString() : '');
        }

        if (tokens.refreshToken) {
            const expDate = await this.getExpirationDate(tokens.refreshToken);
            await this.storage.set(this.tokenName, tokens.refreshToken, expDate ? expDate.toUTCString() : '');
        }

        return tokens;
    }

    public async removeToken() {
        await this.storage.remove(this.tokenName);
    }

    public async isAuthenticated(token?: string):Promise<boolean> {
        token = token || await this.getToken();

        // a token is present
        if (token) {
            if (this.isValidToken(token)) {
                return true;
            } else {
                let refreshToken = await this.getRefreshToken();
                if (refreshToken) {
                    if (await this.isValidToken(refreshToken)) {
                        return await new Promise<boolean>((resolve, reject) => {
                            this.tokenRefreshService.requestTokenRefresh<any>(refreshToken).subscribe(async (response) => {
                                const tokens = await this.setToken(response);
                                if (tokens) {
                                    resolve(await this.isValidToken(tokens.accessToken));
                                } else resolve(false);
                            }
                            , (e) => reject(e));
                        });
                    }
                    await this.storage.remove(this.refreshTokenName);
                }

                await this.storage.remove(this.tokenName);

                return false;
            }
        }
        // lail: No token at all
        return false;
    }

    async isValidToken(token: string):Promise<boolean> {
        // token with a valid JWT format XXX.YYY.ZZZ
        if (token.split('.').length === 3) {
            // could be a valid JWT or an access token with the same format
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                // jwt with an optional expiration claims
                if (exp) {
                    const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                    if (isExpired) {
                        // fail: Expired token
                        await this.storage.remove(this.tokenName);
                        return false;
                    } else {
                        // pass: Non-expired token
                        return true;
                    }
                }
            } catch (e) {
                // pass: Non-JWT token that looks like JWT
                return true;
            }
        }
        // pass: All other tokens
        return true;
    }

    public async getExpirationDate(token?: string) {
        token = token || await this.getToken();

        const payload = await this.getPayload(token);
        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
            const date = new Date(0);
            date.setUTCSeconds(payload.exp);
            return date;
        }
        return null;
    }

    public logout(): Observable<any> {
        return Observable.create((observer: Subscriber<any>) => {
            this.storage.remove(this.tokenName).then(() => {
              observer.next();
              observer.complete();
            });
        });
    }

    public setStorageType(type: StorageType) {
        return this.storage.updateStorageType(type);
    }

    private b64DecodeUnicode(str) {
        return decodeURIComponent(
            Array.prototype.map.call(atob(str),
            c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
        ).join(''));
    }
}
