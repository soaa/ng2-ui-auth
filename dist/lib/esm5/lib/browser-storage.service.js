/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { StorageService } from './storage-service';
import { StorageType } from './storage-type.enum';
import { ConfigService } from './config.service';
var BrowserStorageService = /** @class */ (function (_super) {
    tslib_1.__extends(BrowserStorageService, _super);
    function BrowserStorageService(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.store = {};
        _this.storageType = StorageType.MEMORY;
        if (!_this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
        return _this;
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.updateStorageType = /**
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        /** @type {?} */
        var isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    };
    /**
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        return [2 /*return*/, Promise.resolve(this.getCookie(key))];
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        return [2 /*return*/, Promise.resolve(window[this.storageType].getItem(key))];
                    case StorageType.MEMORY:
                        return [2 /*return*/, Promise.resolve(this.store[key])];
                    case StorageType.NONE:
                    default:
                        return [2 /*return*/, Promise.resolve(null)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    BrowserStorageService.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    function (key, value, date) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        this.setCookie(key, value, this.storageType === StorageType.COOKIE ? date : '');
                        break;
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        window[this.storageType].setItem(key, value);
                        break;
                    case StorageType.MEMORY:
                        this.store[key] = value;
                        break;
                    case StorageType.NONE:
                    default:
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.remove = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (this.storageType) {
                    case StorageType.COOKIE:
                    case StorageType.SESSION_COOKIE:
                        this.removeCookie(key);
                        break;
                    case StorageType.LOCAL_STORAGE:
                    case StorageType.SESSION_STORAGE:
                        window[this.storageType].removeItem(key);
                        break;
                    case StorageType.MEMORY:
                        delete this.store[key];
                        break;
                    case StorageType.NONE:
                    default:
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.checkIsStorageAvailable = /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        switch (storageType) {
            case StorageType.COOKIE:
            case StorageType.SESSION_COOKIE:
                return this.isCookieStorageAvailable();
            case StorageType.LOCAL_STORAGE:
            case StorageType.SESSION_STORAGE:
                return this.isWindowStorageAvailable(storageType);
            case StorageType.NONE:
            case StorageType.MEMORY:
                return true;
            default:
                return false;
        }
    };
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    BrowserStorageService.prototype.isWindowStorageAvailable = /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    function (storageType) {
        try {
            /** @type {?} */
            var supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                /** @type {?} */
                var key = Math.random()
                    .toString(36)
                    .substring(7);
                window[storageType].setItem(key, '');
                window[storageType].removeItem(key);
            }
            return supported;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * @private
     * @return {?}
     */
    BrowserStorageService.prototype.isCookieStorageAvailable = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            /** @type {?} */
            var supported = document && 'cookie' in document;
            if (supported) {
                /** @type {?} */
                var key = Math.random()
                    .toString(36)
                    .substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                /** @type {?} */
                var value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    };
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    BrowserStorageService.prototype.setCookie = /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    function (key, value, expires, path) {
        if (expires === void 0) { expires = ''; }
        if (path === void 0) { path = '/'; }
        document.cookie = key + "=" + value + (expires ? "; expires=" + expires : '') + "; path=" + path;
    };
    /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    BrowserStorageService.prototype.removeCookie = /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    function (key, path) {
        if (path === void 0) { path = '/'; }
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    };
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    BrowserStorageService.prototype.getCookie = /**
     * @private
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return document.cookie.replace(new RegExp("(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"), '$1');
    };
    BrowserStorageService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    BrowserStorageService.ctorParameters = function () { return [
        { type: ConfigService }
    ]; };
    return BrowserStorageService;
}(StorageService));
export { BrowserStorageService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.store;
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.storageType;
    /**
     * @type {?}
     * @private
     */
    BrowserStorageService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci1zdG9yYWdlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac29hYS9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQ7SUFDMkMsaURBQWM7SUFJdkQsK0JBQW9CLE1BQXFCO1FBQXpDLFlBQ0UsaUJBQU8sU0FJUjtRQUxtQixZQUFNLEdBQU4sTUFBTSxDQUFlO1FBSGpDLFdBQUssR0FBOEIsRUFBRSxDQUFDO1FBQ3RDLGlCQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUl2QyxJQUFJLENBQUMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2pFOztJQUNILENBQUM7Ozs7O0lBRU0saURBQWlCOzs7O0lBQXhCLFVBQXlCLFdBQXdCOztZQUN6QyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDO1FBQ3BFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUN2QixPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7OztJQUVZLG1DQUFHOzs7O0lBQWhCLFVBQWlCLEdBQVc7OztnQkFDMUIsUUFBUSxJ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QUE4Qzs7Ozs7SUFDOUMsNENBQXlDOzs7OztJQUU3Qix1Q0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgZXh0ZW5kcyBTdG9yYWdlU2VydmljZSB7XG4gIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgcHJpdmF0ZSBzdG9yYWdlVHlwZSA9IFN0b3JhZ2VUeXBlLk1FTU9SWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKCF0aGlzLnVwZGF0ZVN0b3JhZ2VUeXBlKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlKSkge1xuICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcbiAgICBjb25zdCBpc1N0b3JhZ2VBdmFpbGFibGUgPSB0aGlzLmNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcbiAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkNPT0tJRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9DT09LSUU6XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5nZXRDb29raWUoa2V5KSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc3RvcmVba2V5XSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBTdG9yYWdlVHlwZS5DT09LSUUgPyBkYXRlIDogJycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk1FTU9SWTpcbiAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZS5TRVNTSU9OX1NUT1JBR0UgfCBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcbiAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcbiAgICB0aGlzLnNldENvb2tpZShrZXksICcnLCBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29va2llKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxcXHMqKSR7a2V5fVxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJGApLCAnJDEnKTtcbiAgfVxufVxuIl19