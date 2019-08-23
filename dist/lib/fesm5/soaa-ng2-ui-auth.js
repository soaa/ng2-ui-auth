import { __spread, __assign, __awaiter, __generator, __extends } from 'tslib';
import { Inject, Injectable, InjectionToken, Injector, NgModule } from '@angular/core';
import { EMPTY, Observable, from, empty, fromEvent, interval, merge, of, throwError } from 'rxjs';
import { switchMap, delay, map, take, tap, mapTo } from 'rxjs/operators';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Created by Ron on 17/12/2015.
 * @param {?} baseUrl
 * @param {?} url
 * @return {?}
 */
function joinUrl(baseUrl, url) {
    if (/^(?:[a-z]+:)?\/\//i.test(url)) {
        return url;
    }
    /** @type {?} */
    var joined = [baseUrl, url].join('/');
    return joined
        .replace(/[\/]+/g, '/')
        .replace(/\/\?/g, '?')
        .replace(/\/\#/g, '#')
        .replace(/\:\//g, '://');
}
/**
 * @param {?} obj
 * @return {?}
 */
function buildQueryString(obj) {
    return Object.keys(obj)
        .map(function (key) { return (!!obj[key] ? encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]) : key); })
        .join('&');
}
/**
 * @param {?=} w
 * @return {?}
 */
function getWindowOrigin(w) {
    if (!w && typeof window !== 'undefined') {
        w = window;
    }
    try {
        if (!w || !w.location) {
            return null;
        }
        if (!w.location.origin) {
            return w.location.protocol + "//" + w.location.hostname + (w.location.port ? ':' + w.location.port : '');
        }
        return w.location.origin;
    }
    catch (error) {
        return null;
        // ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
        // error instanceof DOMException && error.name === 'SecurityError'
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: getWindowOrigin() + "/",
        authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 580, height: 400 }
    },
    google: {
        name: 'google',
        url: '/auth/google',
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
        additionalUrlParams: {
            display: 'popup',
            prompt: undefined,
            login_hint: undefined,
            access_type: undefined,
            include_granted_scopes: undefined,
            'openid.realm': undefined,
            hd: undefined
        },
        scope: ['openid', 'profile', 'email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 452, height: 633 },
        state: function () {
            return encodeURIComponent(Math.random()
                .toString(36)
                .substr(2));
        }
    },
    github: {
        name: 'github',
        url: '/auth/github',
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        scope: ['user:email'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 1020, height: 618 }
    },
    instagram: {
        name: 'instagram',
        url: '/auth/instagram',
        authorizationEndpoint: 'https://api.instagram.com/oauth/authorize',
        scope: ['basic'],
        scopeDelimiter: '+',
        oauthType: '2.0'
    },
    linkedin: {
        name: 'linkedin',
        url: '/auth/linkedin',
        authorizationEndpoint: 'https://www.linkedin.com/uas/oauth2/authorization',
        scope: ['r_emailaddress'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 527, height: 582 },
        state: 'STATE'
    },
    twitter: {
        name: 'twitter',
        url: '/auth/twitter',
        authorizationEndpoint: 'https://api.twitter.com/oauth/authenticate',
        oauthType: '1.0',
        popupOptions: { width: 495, height: 645 }
    },
    twitch: {
        name: 'twitch',
        url: '/auth/twitch',
        authorizationEndpoint: 'https://api.twitch.tv/kraken/oauth2/authorize',
        scope: ['user_read'],
        scopeDelimiter: ' ',
        additionalUrlParams: {
            display: 'popup'
        },
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    live: {
        name: 'live',
        url: '/auth/live',
        authorizationEndpoint: 'https://login.live.com/oauth20_authorize.srf',
        additionalUrlParams: {
            display: 'popup'
        },
        scope: ['wl.emails'],
        scopeDelimiter: ' ',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 560 }
    },
    yahoo: {
        name: 'yahoo',
        url: '/auth/yahoo',
        authorizationEndpoint: 'https://api.login.yahoo.com/oauth2/request_auth',
        scope: [],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 559, height: 519 }
    },
    bitbucket: {
        name: 'bitbucket',
        url: '/auth/bitbucket',
        authorizationEndpoint: 'https://bitbucket.org/site/oauth2/authorize',
        redirectUri: getWindowOrigin() + "/",
        scope: ['email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 1028, height: 529 }
    },
    spotify: {
        name: 'spotify',
        url: '/auth/spotify',
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        scope: ['', 'user-read-email'],
        scopeDelimiter: ',',
        oauthType: '2.0',
        popupOptions: { width: 500, height: 530 },
        state: function () {
            return encodeURIComponent(Math.random()
                .toString(36)
                .substr(2));
        }
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var StorageType = {
    NONE: 'none',
    MEMORY: 'memory',
    LOCAL_STORAGE: 'localStorage',
    SESSION_STORAGE: 'sessionStorage',
    COOKIE: 'cookie',
    SESSION_COOKIE: 'sessionCookie',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var CONFIG_OPTIONS = new InjectionToken('config.options');
var ConfigService = /** @class */ (function () {
    function ConfigService(options) {
        this.options = {
            withCredentials: false,
            tokenRoot: null,
            baseUrl: '/',
            loginUrl: '/auth/login',
            signupUrl: '/auth/signup',
            unlinkUrl: '/auth/unlink/',
            tokenName: 'token',
            refreshTokenName: 'refresh_token',
            tokenSeparator: '_',
            tokenPrefix: 'ng2-ui-auth',
            authHeader: 'Authorization',
            authToken: 'Bearer',
            storageType: StorageType.LOCAL_STORAGE,
            cordova: undefined,
            resolveToken: function (response, config) {
                /** @type {?} */
                var accessToken = response && (response.access_token || response.token || response.data);
                if (!accessToken) {
                    // console.warn('No token found');
                    return null;
                }
                if (typeof accessToken === 'string') {
                    // tslint:disable-next-line:no-shadowed-variable
                    /** @type {?} */
                    var refreshToken_1 = response[config.refreshTokenName];
                    return (/** @type {?} */ ({ accessToken: accessToken, refreshToken: refreshToken_1 }));
                }
                if (typeof accessToken !== 'object') {
                    // console.warn('No token found');
                    return null;
                }
                /** @type {?} */
                var tokenRootData = config.tokenRoot &&
                    config.tokenRoot.split('.').reduce(function (o, x) {
                        return o[x];
                    }, accessToken);
                /** @type {?} */
                var token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                /** @type {?} */
                var refreshToken = tokenRootData ? tokenRootData[config.refreshTokenName] : accessToken[config.refreshTokenName];
                if (token) {
                    return (/** @type {?} */ ({ accessToken: token, refreshToken: refreshToken }));
                }
                // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                // console.warn('Expecting a token named "' + tokenPath);
                return null;
            },
            providers: {}
        };
        this.options = __assign({}, this.options, options);
        this.mergeWithDefaultProviders();
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    ConfigService.prototype.updateProviders = /**
     * @param {?} providers
     * @return {?}
     */
    function (providers) {
        this.options.providers = __assign({}, (this.options.providers || {}), providers);
        this.mergeWithDefaultProviders();
    };
    /**
     * @return {?}
     */
    ConfigService.prototype.mergeWithDefaultProviders = /**
     * @return {?}
     */
    function () {
        var _this = this;
        Object.keys(this.options.providers).forEach(function (key) {
            if (key in defaultProviders) {
                _this.options.providers[key] = __assign({}, defaultProviders[key], _this.options.providers[key]);
            }
        });
    };
    ConfigService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ConfigService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
    ]; };
    return ConfigService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
StorageService = /** @class */ (function () {
    function StorageService() {
    }
    return StorageService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BrowserStorageService = /** @class */ (function (_super) {
    __extends(BrowserStorageService, _super);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TokenRefreshService = /** @class */ (function () {
    function TokenRefreshService() {
    }
    /**
     * @template T
     * @param {?} refreshToken
     * @return {?}
     */
    TokenRefreshService.prototype.requestTokenRefresh = /**
     * @template T
     * @param {?} refreshToken
     * @return {?}
     */
    function (refreshToken) {
        return EMPTY;
    };
    TokenRefreshService.decorators = [
        { type: Injectable }
    ];
    return TokenRefreshService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var base64Url, base64;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var tokens, expDate, expDate;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, response, tokens;
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            var payload, date;
            return __generator(this, function (_a) {
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
        return Observable.create(function (observer) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var JwtInterceptor = /** @class */ (function () {
    function JwtInterceptor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    JwtInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _a = this.config.options, authHeader = _a.authHeader, authToken = _a.authToken;
        return from(Promise.all([this.shared.getToken(), this.shared.isAuthenticated()]))
            .pipe(switchMap(function (auth) {
            var _a;
            /** @type {?} */
            var token = auth[0];
            /** @type {?} */
            var isAuthenticated = auth[1];
            /** @type {?} */
            var newReq = isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: (_a = {}, _a[authHeader] = authToken + " " + token, _a) }) : req;
            return next.handle(newReq);
        }));
    };
    JwtInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    JwtInterceptor.ctorParameters = function () { return [
        { type: SharedService },
        { type: ConfigService }
    ]; };
    return JwtInterceptor;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PopupService = /** @class */ (function () {
    function PopupService() {
    }
    /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    PopupService.prototype.open = /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    function (url, options, cordova) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        /** @type {?} */
        var stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        var windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        var popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    };
    /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.waitForClose = /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, cordova, redirectUri) {
        if (cordova === void 0) { cordova = this.isCordovaApp(); }
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    };
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.eventListener = /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(function () {
            throw new Error('Authentication Canceled');
        })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap(function (event) {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            /** @type {?} */
            var parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                var queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hash = _this.parseQueryString(hashParams);
                /** @type {?} */
                var qs = _this.parseQueryString(queryParams);
                /** @type {?} */
                var allParams = __assign({}, qs, hash);
                popupWindow.close();
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    PopupService.prototype.pollPopup = /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    function (popupWindow, redirectUri) {
        var _this = this;
        if (redirectUri === void 0) { redirectUri = getWindowOrigin(); }
        return interval(50).pipe(switchMap(function () {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            var popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                /** @type {?} */
                var queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                var hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                /** @type {?} */
                var hash = _this.parseQueryString(hashParams);
                /** @type {?} */
                var qs = _this.parseQueryString(queryParams);
                popupWindow.close();
                /** @type {?} */
                var allParams = __assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    };
    /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    PopupService.prototype.prepareOptions = /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    function (options) {
        options = options || {};
        /** @type {?} */
        var width = options.width || 500;
        /** @type {?} */
        var height = options.height || 500;
        return __assign({ width: width,
            height: height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    };
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    PopupService.prototype.stringifyOptions = /**
     * @private
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return Object.keys(options)
            .map(function (key) { return (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]); })
            .join(',');
    };
    /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    PopupService.prototype.parseQueryString = /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    function (joinedKeyValue) {
        /** @type {?} */
        var key;
        /** @type {?} */
        var value;
        return joinedKeyValue.split('&').reduce(function (obj, keyValue) {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, (/** @type {?} */ ({})));
    };
    /**
     * @private
     * @return {?}
     */
    PopupService.prototype.isCordovaApp = /**
     * @private
     * @return {?}
     */
    function () {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    };
    PopupService.decorators = [
        { type: Injectable }
    ];
    return PopupService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Oauth1Service = /** @class */ (function () {
    function Oauth1Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    Oauth1Service.prototype.open = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, userData) {
        var _this = this;
        /** @type {?} */
        var serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
        return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(switchMap(function (popupWindow) {
            return _this.http.post(serverUrl, oauthOptions).pipe(tap(function (authorizationData) {
                return popupWindow
                    ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                    : undefined;
            }), switchMap(function (authorizationData) {
                return _this.popup
                    .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                    .pipe(map(function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }));
            }));
        }), switchMap(function (_a) {
            var authorizationData = _a.authorizationData, oauthData = _a.oauthData;
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    /**
     * @protected
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth1Service.prototype.exchangeForToken = /**
     * @protected
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, authorizationData, oauthData, userData) {
        /** @type {?} */
        var body = { oauthOptions: oauthOptions, authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, withCredentials = _a.withCredentials, baseUrl = _a.baseUrl;
        var _b = oauthOptions.method, method = _b === void 0 ? 'POST' : _b, url = oauthOptions.url;
        /** @type {?} */
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    Oauth1Service.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Oauth1Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    return Oauth1Service;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Oauth2Service = /** @class */ (function () {
    function Oauth2Service(http, popup, config) {
        this.http = http;
        this.popup = popup;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    Oauth2Service.prototype.open = /**
     * @template T
     * @param {?} oauthOptions
     * @param {?} userData
     * @return {?}
     */
    function (oauthOptions, userData) {
        var _this = this;
        /** @type {?} */
        var authorizationData = this.getAuthorizationData(oauthOptions);
        /** @type {?} */
        var url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap(function (window) {
            return window ? _this.popup.waitForClose(window, _this.config.options.cordova, oauthOptions.redirectUri) : empty();
        }), switchMap(function (oauthData) {
            // when no server URL provided, return popup params as-is.
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                return of(oauthData);
            }
            if (oauthData.state && oauthData.state !== authorizationData.state) {
                throw new Error('OAuth "state" mismatch');
            }
            return _this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    };
    /**
     * @protected
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    Oauth2Service.prototype.exchangeForToken = /**
     * @protected
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    function (options, authorizationData, oauthData, userData) {
        /** @type {?} */
        var body = { authorizationData: authorizationData, oauthData: oauthData, userData: userData };
        var _a = this.config.options, baseUrl = _a.baseUrl, withCredentials = _a.withCredentials;
        var url = options.url, _b = options.method, method = _b === void 0 ? 'POST' : _b;
        /** @type {?} */
        var exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body: body, withCredentials: withCredentials });
    };
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    Oauth2Service.prototype.getAuthorizationData = /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    function (options) {
        var _a = options.responseType, responseType = _a === void 0 ? 'code' : _a, clientId = options.clientId, _b = options.redirectUri, redirectUri = _b === void 0 ? getWindowOrigin() || '' : _b, _c = options.scopeDelimiter, scopeDelimiter = _c === void 0 ? ',' : _c, scope = options.scope, state = options.state, additionalUrlParams = options.additionalUrlParams;
        /** @type {?} */
        var resolvedState = typeof state === 'function' ? state() : state;
        return __spread([
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri]
        ], (state ? [['state', resolvedState]] : []), (scope ? [['scope', scope.join(scopeDelimiter)]] : []), (additionalUrlParams
            ? Object.keys(additionalUrlParams).map(function (key) {
                /** @type {?} */
                var value = ((/** @type {?} */ (additionalUrlParams)))[key];
                if (typeof value === 'string') {
                    return [key, value];
                }
                else if (typeof value === 'function') {
                    return [key, value()];
                }
                else if (value === null) {
                    return [key, ''];
                }
                return ['', ''];
            })
            : [])).filter(function (_) { return !!_[0]; })
            .reduce(function (acc, next) {
            var _a;
            return (__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
        }, (/** @type {?} */ ({})));
    };
    Oauth2Service.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    Oauth2Service.ctorParameters = function () { return [
        { type: HttpClient },
        { type: PopupService },
        { type: ConfigService }
    ]; };
    return Oauth2Service;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var OauthService = /** @class */ (function () {
    function OauthService(http, shared, config, popup) {
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
    OauthService.prototype.authenticate = /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    function (name, userData) {
        var _this = this;
        /** @type {?} */
        var provider = this.providerOf(name);
        return provider.open(this.config.options.providers[name], userData || {}).pipe(switchMap(function (response) {
            // this is for a scenario when someone wishes to opt out from
            // satellizer's magic by doing authorization code exchange and
            // saving a token manually.
            if (_this.config.options.providers[name].url) {
                return from(_this.shared.setToken(response)).pipe(mapTo(response));
            }
            return of(response);
        }));
    };
    /**
     * @protected
     * @param {?} name
     * @return {?}
     */
    OauthService.prototype.providerOf = /**
     * @protected
     * @param {?} name
     * @return {?}
     */
    function (name) {
        return this.config.options.providers[name].oauthType === '1.0'
            ? Injector.create({ providers: __spread(this.depProviders, [{ provide: Oauth1Service, deps: this.deps }]) }).get(Oauth1Service)
            : Injector.create({ providers: __spread(this.depProviders, [{ provide: Oauth2Service, deps: this.deps }]) }).get(Oauth2Service);
    };
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    OauthService.prototype.unlink = /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @param {?=} method
     * @return {?}
     */
    function (provider, url, method) {
        if (url === void 0) { url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl); }
        if (method === void 0) { method = 'POST'; }
        return this.http.request(method, url, { body: { provider: provider } });
    };
    OauthService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    OauthService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService },
        { type: PopupService }
    ]; };
    return OauthService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocalService = /** @class */ (function () {
    function LocalService(http, shared, config) {
        this.http = http;
        this.shared = shared;
        this.config = config;
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    LocalService.prototype.login = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        var _this = this;
        return this.http
            .post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap(function (data) { return _this.shared.setToken(data); }));
    };
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    LocalService.prototype.signup = /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    function (user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    };
    LocalService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    LocalService.ctorParameters = function () { return [
        { type: HttpClient },
        { type: SharedService },
        { type: ConfigService }
    ]; };
    return LocalService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Ng2UiAuthModule = /** @class */ (function () {
    function Ng2UiAuthModule() {
    }
    /**
     * @param {?=} configOptions
     * @param {?=} defaultJwtInterceptor
     * @return {?}
     */
    Ng2UiAuthModule.forRoot = /**
     * @param {?=} configOptions
     * @param {?=} defaultJwtInterceptor
     * @return {?}
     */
    function (configOptions, defaultJwtInterceptor) {
        if (defaultJwtInterceptor === void 0) { defaultJwtInterceptor = true; }
        return {
            ngModule: Ng2UiAuthModule,
            providers: __spread((configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []), [
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] }
            ], (defaultJwtInterceptor
                ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                : []))
        };
    };
    Ng2UiAuthModule.decorators = [
        { type: NgModule, args: [{
                    imports: [HttpClientModule],
                    declarations: [],
                    exports: []
                },] }
    ];
    return Ng2UiAuthModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ng2UiAuthModule, LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, TokenRefreshService, JwtInterceptor, CONFIG_OPTIONS, StorageType };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29hYS1uZzItdWktYXV0aC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3V0aWxzLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvY29uZmlnLXByb3ZpZGVycy50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3N0b3JhZ2UtdHlwZS5lbnVtLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9zdG9yYWdlLXNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3Rva2VuLnJlZnJlc2guc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3NoYXJlZC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvaW50ZXJjZXB0b3Iuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3BvcHVwLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9vYXV0aDEuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL29hdXRoMi5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvb2F1dGguc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL2xvY2FsLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9hdXRoLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9uZzItdWktYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gam9pblVybChiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XG4gIGlmICgvXig/OlthLXpdKzopP1xcL1xcLy9pLnRlc3QodXJsKSkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBjb25zdCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuIGpvaW5lZFxuICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxuICAgIC5yZXBsYWNlKC9cXC9cXD8vZywgJz8nKVxuICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxuICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIC5tYXAoa2V5ID0+ICghIW9ialtrZXldID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gIDoga2V5KSlcbiAgICAuam9pbignJicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHc/OiBXaW5kb3cpIHtcbiAgaWYgKCF3ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdyA9IHdpbmRvdztcbiAgfVxuICB0cnkge1xuICAgIGlmICghdyB8fCAhdy5sb2NhdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcbiAgICB9XG4gICAgcmV0dXJuIHcubG9jYXRpb24ub3JpZ2luO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBudWxsO1xuICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cbiAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJUHJvdmlkZXJzIH0gZnJvbSAnLi4vcHVibGljX2FwaSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXJzOiBJUHJvdmlkZXJzID0ge1xuICBmYWNlYm9vazoge1xuICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxuICAgIHJlZGlyZWN0VXJpOiBgJHtnZXRXaW5kb3dPcmlnaW4oKX0vYCxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCdcbiAgICB9LFxuICAgIHNjb3BlOiBbJ2VtYWlsJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gIH0sXG4gIGdvb2dsZToge1xuICAgIG5hbWU6ICdnb29nbGUnLFxuICAgIHVybDogJy9hdXRoL2dvb2dsZScsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICBwcm9tcHQ6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ2luX2hpbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGFjY2Vzc190eXBlOiB1bmRlZmluZWQsXG4gICAgICBpbmNsdWRlX2dyYW50ZWRfc2NvcGVzOiB1bmRlZmluZWQsXG4gICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxuICAgICAgaGQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgc2NvcGU6IFsnb3BlbmlkJywgJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXG4gICAgc3RhdGU6ICgpID0+XG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIE1hdGgucmFuZG9tKClcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAgICAgLnN1YnN0cigyKVxuICAgICAgKVxuICB9LFxuICBnaXRodWI6IHtcbiAgICBuYW1lOiAnZ2l0aHViJyxcbiAgICB1cmw6ICcvYXV0aC9naXRodWInLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9XG4gIH0sXG4gIGluc3RhZ3JhbToge1xuICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxuICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnXG4gIH0sXG4gIGxpbmtlZGluOiB7XG4gICAgbmFtZTogJ2xpbmtlZGluJyxcbiAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXG4gICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXG4gICAgc3RhdGU6ICdTVEFURSdcbiAgfSxcbiAgdHdpdHRlcjoge1xuICAgIG5hbWU6ICd0d2l0dGVyJyxcbiAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxuICAgIG9hdXRoVHlwZTogJzEuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH1cbiAgfSxcbiAgdHdpdGNoOiB7XG4gICAgbmFtZTogJ3R3aXRjaCcsXG4gICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xuICAgIH0sXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfVxuICB9LFxuICBsaXZlOiB7XG4gICAgbmFtZTogJ2xpdmUnLFxuICAgIHVybDogJy9hdXRoL2xpdmUnLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XG4gICAgICBkaXNwbGF5OiAncG9wdXAnXG4gICAgfSxcbiAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH1cbiAgfSxcbiAgeWFob286IHtcbiAgICBuYW1lOiAneWFob28nLFxuICAgIHVybDogJy9hdXRoL3lhaG9vJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXG4gICAgc2NvcGU6IFtdLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfVxuICB9LFxuICBiaXRidWNrZXQ6IHtcbiAgICBuYW1lOiAnYml0YnVja2V0JyxcbiAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxuICAgIHJlZGlyZWN0VXJpOiBgJHtnZXRXaW5kb3dPcmlnaW4oKX0vYCxcbiAgICBzY29wZTogWydlbWFpbCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjgsIGhlaWdodDogNTI5IH1cbiAgfSxcbiAgc3BvdGlmeToge1xuICAgIG5hbWU6ICdzcG90aWZ5JyxcbiAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXG4gICAgc2NvcGU6IFsnJywgJ3VzZXItcmVhZC1lbWFpbCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MzAgfSxcbiAgICBzdGF0ZTogKCkgPT5cbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgTWF0aC5yYW5kb20oKVxuICAgICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgICAuc3Vic3RyKDIpXG4gICAgICApXG4gIH1cbn07XG4iLCJleHBvcnQgZW51bSBTdG9yYWdlVHlwZSB7XG4gIE5PTkUgPSAnbm9uZScsXG4gIE1FTU9SWSA9ICdtZW1vcnknLFxuICBMT0NBTF9TVE9SQUdFID0gJ2xvY2FsU3RvcmFnZScsXG4gIFNFU1NJT05fU1RPUkFHRSA9ICdzZXNzaW9uU3RvcmFnZScsXG4gIENPT0tJRSA9ICdjb29raWUnLFxuICBTRVNTSU9OX0NPT0tJRSA9ICdzZXNzaW9uQ29va2llJ1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJQ29uZmlnT3B0aW9ucywgSVBhcnRpYWxDb25maWdPcHRpb25zLCBJUHJvdmlkZXJzLCBUb2tlbnN9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHVibGljIG9wdGlvbnMgID0ge1xuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgdG9rZW5Sb290OiBudWxsLFxuICAgIGJhc2VVcmw6ICcvJyxcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcbiAgICByZWZyZXNoVG9rZW5OYW1lOiAncmVmcmVzaF90b2tlbicsXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRSxcbiAgICBjb3Jkb3ZhOiB1bmRlZmluZWQsXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID1cbiAgICAgICAgcmVzcG9uc2UgJiYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSByZXNwb25zZVtjb25maWcucmVmcmVzaFRva2VuTmFtZV07XG4gICAgICAgIHJldHVybiA8VG9rZW5zPnsgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbiB9O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPVxuICAgICAgICBjb25maWcudG9rZW5Sb290ICYmXG4gICAgICAgIGNvbmZpZy50b2tlblJvb3Quc3BsaXQoJy4nKS5yZWR1Y2UoKG86IGFueSwgeDogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9beF07XG4gICAgICAgIH0sIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy5yZWZyZXNoVG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy5yZWZyZXNoVG9rZW5OYW1lXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHJldHVybiA8VG9rZW5zPnsgYWNjZXNzVG9rZW46IHRva2VuLCByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbiB9O1xuICAgICAgfVxuXG4gICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcbiAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiB7fVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xuICB9XG5cbiAgdXBkYXRlUHJvdmlkZXJzKHByb3ZpZGVyczogSVByb3ZpZGVycykge1xuICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnMgPSB7XG4gICAgICAuLi4odGhpcy5vcHRpb25zLnByb3ZpZGVycyB8fCB7fSksXG4gICAgICAuLi5wcm92aWRlcnNcbiAgICB9O1xuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xuICB9XG5cbiAgbWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdmlkZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5IGluIGRlZmF1bHRQcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnByb3ZpZGVyc1trZXldID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm92aWRlcnNba2V5XSxcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcbiAgYWJzdHJhY3QgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbjtcblxuICBhYnN0cmFjdCBhc3luYyBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG5cbiAgYWJzdHJhY3QgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFic3RyYWN0IGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgZXh0ZW5kcyBTdG9yYWdlU2VydmljZSB7XG4gIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgcHJpdmF0ZSBzdG9yYWdlVHlwZSA9IFN0b3JhZ2VUeXBlLk1FTU9SWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKCF0aGlzLnVwZGF0ZVN0b3JhZ2VUeXBlKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlKSkge1xuICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcbiAgICBjb25zdCBpc1N0b3JhZ2VBdmFpbGFibGUgPSB0aGlzLmNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcbiAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkNPT0tJRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9DT09LSUU6XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5nZXRDb29raWUoa2V5KSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc3RvcmVba2V5XSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBTdG9yYWdlVHlwZS5DT09LSUUgPyBkYXRlIDogJycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk1FTU9SWTpcbiAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZS5TRVNTSU9OX1NUT1JBR0UgfCBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcbiAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcbiAgICB0aGlzLnNldENvb2tpZShrZXksICcnLCBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29va2llKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxcXHMqKSR7a2V5fVxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJGApLCAnJDEnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFTVBUWSwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5SZWZyZXNoU2VydmljZSAge1xuXG4gIHJlcXVlc3RUb2tlblJlZnJlc2g8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ocmVmcmVzaFRva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gRU1QVFk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcbmltcG9ydCB7IFN1YnNjcmliZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2tlbnN9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHtUb2tlblJlZnJlc2hTZXJ2aWNlfSBmcm9tICcuL3Rva2VuLnJlZnJlc2guc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcbiAgcHVibGljIHRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcbiAgICA/IFt0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4LCB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZV0uam9pbih0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuU2VwYXJhdG9yKVxuICAgIDogdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWU7XG4gIHB1YmxpYyByZWZyZXNoVG9rZW5OYW1lID0gdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeFxuICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMucmVmcmVzaFRva2VuTmFtZV0uam9pbih0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuU2VwYXJhdG9yKVxuICAgIDogdGhpcy5jb25maWcub3B0aW9ucy5yZWZyZXNoVG9rZW5OYW1lO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsIHByaXZhdGUgdG9rZW5SZWZyZXNoU2VydmljZTogVG9rZW5SZWZyZXNoU2VydmljZSkge31cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVmcmVzaFRva2VuKCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMucmVmcmVzaFRva2VuTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VG9rZW4oKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQodGhpcy50b2tlbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFBheWxvYWQodG9rZW4/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4gJiYgdG9rZW4uc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpOlByb21pc2U8VG9rZW5zPiB7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgLy8gY29uc29sZS53YXJuKCdDYW5cXCd0IHNldCB0b2tlbiB3aXRob3V0IHBhc3NpbmcgYSB2YWx1ZScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHRva2VuczogVG9rZW5zO1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b2tlbnMgPSB7YWNjZXNzVG9rZW46IHJlc3BvbnNlfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdGhpcy5jb25maWcub3B0aW9ucy5yZXNvbHZlVG9rZW4ocmVzcG9uc2UsIHRoaXMuY29uZmlnLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0b2tlbnMuYWNjZXNzVG9rZW4pIHtcbiAgICAgIGNvbnN0IGV4cERhdGUgPSBhd2FpdCB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2Vucy5hY2Nlc3NUb2tlbik7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMudG9rZW5OYW1lLCB0b2tlbnMuYWNjZXNzVG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XG4gICAgfVxuXG4gICAgaWYgKHRva2Vucy5yZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGV4cERhdGUgPSBhd2FpdCB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2Vucy5yZWZyZXNoVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnJlZnJlc2hUb2tlbk5hbWUsIHRva2Vucy5yZWZyZXNoVG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZW1vdmVUb2tlbigpIHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0ZWQodG9rZW4/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICB9XG5cbiAgICAvLyBhIHRva2VuIGlzIHByZXNlbnRcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGlmICh0aGlzLmlzVmFsaWRUb2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuZ2V0UmVmcmVzaFRva2VuKCk7XG4gICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUb2tlbihyZWZyZXNoVG9rZW4pKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnRva2VuUmVmcmVzaFNlcnZpY2UucmVxdWVzdFRva2VuUmVmcmVzaChyZWZyZXNoVG9rZW4pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgIGNvbnN0IHRva2VucyA9IGF3YWl0IHRoaXMuc2V0VG9rZW4ocmVzcG9uc2UpO1xuXG4gICAgICAgICAgcmV0dXJuIHRva2VucyAmJiB0aGlzLmlzVmFsaWRUb2tlbih0b2tlbnMuYWNjZXNzVG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnJlZnJlc2hUb2tlbk5hbWUpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1ZhbGlkVG9rZW4odG9rZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIHRva2VuIHdpdGggYSB2YWxpZCBKV1QgZm9ybWF0IFhYWC5ZWVkuWlpaXG4gICAgaWYgKHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XG4gICAgICAvLyBjb3VsZCBiZSBhIHZhbGlkIEpXVCBvciBhbiBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgc2FtZSBmb3JtYXRcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XG4gICAgICAgIC8vIGp3dCB3aXRoIGFuIG9wdGlvbmFsIGV4cGlyYXRpb24gY2xhaW1zXG4gICAgICAgIGlmIChleHApIHtcbiAgICAgICAgICBjb25zdCBpc0V4cGlyZWQgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPj0gZXhwO1xuICAgICAgICAgIHJldHVybiAhaXNFeHBpcmVkO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIHBhc3M6IE5vbi1KV1QgdG9rZW4gdGhhdCBsb29rcyBsaWtlIEpXVFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcGFzczogQWxsIG90aGVyIHRva2Vuc1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEV4cGlyYXRpb25EYXRlKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuZ2V0UGF5bG9hZCh0b2tlbik7XG4gICAgaWYgKHBheWxvYWQgJiYgcGF5bG9hZC5leHAgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIDwgcGF5bG9hZC5leHApIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhwYXlsb2FkLmV4cCk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGFzeW5jIChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnVwZGF0ZVN0b3JhZ2VUeXBlKHR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBiNjREZWNvZGVVbmljb2RlKHN0cikge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGF0b2Ioc3RyKSwgYyA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSkuam9pbignJykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcblxuICAgIHJldHVybiBmcm9tKFByb21pc2UuYWxsKFt0aGlzLnNoYXJlZC5nZXRUb2tlbigpLCB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKV0pKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoYXV0aCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gYXV0aFswXTtcbiAgICAgICAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSBhdXRoWzFdO1xuXG4gICAgICAgICAgY29uc3QgbmV3UmVxID1cbiAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZCAmJiAhcmVxLmhlYWRlcnMuaGFzKGF1dGhIZWFkZXIpID8gcmVxLmNsb25lKHtzZXRIZWFkZXJzOiB7W2F1dGhIZWFkZXJdOiBgJHthdXRoVG9rZW59ICR7dG9rZW59YH19KSA6IHJlcTtcbiAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXNoYWRvd2VkLXZhcmlhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbXB0eSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElQb3B1cE9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5kZWNsYXJlIGNvbnN0IGNvcmRvdmE6IGFueTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xuICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCkpIHtcbiAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xuICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XG5cbiAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93Lm9wZW4odXJsLCB3aW5kb3dOYW1lLCBzdHJpbmdpZmllZE9wdGlvbnMpIDogbnVsbDtcblxuICAgIGlmIChwb3B1cFdpbmRvdykge1xuICAgICAgaWYgKHBvcHVwV2luZG93LmZvY3VzKSB7XG4gICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2YocG9wdXBXaW5kb3cpO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHkoKTtcbiAgfVxuXG4gIHB1YmxpYyB3YWl0Rm9yQ2xvc2UocG9wdXBXaW5kb3c6IFdpbmRvdywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCksIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcbiAgICByZXR1cm4gY29yZG92YSA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgcmVkaXJlY3RVcmkpIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKTtcbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XG4gICAgaWYgKCFwb3B1cFdpbmRvdykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxuICAgICAgICBkZWxheSgxMDApLFxuICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBmcm9tRXZlbnQocG9wdXBXaW5kb3csICdsb2Fkc3RhcnQnKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xuXG4gICAgICAgIGlmIChwYXJzZXIuc2VhcmNoIHx8IHBhcnNlci5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJzZXIuaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XG5cbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xuXG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICB9KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb2xsUG9wdXAocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xuICAgIHJldHVybiBpbnRlcnZhbCg1MCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93T3JpZ2luID0gZ2V0V2luZG93T3JpZ2luKHBvcHVwV2luZG93KTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcG9wdXBXaW5kb3dPcmlnaW4gJiZcbiAgICAgICAgICAocmVkaXJlY3RVcmkuaW5kZXhPZihwb3B1cFdpbmRvd09yaWdpbikgPT09IDAgfHwgcG9wdXBXaW5kb3dPcmlnaW4uaW5kZXhPZihyZWRpcmVjdFVyaSkgPT09IDApICYmXG4gICAgICAgICAgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xuICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xuICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUsXG4gICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5tYXAoa2V5ID0+IChvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWQgPyBrZXkgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0pKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQga2V5O1xuICAgIGxldCB2YWx1ZTtcbiAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXG4gICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoa2V5VmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XG4gICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzBdKTtcbiAgICAgICAgICBvYmpba2V5XSA9IHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3VuZGVmaW5lZCcgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMV0pIDogdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSxcbiAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvcmRvdmEgPT09ICdvYmplY3QnIHx8IChkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cDovLycpID09PSAtMSAmJiBkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cHM6Ly8nKSA9PT0gLTEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBwcm90ZWN0ZWQgcG9wdXA6IFBvcHVwU2VydmljZSwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwgPyBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgb2F1dGhPcHRpb25zLnVybCkgOiBvYXV0aE9wdGlvbnMudXJsO1xuICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4oJ2Fib3V0OmJsYW5rJywgb2F1dGhPcHRpb25zLCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocG9wdXBXaW5kb3cgPT5cbiAgICAgICAgdGhpcy5odHRwLnBvc3Q8b2JqZWN0PihzZXJ2ZXJVcmwsIG9hdXRoT3B0aW9ucykucGlwZShcbiAgICAgICAgICB0YXAoYXV0aG9yaXphdGlvbkRhdGEgPT5cbiAgICAgICAgICAgIHBvcHVwV2luZG93XG4gICAgICAgICAgICAgID8gcG9wdXBXaW5kb3cubG9jYXRpb24ucmVwbGFjZShbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICApLFxuICAgICAgICAgIHN3aXRjaE1hcChhdXRob3JpemF0aW9uRGF0YSA9PlxuICAgICAgICAgICAgdGhpcy5wb3B1cFxuICAgICAgICAgICAgICAud2FpdEZvckNsb3NlKHBvcHVwV2luZG93LCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsIG9hdXRoT3B0aW9ucy5yZWRpcmVjdFVyaSlcbiAgICAgICAgICAgICAgLnBpcGUobWFwKG9hdXRoRGF0YSA9PiAoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSA9PiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSkpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBleGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XG4gICAgY29uc3QgYm9keSA9IHsgb2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xuICAgIGNvbnN0IHsgd2l0aENyZWRlbnRpYWxzLCBiYXNlVXJsIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xuICAgIGNvbnN0IHsgbWV0aG9kID0gJ1BPU1QnLCB1cmwgfSA9IG9hdXRoT3B0aW9ucztcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSU9hdXRoMk9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiwgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XG4gICAgY29uc3QgdXJsID0gW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/Jyk7XG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh3aW5kb3c/OiBXaW5kb3cpID0+XG4gICAgICAgIHdpbmRvdyA/IHRoaXMucG9wdXAud2FpdEZvckNsb3NlKHdpbmRvdywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLCBvYXV0aE9wdGlvbnMucmVkaXJlY3RVcmkpIDogZW1wdHkoKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXG4gICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxuICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xuICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aCBcInN0YXRlXCIgbWlzbWF0Y2gnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XG4gICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcbiAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnLFxuICAgICAgY2xpZW50SWQsXG4gICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxuICAgICAgc2NvcGVEZWxpbWl0ZXIgPSAnLCcsXG4gICAgICBzY29wZSxcbiAgICAgIHN0YXRlLFxuICAgICAgYWRkaXRpb25hbFVybFBhcmFtc1xuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XG4gICAgcmV0dXJuIFtcbiAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXG4gICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcbiAgICAgIFsncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RVcmldLFxuICAgICAgLi4uKHN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSksXG4gICAgICAuLi4oc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSksXG4gICAgICAuLi4oYWRkaXRpb25hbFVybFBhcmFtc1xuICAgICAgICA/IE9iamVjdC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9IChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBbXSlcbiAgICBdXG4gICAgICAuZmlsdGVyKF8gPT4gISFfWzBdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge21hcFRvLCBzd2l0Y2hNYXAsIHN3aXRjaE1hcFRvLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL29hdXRoMS5zZXJ2aWNlJztcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9hdXRoU2VydmljZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXBQcm92aWRlcnMgPSBbXG4gICAgeyBwcm92aWRlOiBIdHRwQ2xpZW50LCB1c2VWYWx1ZTogdGhpcy5odHRwIH0sXG4gICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLnBvcHVwIH0sXG4gICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5jb25maWcgfVxuICBdO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVwcyA9IFtIdHRwQ2xpZW50LCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBwcm90ZWN0ZWQgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWdTZXJ2aWNlLCBwcm90ZWN0ZWQgcG9wdXA6IFBvcHVwU2VydmljZSkge31cblxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBwcm92aWRlcjogSU9hdXRoU2VydmljZSA9IHRoaXMucHJvdmlkZXJPZihuYW1lKTtcblxuICAgIHJldHVybiBwcm92aWRlci5vcGVuPFQ+KHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLCB1c2VyRGF0YSB8fCB7fSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgc2NlbmFyaW8gd2hlbiBzb21lb25lIHdpc2hlcyB0byBvcHQgb3V0IGZyb21cbiAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcbiAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXS51cmwpIHtcbiAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLnNoYXJlZC5zZXRUb2tlbihyZXNwb25zZSkpLnBpcGUobWFwVG8ocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvZihyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJvdmlkZXJPZihuYW1lOiBzdHJpbmcpOiBJT2F1dGhTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0ub2F1dGhUeXBlID09PSAnMS4wJ1xuICAgICAgPyBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDFTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0gfSkuZ2V0KE9hdXRoMVNlcnZpY2UpXG4gICAgICA6IEluamVjdG9yLmNyZWF0ZSh7IHByb3ZpZGVyczogWy4uLnRoaXMuZGVwUHJvdmlkZXJzLCB7IHByb3ZpZGU6IE9hdXRoMlNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9XSB9KS5nZXQoT2F1dGgyU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgdW5saW5rPFQ+KHByb3ZpZGVyOiBzdHJpbmcsIHVybCA9IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnVubGlua1VybCksIG1ldGhvZCA9ICdQT1NUJykge1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIHVybCwgeyBib2R5OiB7IHByb3ZpZGVyIH0gfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdD4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMubG9naW5VcmwpLCB1c2VyKVxuICAgICAgLnBpcGUodGFwKGRhdGEgPT4gdGhpcy5zaGFyZWQuc2V0VG9rZW4oZGF0YSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odXJsIHx8IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnNpZ251cFVybCksIHVzZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge31cblxuICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQubG9nb3V0KCk7XG4gIH1cblxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xuICB9XG5cbiAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLnVubGluazxUPihwcm92aWRlciwgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFRva2VuKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNoYXJlZC5zZXRUb2tlbih0b2tlbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlVG9rZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQYXlsb2FkKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5zZXRTdG9yYWdlVHlwZSh0eXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFeHBpcmF0aW9uRGF0ZSgpOiBQcm9taXNlPERhdGUgfCBudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IElDb25maWdPcHRpb25zLCBJUGFydGlhbENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IENPTkZJR19PUFRJT05TLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vYnJvd3Nlci1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nMlVpQXV0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ09wdGlvbnM/OiBJUGFydGlhbENvbmZpZ09wdGlvbnMsIGRlZmF1bHRKd3RJbnRlcmNlcHRvciA9IHRydWUpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nMlVpQXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi4oY29uZmlnT3B0aW9ucyA/IFt7IHByb3ZpZGU6IENPTkZJR19PUFRJT05TLCB1c2VWYWx1ZTogY29uZmlnT3B0aW9ucyB9XSA6IFtdKSxcbiAgICAgICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VDbGFzczogQ29uZmlnU2VydmljZSwgZGVwczogW0NPTkZJR19PUFRJT05TXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogQnJvd3NlclN0b3JhZ2VTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBTaGFyZWRTZXJ2aWNlLCB1c2VDbGFzczogU2hhcmVkU2VydmljZSwgZGVwczogW1N0b3JhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IExvY2FsU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VDbGFzczogUG9wdXBTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBPYXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBPYXV0aFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBQb3B1cFNlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBBdXRoU2VydmljZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIExvY2FsU2VydmljZSwgT2F1dGhTZXJ2aWNlXSB9LFxuICAgICAgICAuLi4oZGVmYXVsdEp3dEludGVyY2VwdG9yXG4gICAgICAgICAgPyBbeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH1dXG4gICAgICAgICAgOiBbXSlcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOlsidHNsaWJfMS5fX2V4dGVuZHMiLCJ0c2xpYl8xLl9fc3ByZWFkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBTUEsU0FBZ0IsT0FBTyxDQUFDLE9BQWUsRUFBRSxHQUFXO0lBQ2xELElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxDQUFDO0tBQ1o7O1FBRUssTUFBTSxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7SUFFdkMsT0FBTyxNQUFNO1NBQ1YsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUM7U0FDdEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUM7U0FDckIsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUM1Qjs7Ozs7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxHQUFX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