/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { OauthService } from './oauth.service';
import { SharedService } from './shared.service';
var AuthService = /** @class */ (function () {
    function AuthService(shared, local, oauth) {
        this.shared = shared;
        this.local = local;
        this.oauth = oauth;
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    AuthService.prototype.login = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.local.login(user, url);
    };
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    AuthService.prototype.signup = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.local.signup(user, url);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.logout = /**
     * @return {?}
     */
    function () {
        return this.shared.logout();
    };
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    AuthService.prototype.authenticate = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    AuthService.prototype.link = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        return this.oauth.authenticate(name, userData);
    };
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    AuthService.prototype.unlink = /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    function (provider, url) {
        return this.oauth.unlink(provider, url);
    };
    /**
     * @return {?}
     */
    AuthService.prototype.isAuthenticated = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.isAuthenticated()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getToken = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.getToken()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @param {?} token
     * @return {?}
     */
    AuthService.prototype.setToken = /**
     * @param {?} token
     * @return {?}
     */
    function (token) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.setToken(token)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.removeToken = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.removeToken()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getPayload = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.getPayload()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    AuthService.prototype.setStorageType = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.setStorageType(type)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    AuthService.prototype.getExpirationDate = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.shared.getExpirationDate()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuthService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AuthService.ctorParameters = function () { return [
        { type: SharedService },
        { type: LocalService },
        { type: OauthService }
    ]; };
    return AuthService;
}());
export { AuthService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.shared;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.local;
    /**
     * @type {?}
     * @private
     */
    AuthService.prototype.oauth;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvIiwic291cmNlcyI6WyJsaWIvYXV0aC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUdqRDtJQUVFLHFCQUFvQixNQUFxQixFQUFVLEtBQW1CLEVBQVUsS0FBbUI7UUFBL0UsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO0lBQUcsQ0FBQzs7Ozs7OztJQUVoRywyQkFBSzs7Ozs7O0lBQVosVUFBOEMsSUFBcUIsRUFBRSxHQUFZO1FBQy9FLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7Ozs7Ozs7SUFFTSw0QkFBTTs7Ozs7O0lBQWIsVUFBdUIsSUFBcUIsRUFBRSxHQUFZO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUksSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Ozs7SUFFTSw0QkFBTTs7O0lBQWI7UUFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQzs7Ozs7OztJQUVNLGtDQUFZOzs7Ozs7SUFBbkIsVUFBcUQsSUFBWSxFQUFFLFFBQWM7UUFDL0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7OztJQUVNLDBCQUFJOzs7Ozs7SUFBWCxVQUE2QyxJQUFZLEVBQUUsUUFBYztRQUN2RSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDOzs7Ozs7O0lBRU0sNEJBQU07Ozs7OztJQUFiLFVBQXVCLFFBQWdCLEVBQUUsR0FBWTtRQUNuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBRVkscUNBQWU7OztJQUE1Qjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxFQUFBOzRCQUExQyxzQkFBTyxTQUFtQyxFQUFDOzs7O0tBQzVDOzs7O0lBRVksOEJBQVE7OztJQUFyQjs7Ozs0QkFDUyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFBOzRCQUFuQyxzQkFBTyxTQUE0QixFQUFDOzs7O0tBQ3JDOzs7OztJQUVZLDhCQUFROzs7O0lBQXJCLFVBQXNCLEtBQXNCOzs7OzRCQUMxQyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQTs7d0JBQWpDLFNBQWlDLENBQUM7Ozs7O0tBQ25DOzs7O0lBRVksaUNBQVc7OztJQUF4Qjs7Ozs0QkFDRSxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFBOzt3QkFBL0IsU0FBK0IsQ0FBQzs7Ozs7S0FDakM7Ozs7SUFFWSxnQ0FBVTs7O0lBQXZCOzs7OzRCQUNTLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEVBQUE7NEJBQXJDLHNCQUFPLFNBQThCLEVBQUM7Ozs7S0FDdkM7Ozs7O0lBRVksb0NBQWM7Ozs7SUFBM0IsVUFBNEIsSUFBaUI7Ozs7NEJBQ3BDLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFBOzRCQUE3QyxzQkFBTyxTQUFzQyxFQUFDOzs7O0tBQy9DOzs7O0lBRVksdUNBQWlCOzs7SUFBOUI7Ozs7NEJBQ1MscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFBOzRCQUE1QyxzQkFBTyxTQUFxQyxFQUFDOzs7O0tBQzlDOztnQkF0REYsVUFBVTs7OztnQkFIRixhQUFhO2dCQUZiLFlBQVk7Z0JBQ1osWUFBWTs7SUEyRHJCLGtCQUFDO0NBQUEsQUF2REQsSUF1REM7U0F0RFksV0FBVzs7Ozs7O0lBQ1YsNkJBQTZCOzs7OztJQUFFLDRCQUEyQjs7Ozs7SUFBRSw0QkFBMkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge31cblxuICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQubG9nb3V0KCk7XG4gIH1cblxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xuICB9XG5cbiAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLnVubGluazxUPihwcm92aWRlciwgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFRva2VuKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNoYXJlZC5zZXRUb2tlbih0b2tlbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlVG9rZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQYXlsb2FkKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5zZXRTdG9yYWdlVHlwZSh0eXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFeHBpcmF0aW9uRGF0ZSgpOiBQcm9taXNlPERhdGUgfCBudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XG4gIH1cbn1cbiJdfQ==