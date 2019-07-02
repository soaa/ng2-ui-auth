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
var SharedService = /** @class */ (function () {
    function SharedService(storage, config, tokenRefreshService) {
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
    SharedService.prototype.getRefreshToken = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.refreshTokenName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    SharedService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.get(this.tokenName)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.getPayload = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var base64Url, base64;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (token && token.split('.').length === 3) {
                            try {
                                base64Url = token.split('.')[1];
                                base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                                return [2 /*return*/, JSON.parse(this.b64DecodeUnicode(base64))];
                            }
                            catch (e) {
                                return [2 /*return*/, undefined];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?} response
     * @return {?}
     */
    SharedService.prototype.setToken = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var tokens, expDate, expDate;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!response) {
                            // console.warn('Can\'t set token without passing a value');
                            return [2 /*return*/, null];
                        }
                        if (typeof response === 'string') {
                            tokens = { accessToken: response };
                        }
                        else {
                            tokens = this.config.options.resolveToken(response, this.config.options);
                        }
                        if (!tokens.accessToken) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getExpirationDate(tokens.accessToken)];
                    case 1:
                        expDate = _a.sent();
                        return [4 /*yield*/, this.storage.set(this.tokenName, tokens.accessToken, expDate ? expDate.toUTCString() : '')];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!tokens.refreshToken) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.getExpirationDate(tokens.refreshToken)];
                    case 4:
                        expDate = _a.sent();
                        return [4 /*yield*/, this.storage.set(this.refreshTokenName, tokens.refreshToken, expDate ? expDate.toUTCString() : '')];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, tokens];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    SharedService.prototype.removeToken = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.remove(this.tokenName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.isAuthenticated = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var refreshToken, response, tokens;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!token) return [3 /*break*/, 10];
                        if (this.isValidToken(token)) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, this.getRefreshToken()];
                    case 3:
                        refreshToken = _a.sent();
                        if (!refreshToken) return [3 /*break*/, 8];
                        if (!this.isValidToken(refreshToken)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.tokenRefreshService.requestTokenRefresh(refreshToken).toPromise()];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, this.setToken(response)];
                    case 5:
                        tokens = _a.sent();
                        return [2 /*return*/, tokens && this.isValidToken(tokens.accessToken)];
                    case 6: return [4 /*yield*/, this.storage.remove(this.refreshTokenName)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.storage.remove(this.tokenName)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2 /*return*/, false];
                }
            });
        });
    };
    /**
     * @param {?} token
     * @return {?}
     */
    SharedService.prototype.isValidToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        // token with a valid JWT format XXX.YYY.ZZZ
        if (token.split('.').length === 3) {
            // could be a valid JWT or an access token with the same format
            try {
                /** @type {?} */
                var base64Url = token.split('.')[1];
                /** @type {?} */
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                /** @type {?} */
                var exp = JSON.parse(this.b64DecodeUnicode(base64)).exp;
                // jwt with an optional expiration claims
                if (exp) {
                    /** @type {?} */
                    var isExpired = Math.round(new Date().getTime() / 1000) >= exp;
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
    };
    /**
     * @param {?=} token
     * @return {?}
     */
    SharedService.prototype.getExpirationDate = /**
     * @param {?=} token
     * @return {?}
     */
    function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var payload, date;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!token) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getToken()];
                    case 1:
                        token = _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.getPayload(token)];
                    case 3:
                        payload = _a.sent();
                        if (payload && payload.exp && Math.round(new Date().getTime() / 1000) < payload.exp) {
                            date = new Date(0);
                            date.setUTCSeconds(payload.exp);
                            return [2 /*return*/, date];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    SharedService.prototype.logout = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return Observable.create(function (observer) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.storage.remove(this.tokenName)];
                    case 1:
                        _a.sent();
                        observer.next();
                        observer.complete();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    SharedService.prototype.setStorageType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return this.storage.updateStorageType(type);
    };
    /**
     * @private
     * @param {?} str
     * @return {?}
     */
    SharedService.prototype.b64DecodeUnicode = /**
     * @private
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
    };
    SharedService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SharedService.ctorParameters = function () { return [
        { type: StorageService },
        { type: ConfigService },
        { type: TokenRefreshService }
    ]; };
    return SharedService;
}());
export { SharedService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9zaGFyZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFjLFVBQVUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRWpELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBRTVEO0lBVUUsdUJBQW9CLE9BQXVCLEVBQVUsTUFBcUIsRUFBVSxtQkFBd0M7UUFBeEcsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQVJySCxjQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNoRCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUMzRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQzNCLHFCQUFnQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDdkQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENB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QUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBckQsQ0FBcUQsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RJLENBQUM7O2dCQWpKRixVQUFVOzs7O2dCQUxGLGNBQWM7Z0JBQ2QsYUFBYTtnQkFFZCxtQkFBbUI7O0lBb0ozQixvQkFBQztDQUFBLEFBbEpELElBa0pDO1NBakpZLGFBQWE7OztJQUN4QixrQ0FFa0M7O0lBQ2xDLHlDQUV5Qzs7Ozs7SUFHN0IsZ0NBQStCOzs7OztJQUFFLCtCQUE2Qjs7Ozs7SUFBRSw0Q0FBZ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xuaW1wb3J0IHsgU3Vic2NyaWJlciwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Utc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQge1Rva2Vuc30gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQge1Rva2VuUmVmcmVzaFNlcnZpY2V9IGZyb20gJy4vdG9rZW4ucmVmcmVzaC5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNoYXJlZFNlcnZpY2Uge1xuICBwdWJsaWMgdG9rZW5OYW1lID0gdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeFxuICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lXS5qb2luKHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpXG4gICAgOiB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZTtcbiAgcHVibGljIHJlZnJlc2hUb2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XG4gICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy5yZWZyZXNoVG9rZW5OYW1lXS5qb2luKHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5TZXBhcmF0b3IpXG4gICAgOiB0aGlzLmNvbmZpZy5vcHRpb25zLnJlZnJlc2hUb2tlbk5hbWU7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSwgcHJpdmF0ZSB0b2tlblJlZnJlc2hTZXJ2aWNlOiBUb2tlblJlZnJlc2hTZXJ2aWNlKSB7fVxuXG4gIHB1YmxpYyBhc3luYyBnZXRSZWZyZXNoVG9rZW4oKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQodGhpcy5yZWZyZXNoVG9rZW5OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRUb2tlbigpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zdG9yYWdlLmdldCh0aGlzLnRva2VuTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bG9hZCh0b2tlbj86IHN0cmluZykge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRva2VuID0gYXdhaXQgdGhpcy5nZXRUb2tlbigpO1xuICAgIH1cblxuICAgIGlmICh0b2tlbiAmJiB0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0VG9rZW4ocmVzcG9uc2U6IHN0cmluZyB8IG9iamVjdCk6UHJvbWlzZTxUb2tlbnM+IHtcbiAgICBpZiAoIXJlc3BvbnNlKSB7XG4gICAgICAvLyBjb25zb2xlLndhcm4oJ0NhblxcJ3Qgc2V0IHRva2VuIHdpdGhvdXQgcGFzc2luZyBhIHZhbHVlJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgdG9rZW5zOiBUb2tlbnM7XG4gICAgaWYgKHR5cGVvZiByZXNwb25zZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRva2VucyA9IHthY2Nlc3NUb2tlbjogcmVzcG9uc2V9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0b2tlbnMgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnJlc29sdmVUb2tlbihyZXNwb25zZSwgdGhpcy5jb25maWcub3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKHRva2Vucy5hY2Nlc3NUb2tlbikge1xuICAgICAgY29uc3QgZXhwRGF0ZSA9IGF3YWl0IHRoaXMuZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW5zLmFjY2Vzc1Rva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5zZXQodGhpcy50b2tlbk5hbWUsIHRva2Vucy5hY2Nlc3NUb2tlbiwgZXhwRGF0ZSA/IGV4cERhdGUudG9VVENTdHJpbmcoKSA6ICcnKTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW5zLnJlZnJlc2hUb2tlbikge1xuICAgICAgY29uc3QgZXhwRGF0ZSA9IGF3YWl0IHRoaXMuZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW5zLnJlZnJlc2hUb2tlbik7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMucmVmcmVzaFRva2VuTmFtZSwgdG9rZW5zLnJlZnJlc2hUb2tlbiwgZXhwRGF0ZSA/IGV4cERhdGUudG9VVENTdHJpbmcoKSA6ICcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9rZW5zO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZVRva2VuKCkge1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGlzQXV0aGVudGljYXRlZCh0b2tlbj86IHN0cmluZykge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRva2VuID0gYXdhaXQgdGhpcy5nZXRUb2tlbigpO1xuICAgIH1cblxuICAgIC8vIGEgdG9rZW4gaXMgcHJlc2VudFxuICAgIGlmICh0b2tlbikge1xuICAgICAgaWYgKHRoaXMuaXNWYWxpZFRva2VuKHRva2VuKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gYXdhaXQgdGhpcy5nZXRSZWZyZXNoVG9rZW4oKTtcbiAgICAgIGlmIChyZWZyZXNoVG9rZW4pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRva2VuKHJlZnJlc2hUb2tlbikpIHtcbiAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMudG9rZW5SZWZyZXNoU2VydmljZS5yZXF1ZXN0VG9rZW5SZWZyZXNoKHJlZnJlc2hUb2tlbikudG9Qcm9taXNlKCk7XG4gICAgICAgICAgY29uc3QgdG9rZW5zID0gYXdhaXQgdGhpcy5zZXRUb2tlbihyZXNwb25zZSk7XG5cbiAgICAgICAgICByZXR1cm4gdG9rZW5zICYmIHRoaXMuaXNWYWxpZFRva2VuKHRva2Vucy5hY2Nlc3NUb2tlbik7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMucmVmcmVzaFRva2VuTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzVmFsaWRUb2tlbih0b2tlbjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgLy8gdG9rZW4gd2l0aCBhIHZhbGlkIEpXVCBmb3JtYXQgWFhYLllZWS5aWlpcbiAgICBpZiAodG9rZW4uc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcbiAgICAgIC8vIGNvdWxkIGJlIGEgdmFsaWQgSldUIG9yIGFuIGFjY2VzcyB0b2tlbiB3aXRoIHRoZSBzYW1lIGZvcm1hdFxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYmFzZTY0VXJsID0gdG9rZW4uc3BsaXQoJy4nKVsxXTtcbiAgICAgICAgY29uc3QgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XG4gICAgICAgIGNvbnN0IGV4cCA9IEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpLmV4cDtcbiAgICAgICAgLy8gand0IHdpdGggYW4gb3B0aW9uYWwgZXhwaXJhdGlvbiBjbGFpbXNcbiAgICAgICAgaWYgKGV4cCkge1xuICAgICAgICAgIGNvbnN0IGlzRXhwaXJlZCA9IE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA+PSBleHA7XG4gICAgICAgICAgcmV0dXJuICFpc0V4cGlyZWQ7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gcGFzczogTm9uLUpXVCB0b2tlbiB0aGF0IGxvb2tzIGxpa2UgSldUXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBwYXNzOiBBbGwgb3RoZXIgdG9rZW5zXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW4/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0gYXdhaXQgdGhpcy5nZXRQYXlsb2FkKHRva2VuKTtcbiAgICBpZiAocGF5bG9hZCAmJiBwYXlsb2FkLmV4cCAmJiBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPCBwYXlsb2FkLmV4cCkge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgICAgZGF0ZS5zZXRVVENTZWNvbmRzKHBheWxvYWQuZXhwKTtcbiAgICAgIHJldHVybiBkYXRlO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZS5jcmVhdGUoYXN5bmMgKG9ic2VydmVyOiBTdWJzY3JpYmVyPGFueT4pID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy50b2tlbk5hbWUpO1xuICAgICAgb2JzZXJ2ZXIubmV4dCgpO1xuICAgICAgb2JzZXJ2ZXIuY29tcGxldGUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSkge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UudXBkYXRlU3RvcmFnZVR5cGUodHlwZSk7XG4gIH1cblxuICBwcml2YXRlIGI2NERlY29kZVVuaWNvZGUoc3RyKSB7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChBcnJheS5wcm90b3R5cGUubWFwLmNhbGwoYXRvYihzdHIpLCBjID0+ICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpKS5qb2luKCcnKSk7XG4gIH1cbn1cbiJdfQ==