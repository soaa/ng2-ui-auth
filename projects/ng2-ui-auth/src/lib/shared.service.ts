import { Injectable } from '@angular/core';
import { StorageType } from './storage-type.enum';
import { Subscriber, Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
import {Tokens} from './config-interfaces';
import {TokenRefreshService} from './token.refresh.service';

@Injectable()
export class SharedService {
  public tokenName = this.config.options.tokenPrefix
    ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
    : this.config.options.tokenName;
  public refreshTokenName = this.config.options.tokenPrefix
    ? [this.config.options.tokenPrefix, this.config.options.refreshTokenName].join(this.config.options.tokenSeparator)
    : this.config.options.refreshTokenName;


  constructor(private storage: StorageService, private config: ConfigService, private tokenRefreshService: TokenRefreshService) {}

  public async getRefreshToken() {
    return await this.storage.get(this.refreshTokenName);
  }

  public async getToken() {
    return await this.storage.get(this.tokenName);
  }

  public async getPayload(token?: string) {
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

  public async setToken(response: string | object):Promise<Tokens> {
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
      await this.storage.set(this.refreshTokenName, tokens.refreshToken, expDate ? expDate.toUTCString() : '');
    }

    return tokens;
  }

  public async removeToken() {
    await this.storage.remove(this.tokenName);
  }

  public async isAuthenticated(token?: string) {
    if (!token) {
      token = await this.getToken();
    }

    // a token is present
    if (token) {
      if (this.isValidToken(token)) {
        return true;
      }

      const refreshToken = await this.getRefreshToken();
      if (refreshToken) {
        if (this.isValidToken(refreshToken)) {
          const response = await this.tokenRefreshService.requestTokenRefresh(refreshToken).toPromise();
          const tokens = await this.setToken(response);

          return tokens && this.isValidToken(tokens.accessToken);
        }

        await this.storage.remove(this.refreshTokenName);
      }

      await this.storage.remove(this.tokenName);
    }

    return false;
  }

  isValidToken(token: string): boolean {
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
          return !isExpired;
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
    if (!token) {
      token = await this.getToken();
    }

    const payload = await this.getPayload(token);
    if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
      const date = new Date(0);
      date.setUTCSeconds(payload.exp);
      return date;
    }
    return null;
  }

  public logout(): Observable<any> {
    return Observable.create(async (observer: Subscriber<any>) => {
      await this.storage.remove(this.tokenName);
      observer.next();
      observer.complete();
    });
  }

  public setStorageType(type: StorageType) {
    return this.storage.updateStorageType(type);
  }

  private b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  }
}
