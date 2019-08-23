/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage-service';
import { ConfigService } from './config.service';
import { TokenRefreshService } from './token.refresh.service';
export class SharedService {
    /**
     * @param {?} storage
     * @param {?} config
     * @param {?} tokenRefreshService
     */
    constructor(storage, config, tokenRefreshService) {
        this.storage = storage;
        this.config = config;
        this.tokenRefreshService = tokenRefreshService;
        this.tokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.tokenName].join(this.config.options.tokenSeparator)
            : this.config.options.tokenName;
        this.refreshTokenName = this.config.options.tokenPrefix
            ? [this.config.options.tokenPrefix, this.config.options.refreshTokenName].join(this.config.options.tokenSeparator)
            : this.config.options.refreshTokenName;
    }
    /**
     * @return {?}
     */
    getRefreshToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get(this.refreshTokenName);
        });
    }
    /**
     * @return {?}
     */
    getToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get(this.tokenName);
        });
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getPayload(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!token) {
                token = yield this.getToken();
            }
            if (token && token.split('.').length === 3) {
                try {
                    /** @type {?} */
                    const base64Url = token.split('.')[1];
                    /** @type {?} */
                    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    return JSON.parse(this.b64DecodeUnicode(base64));
                }
                catch (e) {
                    return undefined;
                }
            }
        });
    }
    /**
     * @param {?} response
     * @return {?}
     */
    setToken(response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!response) {
                // console.warn('Can\'t set token without passing a value');
                return null;
            }
            /** @type {?} */
            let tokens;
            if (typeof response === 'string') {
                tokens = { accessToken: response };
            }
            else {
                tokens = this.config.options.resolveToken(response, this.config.options);
            }
            if (tokens.accessToken) {
                /** @type {?} */
                const expDate = yield this.getExpirationDate(tokens.accessToken);
                yield this.storage.set(this.tokenName, tokens.accessToken, expDate ? expDate.toUTCString() : '');
            }
            if (tokens.refreshToken) {
                /** @type {?} */
                const expDate = yield this.getExpirationDate(tokens.refreshToken);
                yield this.storage.set(this.refreshTokenName, tokens.refreshToken, expDate ? expDate.toUTCString() : '');
            }
            return tokens;
        });
    }
    /**
     * @return {?}
     */
    removeToken() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storage.remove(this.tokenName);
        });
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    isAuthenticated(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!token) {
                token = yield this.getToken();
            }
            // a token is present
            if (token) {
                if (this.isValidToken(token)) {
                    return true;
                }
                /** @type {?} */
                const refreshToken = yield this.getRefreshToken();
                if (refreshToken) {
                    if (this.isValidToken(refreshToken)) {
                        /** @type {?} */
                        const response = yield this.tokenRefreshService.requestTokenRefresh(refreshToken).toPromise();
                        /** @type {?} */
                        const tokens = yield this.setToken(response);
                        return tokens && this.isValidToken(tokens.accessToken);
                    }
                    yield this.storage.remove(this.refreshTokenName);
                }
                yield this.storage.remove(this.tokenName);
            }
            return false;
        });
    }
    /**
     * @param {?} token
     * @return {?}
     */
    isValidToken(token) {
        // token with a valid JWT format XXX.YYY.ZZZ
        if (token.split('.').length === 3) {
            // could be a valid JWT or an access token with the same format
            try {
                /** @type {?} */
                const base64Url = token.split('.')[1];
                /** @type {?} */
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                /** @type {?} */
                const exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                // jwt with an optional expiration claims
                if (exp) {
                    /** @type {?} */
                    const isExpired = Math.round(new Date().getTime() / 1000) >= exp;
                    return !isExpired;
                }
            }
            catch (e) {
                // pass: Non-JWT token that looks like JWT
                return true;
            }
        }
        // pass: All other tokens
        return true;
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getExpirationDate(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!token) {
                token = yield this.getToken();
            }
            /** @type {?} */
            const payload = yield this.getPayload(token);
            if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
                /** @type {?} */
                const date = new Date(0);
                date.setUTCSeconds(payload.exp);
                return date;
            }
            return null;
        });
    }
    /**
     * @return {?}
     */
    logout() {
        return Observable.create((observer) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.storage.remove(this.tokenName);
            observer.next();
            observer.complete();
        }));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return this.storage.updateStorageType(type);
    }
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    b64DecodeUnicode(str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    }
}
SharedService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SharedService.ctorParameters = () => [
    { type: StorageService },
    { type: ConfigService },
    { type: TokenRefreshService }
];
if (false) {
    /** @type {?} */
    SharedService.prototype.tokenName;
    /** @type {?} */
    SharedService.prototype.refreshTokenName;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype.storage;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype.config;
    /**
     * @type {?}
     * @private
     */
    SharedService.prototype.tokenRefreshService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac29hYS9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRzVELE1BQU0sT0FBTyxhQUFhOzs7Ozs7SUFTeEIsWUFBb0IsT0FBdUIsRUFBVSxNQUFxQixFQUFVLG1CQUF3QztRQUF4RyxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBUnJILGNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ2hELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQzNHLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDM0IscUJBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUN2RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FB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LE1BQU07UUFDWCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBTyxRQUF5QixFQUFFLEVBQUU7WUFDM0QsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2hCLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7Ozs7SUFFTSxjQUFjLENBQUMsSUFBaUI7UUFDckMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlDLENBQUM7Ozs7OztJQUVPLGdCQUFnQixDQUFDLEdBQUc7UUFDMUIsT0FBTyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN0SSxDQUFDOzs7WUFqSkYsVUFBVTs7OztZQUxGLGNBQWM7WUFDZCxhQUFhO1lBRWQsbUJBQW1COzs7O0lBSXpCLGtDQUVrQzs7SUFDbEMseUNBRXlDOzs7OztJQUc3QixnQ0FBK0I7Ozs7O0lBQUUsK0JBQTZCOzs7OztJQUFFLDRDQUFnRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7VG9rZW5zfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7VG9rZW5SZWZyZXNoU2VydmljZX0gZnJvbSAnLi90b2tlbi5yZWZyZXNoLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XG4gIHB1YmxpYyB0b2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XG4gICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcbiAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xuICBwdWJsaWMgcmVmcmVzaFRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcbiAgICA/IFt0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4LCB0aGlzLmNvbmZpZy5vcHRpb25zLnJlZnJlc2hUb2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcbiAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMucmVmcmVzaFRva2VuTmFtZTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLCBwcml2YXRlIHRva2VuUmVmcmVzaFNlcnZpY2U6IFRva2VuUmVmcmVzaFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGFzeW5jIGdldFJlZnJlc2hUb2tlbigpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zdG9yYWdlLmdldCh0aGlzLnJlZnJlc2hUb2tlbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFRva2VuKCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMudG9rZW5OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQYXlsb2FkKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgaWYgKHRva2VuICYmIHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRUb2tlbihyZXNwb25zZTogc3RyaW5nIHwgb2JqZWN0KTpQcm9taXNlPFRva2Vucz4ge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIC8vIGNvbnNvbGUud2FybignQ2FuXFwndCBzZXQgdG9rZW4gd2l0aG91dCBwYXNzaW5nIGEgdmFsdWUnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB0b2tlbnM6IFRva2VucztcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xuICAgICAgdG9rZW5zID0ge2FjY2Vzc1Rva2VuOiByZXNwb25zZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzb2x2ZVRva2VuKHJlc3BvbnNlLCB0aGlzLmNvbmZpZy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW5zLmFjY2Vzc1Rva2VuKSB7XG4gICAgICBjb25zdCBleHBEYXRlID0gYXdhaXQgdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbnMuYWNjZXNzVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnRva2VuTmFtZSwgdG9rZW5zLmFjY2Vzc1Rva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xuICAgIH1cblxuICAgIGlmICh0b2tlbnMucmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBleHBEYXRlID0gYXdhaXQgdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbnMucmVmcmVzaFRva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5zZXQodGhpcy5yZWZyZXNoVG9rZW5OYW1lLCB0b2tlbnMucmVmcmVzaFRva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xuICAgIH1cblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlVG9rZW4oKSB7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGVkKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgLy8gYSB0b2tlbiBpcyBwcmVzZW50XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4odG9rZW4pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLmdldFJlZnJlc2hUb2tlbigpO1xuICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4ocmVmcmVzaFRva2VuKSkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy50b2tlblJlZnJlc2hTZXJ2aWNlLnJlcXVlc3RUb2tlblJlZnJlc2gocmVmcmVzaFRva2VuKS50b1Byb21pc2UoKTtcbiAgICAgICAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0aGlzLnNldFRva2VuKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHJldHVybiB0b2tlbnMgJiYgdGhpcy5pc1ZhbGlkVG9rZW4odG9rZW5zLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy5yZWZyZXNoVG9rZW5OYW1lKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNWYWxpZFRva2VuKHRva2VuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyB0b2tlbiB3aXRoIGEgdmFsaWQgSldUIGZvcm1hdCBYWFguWVlZLlpaWlxuICAgIGlmICh0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xuICAgICAgLy8gY291bGQgYmUgYSB2YWxpZCBKV1Qgb3IgYW4gYWNjZXNzIHRva2VuIHdpdGggdGhlIHNhbWUgZm9ybWF0XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICAgICAgY29uc3QgZXhwID0gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSkuZXhwO1xuICAgICAgICAvLyBqd3Qgd2l0aCBhbiBvcHRpb25hbCBleHBpcmF0aW9uIGNsYWltc1xuICAgICAgICBpZiAoZXhwKSB7XG4gICAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApID49IGV4cDtcbiAgICAgICAgICByZXR1cm4gIWlzRXhwaXJlZDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBwYXNzOiBOb24tSldUIHRva2VuIHRoYXQgbG9va3MgbGlrZSBKV1RcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHBhc3M6IEFsbCBvdGhlciB0b2tlbnNcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbj86IHN0cmluZykge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRva2VuID0gYXdhaXQgdGhpcy5nZXRUb2tlbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCB0aGlzLmdldFBheWxvYWQodG9rZW4pO1xuICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXhwICYmIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA8IHBheWxvYWQuZXhwKSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgICBkYXRlLnNldFVUQ1NlY29uZHMocGF5bG9hZC5leHApO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShhc3luYyAob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS51cGRhdGVTdG9yYWdlVHlwZSh0eXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksIGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpLmpvaW4oJycpKTtcbiAgfVxufVxuIl19