(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs'), require('rxjs/operators'), require('@angular/common/http')) :
    typeof define === 'function' && define.amd ? define('@soaa/ng2-ui-auth', ['exports', '@angular/core', 'rxjs', 'rxjs/operators', '@angular/common/http'], factory) :
    (factory((global.soaa = global.soaa || {}, global.soaa['ng2-ui-auth'] = {}),global.ng.core,global.rxjs,global.rxjs.operators,global.ng.common.http));
}(this, (function (exports,core,rxjs,operators,http) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (b.hasOwnProperty(p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

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
    var CONFIG_OPTIONS = new core.InjectionToken('config.options');
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
                        return ( /** @type {?} */({ accessToken: accessToken, refreshToken: refreshToken_1 }));
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
                        return ( /** @type {?} */({ accessToken: token, refreshToken: refreshToken }));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        ConfigService.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: core.Inject, args: [CONFIG_OPTIONS,] }] }
            ];
        };
        return ConfigService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var /**
     * @abstract
     */ StorageService = /** @class */ (function () {
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
                if (expires === void 0) {
                    expires = '';
                }
                if (path === void 0) {
                    path = '/';
                }
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
                if (path === void 0) {
                    path = '/';
                }
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        BrowserStorageService.ctorParameters = function () {
            return [
                { type: ConfigService }
            ];
        };
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
                return rxjs.EMPTY;
            };
        TokenRefreshService.decorators = [
            { type: core.Injectable }
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
                                if (!!token)
                                    return [3 /*break*/, 2];
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
                                if (!tokens.accessToken)
                                    return [3 /*break*/, 3];
                                return [4 /*yield*/, this.getExpirationDate(tokens.accessToken)];
                            case 1:
                                expDate = _a.sent();
                                return [4 /*yield*/, this.storage.set(this.tokenName, tokens.accessToken, expDate ? expDate.toUTCString() : '')];
                            case 2:
                                _a.sent();
                                _a.label = 3;
                            case 3:
                                if (!tokens.refreshToken)
                                    return [3 /*break*/, 6];
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
                                if (!!token)
                                    return [3 /*break*/, 2];
                                return [4 /*yield*/, this.getToken()];
                            case 1:
                                token = _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!token)
                                    return [3 /*break*/, 10];
                                if (this.isValidToken(token)) {
                                    return [2 /*return*/, true];
                                }
                                return [4 /*yield*/, this.getRefreshToken()];
                            case 3:
                                refreshToken = _a.sent();
                                if (!refreshToken)
                                    return [3 /*break*/, 8];
                                if (!this.isValidToken(refreshToken))
                                    return [3 /*break*/, 6];
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
                                if (!!token)
                                    return [3 /*break*/, 2];
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
                return rxjs.Observable.create(function (observer) {
                    return __awaiter(_this, void 0, void 0, function () {
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
                    });
                });
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        SharedService.ctorParameters = function () {
            return [
                { type: StorageService },
                { type: ConfigService },
                { type: TokenRefreshService }
            ];
        };
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
                return rxjs.from(Promise.all([this.shared.getToken(), this.shared.isAuthenticated()]))
                    .pipe(operators.switchMap(function (auth) {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        JwtInterceptor.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: ConfigService }
            ];
        };
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
                if (cordova === void 0) {
                    cordova = this.isCordovaApp();
                }
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
                    return rxjs.of(popupWindow);
                }
                return rxjs.empty();
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
                if (cordova === void 0) {
                    cordova = this.isCordovaApp();
                }
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
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
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
                if (!popupWindow) {
                    throw new Error('Popup was not created');
                }
                return rxjs.merge(rxjs.fromEvent(popupWindow, 'exit').pipe(operators.delay(100), operators.map(function () {
                    throw new Error('Authentication Canceled');
                })), rxjs.fromEvent(popupWindow, 'loadstart')).pipe(operators.switchMap(function (event) {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.Observable.throw(new Error('Authentication Canceled'));
                    }
                    if (event.url.indexOf(redirectUri) !== 0) {
                        return rxjs.empty();
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
                            return rxjs.of(allParams);
                        }
                    }
                    return rxjs.empty();
                }), operators.take(1));
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
                if (redirectUri === void 0) {
                    redirectUri = getWindowOrigin();
                }
                return rxjs.interval(50).pipe(operators.switchMap(function () {
                    if (!popupWindow || popupWindow.closed) {
                        return rxjs.throwError(new Error('Authentication Canceled'));
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
                            return rxjs.of(allParams);
                        }
                    }
                    return rxjs.empty();
                }), operators.take(1));
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
                }, ( /** @type {?} */({})));
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
            { type: core.Injectable }
        ];
        return PopupService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth1Service = /** @class */ (function () {
        function Oauth1Service(http$$1, popup, config) {
            this.http = http$$1;
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
                return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(operators.switchMap(function (popupWindow) {
                    return _this.http.post(serverUrl, oauthOptions).pipe(operators.tap(function (authorizationData) {
                        return popupWindow
                            ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
                            : undefined;
                    }), operators.switchMap(function (authorizationData) {
                        return _this.popup
                            .waitForClose(popupWindow, _this.config.options.cordova, oauthOptions.redirectUri)
                            .pipe(operators.map(function (oauthData) { return ({ authorizationData: authorizationData, oauthData: oauthData }); }));
                    }));
                }), operators.switchMap(function (_a) {
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth1Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth1Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var Oauth2Service = /** @class */ (function () {
        function Oauth2Service(http$$1, popup, config) {
            this.http = http$$1;
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
                return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(operators.switchMap(function (window) {
                    return window ? _this.popup.waitForClose(window, _this.config.options.cordova, oauthOptions.redirectUri) : rxjs.empty();
                }), operators.switchMap(function (oauthData) {
                    // when no server URL provided, return popup params as-is.
                    // this is for a scenario when someone wishes to opt out from
                    // satellizer's magic by doing authorization code exchange and
                    // saving a token manually.
                    if (oauthOptions.responseType === 'token' || !oauthOptions.url) {
                        return rxjs.of(oauthData);
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
                        var value = (( /** @type {?} */(additionalUrlParams)))[key];
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
                }, ( /** @type {?} */({})));
            };
        Oauth2Service.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        Oauth2Service.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: PopupService },
                { type: ConfigService }
            ];
        };
        return Oauth2Service;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OauthService = /** @class */ (function () {
        function OauthService(http$$1, shared, config, popup) {
            this.http = http$$1;
            this.shared = shared;
            this.config = config;
            this.popup = popup;
            this.depProviders = [
                { provide: http.HttpClient, useValue: this.http },
                { provide: PopupService, useValue: this.popup },
                { provide: ConfigService, useValue: this.config }
            ];
            this.deps = [http.HttpClient, PopupService, ConfigService];
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
                return provider.open(this.config.options.providers[name], userData || {}).pipe(operators.switchMap(function (response) {
                    // this is for a scenario when someone wishes to opt out from
                    // satellizer's magic by doing authorization code exchange and
                    // saving a token manually.
                    if (_this.config.options.providers[name].url) {
                        return rxjs.from(_this.shared.setToken(response)).pipe(operators.mapTo(response));
                    }
                    return rxjs.of(response);
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
                    ? core.Injector.create({ providers: __spread(this.depProviders, [{ provide: Oauth1Service, deps: this.deps }]) }).get(Oauth1Service)
                    : core.Injector.create({ providers: __spread(this.depProviders, [{ provide: Oauth2Service, deps: this.deps }]) }).get(Oauth2Service);
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
                if (url === void 0) {
                    url = joinUrl(this.config.options.baseUrl, this.config.options.unlinkUrl);
                }
                if (method === void 0) {
                    method = 'POST';
                }
                return this.http.request(method, url, { body: { provider: provider } });
            };
        OauthService.decorators = [
            { type: core.Injectable }
        ];
        /** @nocollapse */
        OauthService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService },
                { type: PopupService }
            ];
        };
        return OauthService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var LocalService = /** @class */ (function () {
        function LocalService(http$$1, shared, config) {
            this.http = http$$1;
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
                    .pipe(operators.tap(function (data) { return _this.shared.setToken(data); }));
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        LocalService.ctorParameters = function () {
            return [
                { type: http.HttpClient },
                { type: SharedService },
                { type: ConfigService }
            ];
        };
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
            { type: core.Injectable }
        ];
        /** @nocollapse */
        AuthService.ctorParameters = function () {
            return [
                { type: SharedService },
                { type: LocalService },
                { type: OauthService }
            ];
        };
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
                if (defaultJwtInterceptor === void 0) {
                    defaultJwtInterceptor = true;
                }
                return {
                    ngModule: Ng2UiAuthModule,
                    providers: __spread((configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []), [
                        { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                        { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                        { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                        { provide: LocalService, useClass: LocalService, deps: [http.HttpClient, SharedService, ConfigService] },
                        { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                        { provide: OauthService, useClass: OauthService, deps: [http.HttpClient, SharedService, ConfigService, PopupService] },
                        { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] }
                    ], (defaultJwtInterceptor
                        ? [{ provide: http.HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                        : []))
                };
            };
        Ng2UiAuthModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [http.HttpClientModule],
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

    exports.Ng2UiAuthModule = Ng2UiAuthModule;
    exports.LocalService = LocalService;
    exports.Oauth2Service = Oauth2Service;
    exports.Oauth1Service = Oauth1Service;
    exports.PopupService = PopupService;
    exports.OauthService = OauthService;
    exports.SharedService = SharedService;
    exports.StorageService = StorageService;
    exports.BrowserStorageService = BrowserStorageService;
    exports.AuthService = AuthService;
    exports.ConfigService = ConfigService;
    exports.TokenRefreshService = TokenRefreshService;
    exports.JwtInterceptor = JwtInterceptor;
    exports.CONFIG_OPTIONS = CONFIG_OPTIONS;
    exports.StorageType = StorageType;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29hYS1uZzItdWktYXV0aC51bWQuanMubWFwIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvdXRpbHMudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9jb25maWctcHJvdmlkZXJzLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvc3RvcmFnZS10eXBlLmVudW0udHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9jb25maWcuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3N0b3JhZ2Utc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL2Jyb3dzZXItc3RvcmFnZS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvdG9rZW4ucmVmcmVzaC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvc2hhcmVkLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9pbnRlcmNlcHRvci5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvcG9wdXAuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL29hdXRoMS5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvb2F1dGgyLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9vYXV0aC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvbG9jYWwuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL2F1dGguc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL25nMi11aS1hdXRoLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykgaWYgKGUuaW5kZXhPZihwW2ldKSA8IDApXHJcbiAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgcmV0dXJuIHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2RlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKSB7XHJcbiAgICB2YXIgYyA9IGFyZ3VtZW50cy5sZW5ndGgsIHIgPSBjIDwgMyA/IHRhcmdldCA6IGRlc2MgPT09IG51bGwgPyBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkgOiBkZXNjLCBkO1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0LmRlY29yYXRlID09PSBcImZ1bmN0aW9uXCIpIHIgPSBSZWZsZWN0LmRlY29yYXRlKGRlY29yYXRvcnMsIHRhcmdldCwga2V5LCBkZXNjKTtcclxuICAgIGVsc2UgZm9yICh2YXIgaSA9IGRlY29yYXRvcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIGlmIChkID0gZGVjb3JhdG9yc1tpXSkgciA9IChjIDwgMyA/IGQocikgOiBjID4gMyA/IGQodGFyZ2V0LCBrZXksIHIpIDogZCh0YXJnZXQsIGtleSkpIHx8IHI7XHJcbiAgICByZXR1cm4gYyA+IDMgJiYgciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHIpLCByO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19wYXJhbShwYXJhbUluZGV4LCBkZWNvcmF0b3IpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBrZXkpIHsgZGVjb3JhdG9yKHRhcmdldCwga2V5LCBwYXJhbUluZGV4KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiBSZWZsZWN0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBSZWZsZWN0Lm1ldGFkYXRhID09PSBcImZ1bmN0aW9uXCIpIHJldHVybiBSZWZsZWN0Lm1ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgZXhwb3J0cykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAoIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIGV4cG9ydHNbcF0gPSBtW3BdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpZiAoZ1tuXSkgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IG4gPT09IFwicmV0dXJuXCIgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ha2VUZW1wbGF0ZU9iamVjdChjb29rZWQsIHJhdykge1xyXG4gICAgaWYgKE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkgeyBPYmplY3QuZGVmaW5lUHJvcGVydHkoY29va2VkLCBcInJhd1wiLCB7IHZhbHVlOiByYXcgfSk7IH0gZWxzZSB7IGNvb2tlZC5yYXcgPSByYXc7IH1cclxuICAgIHJldHVybiBjb29rZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XHJcbiAgICByZXN1bHQuZGVmYXVsdCA9IG1vZDtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcbiIsImltcG9ydCB7IEh0dHBIZWFkZXJzLCBIdHRwUGFyYW1zIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG4vKipcbiAqIENyZWF0ZWQgYnkgUm9uIG9uIDE3LzEyLzIwMTUuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5VcmwoYmFzZVVybDogc3RyaW5nLCB1cmw6IHN0cmluZykge1xuICBpZiAoL14oPzpbYS16XSs6KT9cXC9cXC8vaS50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgY29uc3Qgam9pbmVkID0gW2Jhc2VVcmwsIHVybF0uam9pbignLycpO1xuXG4gIHJldHVybiBqb2luZWRcbiAgICAucmVwbGFjZSgvW1xcL10rL2csICcvJylcbiAgICAucmVwbGFjZSgvXFwvXFw/L2csICc/JylcbiAgICAucmVwbGFjZSgvXFwvXFwjL2csICcjJylcbiAgICAucmVwbGFjZSgvXFw6XFwvL2csICc6Ly8nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUXVlcnlTdHJpbmcob2JqOiBvYmplY3QpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iailcbiAgICAubWFwKGtleSA9PiAoISFvYmpba2V5XSA/IGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSl9YCA6IGtleSkpXG4gICAgLmpvaW4oJyYnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFdpbmRvd09yaWdpbih3PzogV2luZG93KSB7XG4gIGlmICghdyAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHcgPSB3aW5kb3c7XG4gIH1cbiAgdHJ5IHtcbiAgICBpZiAoIXcgfHwgIXcubG9jYXRpb24pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoIXcubG9jYXRpb24ub3JpZ2luKSB7XG4gICAgICByZXR1cm4gYCR7dy5sb2NhdGlvbi5wcm90b2NvbH0vLyR7dy5sb2NhdGlvbi5ob3N0bmFtZX0ke3cubG9jYXRpb24ucG9ydCA/ICc6JyArIHcubG9jYXRpb24ucG9ydCA6ICcnfWA7XG4gICAgfVxuICAgIHJldHVybiB3LmxvY2F0aW9uLm9yaWdpbjtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgICAvLyBpZ25vcmUgRE9NRXhjZXB0aW9uOiBCbG9ja2VkIGEgZnJhbWUgd2l0aCBvcmlnaW4gZnJvbSBhY2Nlc3NpbmcgYSBjcm9zcy1vcmlnaW4gZnJhbWUuXG4gICAgLy8gZXJyb3IgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgZXJyb3IubmFtZSA9PT0gJ1NlY3VyaXR5RXJyb3InXG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgSVByb3ZpZGVycyB9IGZyb20gJy4uL3B1YmxpY19hcGknO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFByb3ZpZGVyczogSVByb3ZpZGVycyA9IHtcbiAgZmFjZWJvb2s6IHtcbiAgICBuYW1lOiAnZmFjZWJvb2snLFxuICAgIHVybDogJy9hdXRoL2ZhY2Vib29rJyxcbiAgICByZWRpcmVjdFVyaTogYCR7Z2V0V2luZG93T3JpZ2luKCl9L2AsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3YyLjUvZGlhbG9nL29hdXRoJyxcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XG4gICAgICBkaXNwbGF5OiAncG9wdXAnXG4gICAgfSxcbiAgICBzY29wZTogWydlbWFpbCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU4MCwgaGVpZ2h0OiA0MDAgfVxuICB9LFxuICBnb29nbGU6IHtcbiAgICBuYW1lOiAnZ29vZ2xlJyxcbiAgICB1cmw6ICcvYXV0aC9nb29nbGUnLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoJyxcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XG4gICAgICBkaXNwbGF5OiAncG9wdXAnLFxuICAgICAgcHJvbXB0OiB1bmRlZmluZWQsXG4gICAgICBsb2dpbl9oaW50OiB1bmRlZmluZWQsXG4gICAgICBhY2Nlc3NfdHlwZTogdW5kZWZpbmVkLFxuICAgICAgaW5jbHVkZV9ncmFudGVkX3Njb3BlczogdW5kZWZpbmVkLFxuICAgICAgJ29wZW5pZC5yZWFsbSc6IHVuZGVmaW5lZCxcbiAgICAgIGhkOiB1bmRlZmluZWRcbiAgICB9LFxuICAgIHNjb3BlOiBbJ29wZW5pZCcsICdwcm9maWxlJywgJ2VtYWlsJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDUyLCBoZWlnaHQ6IDYzMyB9LFxuICAgIHN0YXRlOiAoKSA9PlxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHIoMilcbiAgICAgIClcbiAgfSxcbiAgZ2l0aHViOiB7XG4gICAgbmFtZTogJ2dpdGh1YicsXG4gICAgdXJsOiAnL2F1dGgvZ2l0aHViJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2dpdGh1Yi5jb20vbG9naW4vb2F1dGgvYXV0aG9yaXplJyxcbiAgICBzY29wZTogWyd1c2VyOmVtYWlsJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogMTAyMCwgaGVpZ2h0OiA2MTggfVxuICB9LFxuICBpbnN0YWdyYW06IHtcbiAgICBuYW1lOiAnaW5zdGFncmFtJyxcbiAgICB1cmw6ICcvYXV0aC9pbnN0YWdyYW0nLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYXBpLmluc3RhZ3JhbS5jb20vb2F1dGgvYXV0aG9yaXplJyxcbiAgICBzY29wZTogWydiYXNpYyddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnKycsXG4gICAgb2F1dGhUeXBlOiAnMi4wJ1xuICB9LFxuICBsaW5rZWRpbjoge1xuICAgIG5hbWU6ICdsaW5rZWRpbicsXG4gICAgdXJsOiAnL2F1dGgvbGlua2VkaW4nLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vd3d3LmxpbmtlZGluLmNvbS91YXMvb2F1dGgyL2F1dGhvcml6YXRpb24nLFxuICAgIHNjb3BlOiBbJ3JfZW1haWxhZGRyZXNzJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTI3LCBoZWlnaHQ6IDU4MiB9LFxuICAgIHN0YXRlOiAnU1RBVEUnXG4gIH0sXG4gIHR3aXR0ZXI6IHtcbiAgICBuYW1lOiAndHdpdHRlcicsXG4gICAgdXJsOiAnL2F1dGgvdHdpdHRlcicsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdHRlci5jb20vb2F1dGgvYXV0aGVudGljYXRlJyxcbiAgICBvYXV0aFR5cGU6ICcxLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNDk1LCBoZWlnaHQ6IDY0NSB9XG4gIH0sXG4gIHR3aXRjaDoge1xuICAgIG5hbWU6ICd0d2l0Y2gnLFxuICAgIHVybDogJy9hdXRoL3R3aXRjaCcsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkudHdpdGNoLnR2L2tyYWtlbi9vYXV0aDIvYXV0aG9yaXplJyxcbiAgICBzY29wZTogWyd1c2VyX3JlYWQnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCdcbiAgICB9LFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH1cbiAgfSxcbiAgbGl2ZToge1xuICAgIG5hbWU6ICdsaXZlJyxcbiAgICB1cmw6ICcvYXV0aC9saXZlJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2xvZ2luLmxpdmUuY29tL29hdXRoMjBfYXV0aG9yaXplLnNyZicsXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xuICAgIH0sXG4gICAgc2NvcGU6IFsnd2wuZW1haWxzJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcgJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTAwLCBoZWlnaHQ6IDU2MCB9XG4gIH0sXG4gIHlhaG9vOiB7XG4gICAgbmFtZTogJ3lhaG9vJyxcbiAgICB1cmw6ICcvYXV0aC95YWhvbycsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkubG9naW4ueWFob28uY29tL29hdXRoMi9yZXF1ZXN0X2F1dGgnLFxuICAgIHNjb3BlOiBbXSxcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1NTksIGhlaWdodDogNTE5IH1cbiAgfSxcbiAgYml0YnVja2V0OiB7XG4gICAgbmFtZTogJ2JpdGJ1Y2tldCcsXG4gICAgdXJsOiAnL2F1dGgvYml0YnVja2V0JyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2JpdGJ1Y2tldC5vcmcvc2l0ZS9vYXV0aDIvYXV0aG9yaXplJyxcbiAgICByZWRpcmVjdFVyaTogYCR7Z2V0V2luZG93T3JpZ2luKCl9L2AsXG4gICAgc2NvcGU6IFsnZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDI4LCBoZWlnaHQ6IDUyOSB9XG4gIH0sXG4gIHNwb3RpZnk6IHtcbiAgICBuYW1lOiAnc3BvdGlmeScsXG4gICAgdXJsOiAnL2F1dGgvc3BvdGlmeScsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5zcG90aWZ5LmNvbS9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJycsICd1c2VyLXJlYWQtZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJywnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTMwIH0sXG4gICAgc3RhdGU6ICgpID0+XG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIE1hdGgucmFuZG9tKClcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAgICAgLnN1YnN0cigyKVxuICAgICAgKVxuICB9XG59O1xuIiwiZXhwb3J0IGVudW0gU3RvcmFnZVR5cGUge1xuICBOT05FID0gJ25vbmUnLFxuICBNRU1PUlkgPSAnbWVtb3J5JyxcbiAgTE9DQUxfU1RPUkFHRSA9ICdsb2NhbFN0b3JhZ2UnLFxuICBTRVNTSU9OX1NUT1JBR0UgPSAnc2Vzc2lvblN0b3JhZ2UnLFxuICBDT09LSUUgPSAnY29va2llJyxcbiAgU0VTU0lPTl9DT09LSUUgPSAnc2Vzc2lvbkNvb2tpZSdcbn1cbiIsImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SUNvbmZpZ09wdGlvbnMsIElQYXJ0aWFsQ29uZmlnT3B0aW9ucywgSVByb3ZpZGVycywgVG9rZW5zfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IGRlZmF1bHRQcm92aWRlcnMgfSBmcm9tICcuL2NvbmZpZy1wcm92aWRlcnMnO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcblxuZXhwb3J0IGNvbnN0IENPTkZJR19PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPGFueT4oJ2NvbmZpZy5vcHRpb25zJyk7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29uZmlnU2VydmljZSB7XG4gIHB1YmxpYyBvcHRpb25zICA9IHtcbiAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgIHRva2VuUm9vdDogbnVsbCxcbiAgICBiYXNlVXJsOiAnLycsXG4gICAgbG9naW5Vcmw6ICcvYXV0aC9sb2dpbicsXG4gICAgc2lnbnVwVXJsOiAnL2F1dGgvc2lnbnVwJyxcbiAgICB1bmxpbmtVcmw6ICcvYXV0aC91bmxpbmsvJyxcbiAgICB0b2tlbk5hbWU6ICd0b2tlbicsXG4gICAgcmVmcmVzaFRva2VuTmFtZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgIHRva2VuU2VwYXJhdG9yOiAnXycsXG4gICAgdG9rZW5QcmVmaXg6ICduZzItdWktYXV0aCcsXG4gICAgYXV0aEhlYWRlcjogJ0F1dGhvcml6YXRpb24nLFxuICAgIGF1dGhUb2tlbjogJ0JlYXJlcicsXG4gICAgc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0UsXG4gICAgY29yZG92YTogdW5kZWZpbmVkLFxuICAgIHJlc29sdmVUb2tlbjogKHJlc3BvbnNlOiBhbnksIGNvbmZpZzogSUNvbmZpZ09wdGlvbnMpID0+IHtcbiAgICAgIGNvbnN0IGFjY2Vzc1Rva2VuOiBzdHJpbmcgfCB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCB8IHVuZGVmaW5lZCA9XG4gICAgICAgIHJlc3BvbnNlICYmIChyZXNwb25zZS5hY2Nlc3NfdG9rZW4gfHwgcmVzcG9uc2UudG9rZW4gfHwgcmVzcG9uc2UuZGF0YSk7XG4gICAgICBpZiAoIWFjY2Vzc1Rva2VuKSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGFjY2Vzc1Rva2VuID09PSAnc3RyaW5nJykge1xuICAgICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tc2hhZG93ZWQtdmFyaWFibGVcbiAgICAgICAgY29uc3QgcmVmcmVzaFRva2VuID0gcmVzcG9uc2VbY29uZmlnLnJlZnJlc2hUb2tlbk5hbWVdO1xuICAgICAgICByZXR1cm4gPFRva2Vucz57IGFjY2Vzc1Rva2VuOiBhY2Nlc3NUb2tlbiwgcmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW4gfTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gIT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGNvbnNvbGUud2FybignTm8gdG9rZW4gZm91bmQnKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBjb25zdCB0b2tlblJvb3REYXRhID1cbiAgICAgICAgY29uZmlnLnRva2VuUm9vdCAmJlxuICAgICAgICBjb25maWcudG9rZW5Sb290LnNwbGl0KCcuJykucmVkdWNlKChvOiBhbnksIHg6IGFueSkgPT4ge1xuICAgICAgICAgIHJldHVybiBvW3hdO1xuICAgICAgICB9LCBhY2Nlc3NUb2tlbik7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy50b2tlbk5hbWVdIDogYWNjZXNzVG9rZW5bY29uZmlnLnRva2VuTmFtZV07XG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSB0b2tlblJvb3REYXRhID8gdG9rZW5Sb290RGF0YVtjb25maWcucmVmcmVzaFRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcucmVmcmVzaFRva2VuTmFtZV07XG5cbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICByZXR1cm4gPFRva2Vucz57IGFjY2Vzc1Rva2VuOiB0b2tlbiwgcmVmcmVzaFRva2VuOiByZWZyZXNoVG9rZW4gfTtcbiAgICAgIH1cblxuICAgICAgLy8gY29uc3QgdG9rZW5QYXRoID0gdGhpcy50b2tlblJvb3QgPyB0aGlzLnRva2VuUm9vdCArICcuJyArIHRoaXMudG9rZW5OYW1lIDogdGhpcy50b2tlbk5hbWU7XG4gICAgICAvLyBjb25zb2xlLndhcm4oJ0V4cGVjdGluZyBhIHRva2VuIG5hbWVkIFwiJyArIHRva2VuUGF0aCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9LFxuICAgIHByb3ZpZGVyczoge31cbiAgfTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KENPTkZJR19PUFRJT05TKSBvcHRpb25zOiBJUGFydGlhbENvbmZpZ09wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAuLi50aGlzLm9wdGlvbnMsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcbiAgfVxuXG4gIHVwZGF0ZVByb3ZpZGVycyhwcm92aWRlcnM6IElQcm92aWRlcnMpIHtcbiAgICB0aGlzLm9wdGlvbnMucHJvdmlkZXJzID0ge1xuICAgICAgLi4uKHRoaXMub3B0aW9ucy5wcm92aWRlcnMgfHwge30pLFxuICAgICAgLi4ucHJvdmlkZXJzXG4gICAgfTtcbiAgICB0aGlzLm1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKTtcbiAgfVxuXG4gIG1lcmdlV2l0aERlZmF1bHRQcm92aWRlcnMoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5vcHRpb25zLnByb3ZpZGVycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSBpbiBkZWZhdWx0UHJvdmlkZXJzKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnNba2V5XSA9IHtcbiAgICAgICAgICAuLi5kZWZhdWx0UHJvdmlkZXJzW2tleV0sXG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLnByb3ZpZGVyc1trZXldXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBTdG9yYWdlU2VydmljZSB7XG4gIGFic3RyYWN0IHVwZGF0ZVN0b3JhZ2VUeXBlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSk6IGJvb2xlYW47XG5cbiAgYWJzdHJhY3QgYXN5bmMgZ2V0KGtleTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xuXG4gIGFic3RyYWN0IGFzeW5jIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZGF0ZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPjtcblxuICBhYnN0cmFjdCBhc3luYyByZW1vdmUoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Utc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnJvd3NlclN0b3JhZ2VTZXJ2aWNlIGV4dGVuZHMgU3RvcmFnZVNlcnZpY2Uge1xuICBwcml2YXRlIHN0b3JlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge307XG4gIHByaXZhdGUgc3RvcmFnZVR5cGUgPSBTdG9yYWdlVHlwZS5NRU1PUlk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICAgIGlmICghdGhpcy51cGRhdGVTdG9yYWdlVHlwZShjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSkpIHtcbiAgICAgIGNvbnNvbGUud2Fybihjb25maWcub3B0aW9ucy5zdG9yYWdlVHlwZSArICcgaXMgbm90IGF2YWlsYWJsZS4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgY29uc3QgaXNTdG9yYWdlQXZhaWxhYmxlID0gdGhpcy5jaGVja0lzU3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZSk7XG4gICAgaWYgKCFpc1N0b3JhZ2VBdmFpbGFibGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5zdG9yYWdlVHlwZSA9IHN0b3JhZ2VUeXBlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldChrZXk6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZ2V0Q29va2llKGtleSkpO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX1NUT1JBR0U6XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLmdldEl0ZW0oa2V5KSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk1FTU9SWTpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLnN0b3JlW2tleV0pO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuQ09PS0lFOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX0NPT0tJRTpcbiAgICAgICAgdGhpcy5zZXRDb29raWUoa2V5LCB2YWx1ZSwgdGhpcy5zdG9yYWdlVHlwZSA9PT0gU3RvcmFnZVR5cGUuQ09PS0lFID8gZGF0ZSA6ICcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XG4gICAgICAgIHRoaXMuc3RvcmVba2V5XSA9IHZhbHVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZW1vdmUoa2V5OiBzdHJpbmcpIHtcbiAgICBzd2l0Y2ggKHRoaXMuc3RvcmFnZVR5cGUpIHtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuQ09PS0lFOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX0NPT0tJRTpcbiAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgd2luZG93W3RoaXMuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk1FTU9SWTpcbiAgICAgICAgZGVsZXRlIHRoaXMuc3RvcmVba2V5XTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZSkge1xuICAgIHN3aXRjaCAoc3RvcmFnZVR5cGUpIHtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuQ09PS0lFOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5TRVNTSU9OX0NPT0tJRTpcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzV2luZG93U3RvcmFnZUF2YWlsYWJsZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFIHwgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWQgPSB3aW5kb3cgJiYgc3RvcmFnZVR5cGUgaW4gd2luZG93ICYmIHdpbmRvd1tzdG9yYWdlVHlwZV0gIT09IG51bGw7XG5cbiAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgICAuc3Vic3RyaW5nKDcpO1xuICAgICAgICB3aW5kb3dbc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCAnJyk7XG4gICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3VwcG9ydGVkO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGlzQ29va2llU3RvcmFnZUF2YWlsYWJsZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3VwcG9ydGVkID0gZG9jdW1lbnQgJiYgJ2Nvb2tpZScgaW4gZG9jdW1lbnQ7XG5cbiAgICAgIGlmIChzdXBwb3J0ZWQpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgICAuc3Vic3RyaW5nKDcpO1xuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksICd0ZXN0JywgbmV3IERhdGUoRGF0ZS5ub3coKSArIDYwICogMTAwMCkudG9VVENTdHJpbmcoKSk7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRDb29raWUoa2V5KTtcbiAgICAgICAgdGhpcy5yZW1vdmVDb29raWUoa2V5KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSAndGVzdCc7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0Q29va2llKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleHBpcmVzID0gJycsIHBhdGggPSAnLycpIHtcbiAgICBkb2N1bWVudC5jb29raWUgPSBgJHtrZXl9PSR7dmFsdWV9JHtleHBpcmVzID8gYDsgZXhwaXJlcz0ke2V4cGlyZXN9YCA6ICcnfTsgcGF0aD0ke3BhdGh9YDtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ29va2llKGtleTogc3RyaW5nLCBwYXRoID0gJy8nKSB7XG4gICAgdGhpcy5zZXRDb29raWUoa2V5LCAnJywgbmV3IERhdGUoMCkudG9VVENTdHJpbmcoKSwgcGF0aCk7XG4gIH1cblxuICBwcml2YXRlIGdldENvb2tpZShrZXk6IHN0cmluZykge1xuICAgIHJldHVybiBkb2N1bWVudC5jb29raWUucmVwbGFjZShuZXcgUmVnRXhwKGAoPzooPzpefC4qO1xcXFxzKikke2tleX1cXFxccypcXFxcPVxcXFxzKihbXjtdKikuKiQpfF4uKiRgKSwgJyQxJyk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RU1QVFksIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFRva2VuUmVmcmVzaFNlcnZpY2UgIHtcblxuICByZXF1ZXN0VG9rZW5SZWZyZXNoPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KHJlZnJlc2hUb2tlbjogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIEVNUFRZO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBTdWJzY3JpYmVyLCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7VG9rZW5zfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7VG9rZW5SZWZyZXNoU2VydmljZX0gZnJvbSAnLi90b2tlbi5yZWZyZXNoLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2hhcmVkU2VydmljZSB7XG4gIHB1YmxpYyB0b2tlbk5hbWUgPSB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4XG4gICAgPyBbdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeCwgdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcbiAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5OYW1lO1xuICBwdWJsaWMgcmVmcmVzaFRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcbiAgICA/IFt0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4LCB0aGlzLmNvbmZpZy5vcHRpb25zLnJlZnJlc2hUb2tlbk5hbWVdLmpvaW4odGhpcy5jb25maWcub3B0aW9ucy50b2tlblNlcGFyYXRvcilcbiAgICA6IHRoaXMuY29uZmlnLm9wdGlvbnMucmVmcmVzaFRva2VuTmFtZTtcblxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVNlcnZpY2UsIHByaXZhdGUgY29uZmlnOiBDb25maWdTZXJ2aWNlLCBwcml2YXRlIHRva2VuUmVmcmVzaFNlcnZpY2U6IFRva2VuUmVmcmVzaFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGFzeW5jIGdldFJlZnJlc2hUb2tlbigpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zdG9yYWdlLmdldCh0aGlzLnJlZnJlc2hUb2tlbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFRva2VuKCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMudG9rZW5OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQYXlsb2FkKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgaWYgKHRva2VuICYmIHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodGhpcy5iNjREZWNvZGVVbmljb2RlKGJhc2U2NCkpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRUb2tlbihyZXNwb25zZTogc3RyaW5nIHwgb2JqZWN0KTpQcm9taXNlPFRva2Vucz4ge1xuICAgIGlmICghcmVzcG9uc2UpIHtcbiAgICAgIC8vIGNvbnNvbGUud2FybignQ2FuXFwndCBzZXQgdG9rZW4gd2l0aG91dCBwYXNzaW5nIGEgdmFsdWUnKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB0b2tlbnM6IFRva2VucztcbiAgICBpZiAodHlwZW9mIHJlc3BvbnNlID09PSAnc3RyaW5nJykge1xuICAgICAgdG9rZW5zID0ge2FjY2Vzc1Rva2VuOiByZXNwb25zZX07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRva2VucyA9IHRoaXMuY29uZmlnLm9wdGlvbnMucmVzb2x2ZVRva2VuKHJlc3BvbnNlLCB0aGlzLmNvbmZpZy5vcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW5zLmFjY2Vzc1Rva2VuKSB7XG4gICAgICBjb25zdCBleHBEYXRlID0gYXdhaXQgdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbnMuYWNjZXNzVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnRva2VuTmFtZSwgdG9rZW5zLmFjY2Vzc1Rva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xuICAgIH1cblxuICAgIGlmICh0b2tlbnMucmVmcmVzaFRva2VuKSB7XG4gICAgICBjb25zdCBleHBEYXRlID0gYXdhaXQgdGhpcy5nZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbnMucmVmcmVzaFRva2VuKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5zZXQodGhpcy5yZWZyZXNoVG9rZW5OYW1lLCB0b2tlbnMucmVmcmVzaFRva2VuLCBleHBEYXRlID8gZXhwRGF0ZS50b1VUQ1N0cmluZygpIDogJycpO1xuICAgIH1cblxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlVG9rZW4oKSB7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGVkKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgLy8gYSB0b2tlbiBpcyBwcmVzZW50XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4odG9rZW4pKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBhd2FpdCB0aGlzLmdldFJlZnJlc2hUb2tlbigpO1xuICAgICAgaWYgKHJlZnJlc2hUb2tlbikge1xuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVG9rZW4ocmVmcmVzaFRva2VuKSkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy50b2tlblJlZnJlc2hTZXJ2aWNlLnJlcXVlc3RUb2tlblJlZnJlc2gocmVmcmVzaFRva2VuKS50b1Byb21pc2UoKTtcbiAgICAgICAgICBjb25zdCB0b2tlbnMgPSBhd2FpdCB0aGlzLnNldFRva2VuKHJlc3BvbnNlKTtcblxuICAgICAgICAgIHJldHVybiB0b2tlbnMgJiYgdGhpcy5pc1ZhbGlkVG9rZW4odG9rZW5zLmFjY2Vzc1Rva2VuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcy5yZWZyZXNoVG9rZW5OYW1lKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNWYWxpZFRva2VuKHRva2VuOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAvLyB0b2tlbiB3aXRoIGEgdmFsaWQgSldUIGZvcm1hdCBYWFguWVlZLlpaWlxuICAgIGlmICh0b2tlbi5zcGxpdCgnLicpLmxlbmd0aCA9PT0gMykge1xuICAgICAgLy8gY291bGQgYmUgYSB2YWxpZCBKV1Qgb3IgYW4gYWNjZXNzIHRva2VuIHdpdGggdGhlIHNhbWUgZm9ybWF0XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBiYXNlNjRVcmwgPSB0b2tlbi5zcGxpdCgnLicpWzFdO1xuICAgICAgICBjb25zdCBiYXNlNjQgPSBiYXNlNjRVcmwucmVwbGFjZSgvLS9nLCAnKycpLnJlcGxhY2UoL18vZywgJy8nKTtcbiAgICAgICAgY29uc3QgZXhwID0gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSkuZXhwO1xuICAgICAgICAvLyBqd3Qgd2l0aCBhbiBvcHRpb25hbCBleHBpcmF0aW9uIGNsYWltc1xuICAgICAgICBpZiAoZXhwKSB7XG4gICAgICAgICAgY29uc3QgaXNFeHBpcmVkID0gTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApID49IGV4cDtcbiAgICAgICAgICByZXR1cm4gIWlzRXhwaXJlZDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBwYXNzOiBOb24tSldUIHRva2VuIHRoYXQgbG9va3MgbGlrZSBKV1RcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIHBhc3M6IEFsbCBvdGhlciB0b2tlbnNcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFeHBpcmF0aW9uRGF0ZSh0b2tlbj86IHN0cmluZykge1xuICAgIGlmICghdG9rZW4pIHtcbiAgICAgIHRva2VuID0gYXdhaXQgdGhpcy5nZXRUb2tlbigpO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSBhd2FpdCB0aGlzLmdldFBheWxvYWQodG9rZW4pO1xuICAgIGlmIChwYXlsb2FkICYmIHBheWxvYWQuZXhwICYmIE1hdGgucm91bmQobmV3IERhdGUoKS5nZXRUaW1lKCkgLyAxMDAwKSA8IHBheWxvYWQuZXhwKSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgICBkYXRlLnNldFVUQ1NlY29uZHMocGF5bG9hZC5leHApO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBPYnNlcnZhYmxlLmNyZWF0ZShhc3luYyAob2JzZXJ2ZXI6IFN1YnNjcmliZXI8YW55PikgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnRva2VuTmFtZSk7XG4gICAgICBvYnNlcnZlci5uZXh0KCk7XG4gICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHNldFN0b3JhZ2VUeXBlKHR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS51cGRhdGVTdG9yYWdlVHlwZSh0eXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgYjY0RGVjb2RlVW5pY29kZShzdHIpIHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksIGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpLmpvaW4oJycpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgeyBhdXRoSGVhZGVyLCBhdXRoVG9rZW4gfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XG5cbiAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChbdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKSwgdGhpcy5zaGFyZWQuaXNBdXRoZW50aWNhdGVkKCldKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGF1dGgpID0+IHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IGF1dGhbMF07XG4gICAgICAgICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gYXV0aFsxXTtcblxuICAgICAgICAgIGNvbnN0IG5ld1JlcSA9XG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgJiYgIXJlcS5oZWFkZXJzLmhhcyhhdXRoSGVhZGVyKSA/IHJlcS5jbG9uZSh7c2V0SGVhZGVyczoge1thdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWB9fSkgOiByZXE7XG4gICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKG5ld1JlcSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby1zaGFkb3dlZC12YXJpYWJsZSAqL1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZW1wdHksIGZyb21FdmVudCwgaW50ZXJ2YWwsIG1lcmdlLCBPYnNlcnZhYmxlLCBvZiwgdGhyb3dFcnJvciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVsYXksIG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSU9hdXRoMU9wdGlvbnMsIElPYXV0aDJPcHRpb25zLCBJUG9wdXBPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBnZXRXaW5kb3dPcmlnaW4gfSBmcm9tICcuL3V0aWxzJztcblxuZGVjbGFyZSBjb25zdCBjb3Jkb3ZhOiBhbnk7XG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9wdXBTZXJ2aWNlIHtcbiAgcHVibGljIG9wZW4odXJsOiBzdHJpbmcsIG9wdGlvbnM6IElPYXV0aDJPcHRpb25zIHwgSU9hdXRoMU9wdGlvbnMsIGNvcmRvdmEgPSB0aGlzLmlzQ29yZG92YUFwcCgpKSB7XG4gICAgY29uc3Qgc3RyaW5naWZpZWRPcHRpb25zID0gdGhpcy5zdHJpbmdpZnlPcHRpb25zKHRoaXMucHJlcGFyZU9wdGlvbnMob3B0aW9ucy5wb3B1cE9wdGlvbnMpKTtcbiAgICBjb25zdCB3aW5kb3dOYW1lID0gY29yZG92YSA/ICdfYmxhbmsnIDogb3B0aW9ucy5uYW1lO1xuXG4gICAgY29uc3QgcG9wdXBXaW5kb3cgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdy5vcGVuKHVybCwgd2luZG93TmFtZSwgc3RyaW5naWZpZWRPcHRpb25zKSA6IG51bGw7XG5cbiAgICBpZiAocG9wdXBXaW5kb3cpIHtcbiAgICAgIGlmIChwb3B1cFdpbmRvdy5mb2N1cykge1xuICAgICAgICBwb3B1cFdpbmRvdy5mb2N1cygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9mKHBvcHVwV2luZG93KTtcbiAgICB9XG4gICAgcmV0dXJuIGVtcHR5KCk7XG4gIH1cblxuICBwdWJsaWMgd2FpdEZvckNsb3NlKHBvcHVwV2luZG93OiBXaW5kb3csIGNvcmRvdmEgPSB0aGlzLmlzQ29yZG92YUFwcCgpLCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XG4gICAgcmV0dXJuIGNvcmRvdmEgPyB0aGlzLmV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKSA6IHRoaXMucG9sbFBvcHVwKHBvcHVwV2luZG93LCByZWRpcmVjdFVyaSk7XG4gIH1cblxuICBwcml2YXRlIGV2ZW50TGlzdGVuZXIocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xuICAgIGlmICghcG9wdXBXaW5kb3cpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUG9wdXAgd2FzIG5vdCBjcmVhdGVkJyk7XG4gICAgfVxuICAgIHJldHVybiBtZXJnZShcbiAgICAgIGZyb21FdmVudDxFdmVudD4ocG9wdXBXaW5kb3csICdleGl0JykucGlwZShcbiAgICAgICAgZGVsYXkoMTAwKSxcbiAgICAgICAgbWFwKCgpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJyk7XG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgZnJvbUV2ZW50KHBvcHVwV2luZG93LCAnbG9hZHN0YXJ0JylcbiAgICApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKGV2ZW50OiBFdmVudCAmIHsgdXJsOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xuICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50LnVybC5pbmRleE9mKHJlZGlyZWN0VXJpKSAhPT0gMCkge1xuICAgICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBwYXJzZXIuaHJlZiA9IGV2ZW50LnVybDtcblxuICAgICAgICBpZiAocGFyc2VyLnNlYXJjaCB8fCBwYXJzZXIuaGFzaCkge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcGFyc2VyLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcGFyc2VyLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xuXG4gICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcblxuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcG9sbFBvcHVwKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcbiAgICByZXR1cm4gaW50ZXJ2YWwoNTApLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICBpZiAoIXBvcHVwV2luZG93IHx8IHBvcHVwV2luZG93LmNsb3NlZCkge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwb3B1cFdpbmRvd09yaWdpbiA9IGdldFdpbmRvd09yaWdpbihwb3B1cFdpbmRvdyk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHBvcHVwV2luZG93T3JpZ2luICYmXG4gICAgICAgICAgKHJlZGlyZWN0VXJpLmluZGV4T2YocG9wdXBXaW5kb3dPcmlnaW4pID09PSAwIHx8IHBvcHVwV2luZG93T3JpZ2luLmluZGV4T2YocmVkaXJlY3RVcmkpID09PSAwKSAmJlxuICAgICAgICAgIChwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggfHwgcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1tcXC8kXS8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xuICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcbiAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgIH0pLFxuICAgICAgdGFrZSgxKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHByZXBhcmVPcHRpb25zKG9wdGlvbnM/OiBJUG9wdXBPcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgY29uc3Qgd2lkdGggPSBvcHRpb25zLndpZHRoIHx8IDUwMDtcbiAgICBjb25zdCBoZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCA1MDA7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgbGVmdDogd2luZG93LnNjcmVlblggKyAod2luZG93Lm91dGVyV2lkdGggLSB3aWR0aCkgLyAyLFxuICAgICAgdG9wOiB3aW5kb3cuc2NyZWVuWSArICh3aW5kb3cub3V0ZXJIZWlnaHQgLSBoZWlnaHQpIC8gMi41LFxuICAgICAgdG9vbGJhcjogb3B0aW9ucy52aXNpYmxlVG9vbGJhciA/ICd5ZXMnIDogJ25vJyxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdHJpbmdpZnlPcHRpb25zKG9wdGlvbnM6IHsgW2luZGV4OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgbnVsbCB8IHVuZGVmaW5lZCB9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAubWFwKGtleSA9PiAob3B0aW9uc1trZXldID09PSBudWxsIHx8IG9wdGlvbnNba2V5XSA9PT0gdW5kZWZpbmVkID8ga2V5IDoga2V5ICsgJz0nICsgb3B0aW9uc1trZXldKSlcbiAgICAgIC5qb2luKCcsJyk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlUXVlcnlTdHJpbmcoam9pbmVkS2V5VmFsdWU6IHN0cmluZyk6IGFueSB7XG4gICAgbGV0IGtleTtcbiAgICBsZXQgdmFsdWU7XG4gICAgcmV0dXJuIGpvaW5lZEtleVZhbHVlLnNwbGl0KCcmJykucmVkdWNlKFxuICAgICAgKG9iaiwga2V5VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGtleVZhbHVlKSB7XG4gICAgICAgICAgdmFsdWUgPSBrZXlWYWx1ZS5zcGxpdCgnPScpO1xuICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVswXSk7XG4gICAgICAgICAgb2JqW2tleV0gPSB0eXBlb2YgdmFsdWVbMV0gIT09ICd1bmRlZmluZWQnID8gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzFdKSA6IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH0sXG4gICAgICB7fSBhcyB7IFtrOiBzdHJpbmddOiBzdHJpbmcgfCB0cnVlIH1cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0NvcmRvdmFBcHAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBjb3Jkb3ZhID09PSAnb2JqZWN0JyB8fCAoZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gLTEgJiYgZG9jdW1lbnQuVVJMLmluZGV4T2YoJ2h0dHBzOi8vJykgPT09IC0xKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgYnVpbGRRdWVyeVN0cmluZywgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2F1dGgxU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3Qgc2VydmVyVXJsID0gdGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsID8gam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIG9hdXRoT3B0aW9ucy51cmwpIDogb2F1dGhPcHRpb25zLnVybDtcbiAgICByZXR1cm4gdGhpcy5wb3B1cC5vcGVuKCdhYm91dDpibGFuaycsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKHBvcHVwV2luZG93ID0+XG4gICAgICAgIHRoaXMuaHR0cC5wb3N0PG9iamVjdD4oc2VydmVyVXJsLCBvYXV0aE9wdGlvbnMpLnBpcGUoXG4gICAgICAgICAgdGFwKGF1dGhvcml6YXRpb25EYXRhID0+XG4gICAgICAgICAgICBwb3B1cFdpbmRvd1xuICAgICAgICAgICAgICA/IHBvcHVwV2luZG93LmxvY2F0aW9uLnJlcGxhY2UoW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/JykpXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoYXV0aG9yaXphdGlvbkRhdGEgPT5cbiAgICAgICAgICAgIHRoaXMucG9wdXBcbiAgICAgICAgICAgICAgLndhaXRGb3JDbG9zZShwb3B1cFdpbmRvdywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLCBvYXV0aE9wdGlvbnMucmVkaXJlY3RVcmkpXG4gICAgICAgICAgICAgIC5waXBlKG1hcChvYXV0aERhdGEgPT4gKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSkpXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCh7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEgfSkgPT4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpKVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnM6IElPYXV0aDFPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xuICAgIGNvbnN0IGJvZHkgPSB7IG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcbiAgICBjb25zdCB7IHdpdGhDcmVkZW50aWFscywgYmFzZVVybCB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICBjb25zdCB7IG1ldGhvZCA9ICdQT1NUJywgdXJsIH0gPSBvYXV0aE9wdGlvbnM7XG4gICAgY29uc3QgZXhjaGFuZ2VGb3JUb2tlblVybCA9IGJhc2VVcmwgPyBqb2luVXJsKGJhc2VVcmwsIHVybCkgOiB1cmw7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5yZXF1ZXN0PFQ+KG1ldGhvZCwgZXhjaGFuZ2VGb3JUb2tlblVybCwgeyBib2R5LCB3aXRoQ3JlZGVudGlhbHMgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbXB0eSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHN3aXRjaE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElPYXV0aDJPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBnZXRXaW5kb3dPcmlnaW4sIGpvaW5VcmwgfSBmcm9tICcuL3V0aWxzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9hdXRoMlNlcnZpY2UgaW1wbGVtZW50cyBJT2F1dGhTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIHByb3RlY3RlZCBwb3B1cDogUG9wdXBTZXJ2aWNlLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWdTZXJ2aWNlKSB7fVxuXG4gIG9wZW48VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ob2F1dGhPcHRpb25zOiBJT2F1dGgyT3B0aW9ucywgdXNlckRhdGE6IG9iamVjdCk6IE9ic2VydmFibGU8VD4ge1xuICAgIGNvbnN0IGF1dGhvcml6YXRpb25EYXRhID0gdGhpcy5nZXRBdXRob3JpemF0aW9uRGF0YShvYXV0aE9wdGlvbnMpO1xuICAgIGNvbnN0IHVybCA9IFtvYXV0aE9wdGlvbnMuYXV0aG9yaXphdGlvbkVuZHBvaW50LCBidWlsZFF1ZXJ5U3RyaW5nKGF1dGhvcml6YXRpb25EYXRhKV0uam9pbignPycpO1xuICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4odXJsLCBvYXV0aE9wdGlvbnMsIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgod2luZG93PzogV2luZG93KSA9PlxuICAgICAgICB3aW5kb3cgPyB0aGlzLnBvcHVwLndhaXRGb3JDbG9zZSh3aW5kb3csIHRoaXMuY29uZmlnLm9wdGlvbnMuY29yZG92YSwgb2F1dGhPcHRpb25zLnJlZGlyZWN0VXJpKSA6IGVtcHR5KClcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKG9hdXRoRGF0YTogYW55KSA9PiB7XG4gICAgICAgIC8vIHdoZW4gbm8gc2VydmVyIFVSTCBwcm92aWRlZCwgcmV0dXJuIHBvcHVwIHBhcmFtcyBhcy1pcy5cbiAgICAgICAgLy8gdGhpcyBpcyBmb3IgYSBzY2VuYXJpbyB3aGVuIHNvbWVvbmUgd2lzaGVzIHRvIG9wdCBvdXQgZnJvbVxuICAgICAgICAvLyBzYXRlbGxpemVyJ3MgbWFnaWMgYnkgZG9pbmcgYXV0aG9yaXphdGlvbiBjb2RlIGV4Y2hhbmdlIGFuZFxuICAgICAgICAvLyBzYXZpbmcgYSB0b2tlbiBtYW51YWxseS5cbiAgICAgICAgaWYgKG9hdXRoT3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICd0b2tlbicgfHwgIW9hdXRoT3B0aW9ucy51cmwpIHtcbiAgICAgICAgICByZXR1cm4gb2Yob2F1dGhEYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvYXV0aERhdGEuc3RhdGUgJiYgb2F1dGhEYXRhLnN0YXRlICE9PSBhdXRob3JpemF0aW9uRGF0YS5zdGF0ZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignT0F1dGggXCJzdGF0ZVwiIG1pc21hdGNoJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhjaGFuZ2VGb3JUb2tlbjxUPihvYXV0aE9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBleGNoYW5nZUZvclRva2VuPFQ+KG9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YTogb2JqZWN0LCBvYXV0aERhdGE6IG9iamVjdCwgdXNlckRhdGE6IG9iamVjdCkge1xuICAgIGNvbnN0IGJvZHkgPSB7IGF1dGhvcml6YXRpb25EYXRhLCBvYXV0aERhdGEsIHVzZXJEYXRhIH07XG4gICAgY29uc3QgeyBiYXNlVXJsLCB3aXRoQ3JlZGVudGlhbHMgfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XG4gICAgY29uc3QgeyB1cmwsIG1ldGhvZCA9ICdQT1NUJyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBdXRob3JpemF0aW9uRGF0YShvcHRpb25zOiBJT2F1dGgyT3B0aW9ucykge1xuICAgIGNvbnN0IHtcbiAgICAgIHJlc3BvbnNlVHlwZSA9ICdjb2RlJyxcbiAgICAgIGNsaWVudElkLFxuICAgICAgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSB8fCAnJyxcbiAgICAgIHNjb3BlRGVsaW1pdGVyID0gJywnLFxuICAgICAgc2NvcGUsXG4gICAgICBzdGF0ZSxcbiAgICAgIGFkZGl0aW9uYWxVcmxQYXJhbXNcbiAgICB9ID0gb3B0aW9ucztcbiAgICBjb25zdCByZXNvbHZlZFN0YXRlID0gdHlwZW9mIHN0YXRlID09PSAnZnVuY3Rpb24nID8gc3RhdGUoKSA6IHN0YXRlO1xuICAgIHJldHVybiBbXG4gICAgICBbJ3Jlc3BvbnNlX3R5cGUnLCByZXNwb25zZVR5cGVdLFxuICAgICAgWydjbGllbnRfaWQnLCBjbGllbnRJZF0sXG4gICAgICBbJ3JlZGlyZWN0X3VyaScsIHJlZGlyZWN0VXJpXSxcbiAgICAgIC4uLihzdGF0ZSA/IFtbJ3N0YXRlJywgcmVzb2x2ZWRTdGF0ZV1dIDogW10pLFxuICAgICAgLi4uKHNjb3BlID8gW1snc2NvcGUnLCBzY29wZS5qb2luKHNjb3BlRGVsaW1pdGVyKV1dIDogW10pLFxuICAgICAgLi4uKGFkZGl0aW9uYWxVcmxQYXJhbXNcbiAgICAgICAgPyBPYmplY3Qua2V5cyhhZGRpdGlvbmFsVXJsUGFyYW1zKS5tYXAoa2V5ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlOiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKSB8IG51bGwgfCB1bmRlZmluZWQgPSAoYWRkaXRpb25hbFVybFBhcmFtcyBhcyBhbnkpW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFtrZXksIHZhbHVlKCldO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgJyddO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFsnJywgJyddO1xuICAgICAgICAgIH0pXG4gICAgICAgIDogW10pXG4gICAgXVxuICAgICAgLmZpbHRlcihfID0+ICEhX1swXSlcbiAgICAgIC5yZWR1Y2UoKGFjYywgbmV4dCkgPT4gKHsgLi4uYWNjLCBbbmV4dFswXV06IG5leHRbMV0gfSksIHt9IGFzIHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHttYXBUbywgc3dpdGNoTWFwLCBzd2l0Y2hNYXBUbywgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYXV0aDFTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDEuc2VydmljZSc7XG5pbXBvcnQgeyBPYXV0aDJTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aDIuc2VydmljZSc7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSU9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGgtc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYXV0aFNlcnZpY2Uge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVwUHJvdmlkZXJzID0gW1xuICAgIHsgcHJvdmlkZTogSHR0cENsaWVudCwgdXNlVmFsdWU6IHRoaXMuaHR0cCB9LFxuICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5wb3B1cCB9LFxuICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlVmFsdWU6IHRoaXMuY29uZmlnIH1cbiAgXTtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlcHMgPSBbSHR0cENsaWVudCwgUG9wdXBTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXTtcblxuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnU2VydmljZSwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nPihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgcHJvdmlkZXI6IElPYXV0aFNlcnZpY2UgPSB0aGlzLnByb3ZpZGVyT2YobmFtZSk7XG5cbiAgICByZXR1cm4gcHJvdmlkZXIub3BlbjxUPih0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXSwgdXNlckRhdGEgfHwge30pLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocmVzcG9uc2UgPT4ge1xuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXG4gICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxuICAgICAgICBpZiAodGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0udXJsKSB7XG4gICAgICAgICAgcmV0dXJuIGZyb20odGhpcy5zaGFyZWQuc2V0VG9rZW4ocmVzcG9uc2UpKS5waXBlKG1hcFRvKHJlc3BvbnNlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gb2YocmVzcG9uc2UpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIHByb3ZpZGVyT2YobmFtZTogc3RyaW5nKTogSU9hdXRoU2VydmljZSB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLm9hdXRoVHlwZSA9PT0gJzEuMCdcbiAgICAgID8gSW5qZWN0b3IuY3JlYXRlKHsgcHJvdmlkZXJzOiBbLi4udGhpcy5kZXBQcm92aWRlcnMsIHsgcHJvdmlkZTogT2F1dGgxU2VydmljZSwgZGVwczogdGhpcy5kZXBzIH1dIH0pLmdldChPYXV0aDFTZXJ2aWNlKVxuICAgICAgOiBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDJTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0gfSkuZ2V0KE9hdXRoMlNlcnZpY2UpO1xuICB9XG5cbiAgcHVibGljIHVubGluazxUPihwcm92aWRlcjogc3RyaW5nLCB1cmwgPSBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy51bmxpbmtVcmwpLCBtZXRob2QgPSAnUE9TVCcpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCB1cmwsIHsgYm9keTogeyBwcm92aWRlciB9IH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTG9jYWxTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3Q+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgLnBvc3Q8VD4odXJsIHx8IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLmxvZ2luVXJsKSwgdXNlcilcbiAgICAgIC5waXBlKHRhcChkYXRhID0+IHRoaXMuc2hhcmVkLnNldFRva2VuKGRhdGEpKSk7XG4gIH1cblxuICBwdWJsaWMgc2lnbnVwPFQgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0PFQ+KHVybCB8fCBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgdGhpcy5jb25maWcub3B0aW9ucy5zaWdudXBVcmwpLCB1c2VyKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBsb2NhbDogTG9jYWxTZXJ2aWNlLCBwcml2YXRlIG9hdXRoOiBPYXV0aFNlcnZpY2UpIHt9XG5cbiAgcHVibGljIGxvZ2luPFQgZXh0ZW5kcyBzdHJpbmcgfCBvYmplY3QgPSBhbnk+KHVzZXI6IHN0cmluZyB8IG9iamVjdCwgdXJsPzogc3RyaW5nKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMubG9jYWwubG9naW48VD4odXNlciwgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbC5zaWdudXA8VD4odXNlciwgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2dvdXQoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVkLmxvZ291dCgpO1xuICB9XG5cbiAgcHVibGljIGF1dGhlbnRpY2F0ZTxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihuYW1lOiBzdHJpbmcsIHVzZXJEYXRhPzogYW55KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMub2F1dGguYXV0aGVudGljYXRlPFQ+KG5hbWUsIHVzZXJEYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBsaW5rPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xuICB9XG5cbiAgcHVibGljIHVubGluazxUID0gYW55Pihwcm92aWRlcjogc3RyaW5nLCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aC51bmxpbms8VD4ocHJvdmlkZXIsIHVybCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaXNBdXRoZW50aWNhdGVkKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRUb2tlbigpOiBQcm9taXNlPHN0cmluZyB8IG51bGw+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRUb2tlbih0b2tlbjogc3RyaW5nIHwgb2JqZWN0KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zaGFyZWQuc2V0VG9rZW4odG9rZW4pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZVRva2VuKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc2hhcmVkLnJlbW92ZVRva2VuKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0UGF5bG9hZCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5nZXRQYXlsb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5zaGFyZWQuc2V0U3RvcmFnZVR5cGUodHlwZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0RXhwaXJhdGlvbkRhdGUoKTogUHJvbWlzZTxEYXRlIHwgbnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5nZXRFeHBpcmF0aW9uRGF0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudE1vZHVsZSwgSFRUUF9JTlRFUkNFUFRPUlMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJQ29uZmlnT3B0aW9ucywgSVBhcnRpYWxDb25maWdPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDT05GSUdfT1BUSU9OUywgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL3N0b3JhZ2Utc2VydmljZSc7XG5pbXBvcnQgeyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgfSBmcm9tICcuL2Jyb3dzZXItc3RvcmFnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEp3dEludGVyY2VwdG9yIH0gZnJvbSAnLi9pbnRlcmNlcHRvci5zZXJ2aWNlJztcbmltcG9ydCB7IE9hdXRoU2VydmljZSB9IGZyb20gJy4vb2F1dGguc2VydmljZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IExvY2FsU2VydmljZSB9IGZyb20gJy4vbG9jYWwuc2VydmljZSc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW0h0dHBDbGllbnRNb2R1bGVdLFxuICBkZWNsYXJhdGlvbnM6IFtdLFxuICBleHBvcnRzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZzJVaUF1dGhNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWdPcHRpb25zPzogSVBhcnRpYWxDb25maWdPcHRpb25zLCBkZWZhdWx0Snd0SW50ZXJjZXB0b3IgPSB0cnVlKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBOZzJVaUF1dGhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgLi4uKGNvbmZpZ09wdGlvbnMgPyBbeyBwcm92aWRlOiBDT05GSUdfT1BUSU9OUywgdXNlVmFsdWU6IGNvbmZpZ09wdGlvbnMgfV0gOiBbXSksXG4gICAgICAgIHsgcHJvdmlkZTogQ29uZmlnU2VydmljZSwgdXNlQ2xhc3M6IENvbmZpZ1NlcnZpY2UsIGRlcHM6IFtDT05GSUdfT1BUSU9OU10gfSxcbiAgICAgICAgeyBwcm92aWRlOiBTdG9yYWdlU2VydmljZSwgdXNlQ2xhc3M6IEJyb3dzZXJTdG9yYWdlU2VydmljZSwgZGVwczogW0NvbmZpZ1NlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogU2hhcmVkU2VydmljZSwgdXNlQ2xhc3M6IFNoYXJlZFNlcnZpY2UsIGRlcHM6IFtTdG9yYWdlU2VydmljZSwgQ29uZmlnU2VydmljZV0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBMb2NhbFNlcnZpY2UsIHVzZUNsYXNzOiBMb2NhbFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFBvcHVwU2VydmljZSwgdXNlQ2xhc3M6IFBvcHVwU2VydmljZSwgZGVwczogW0NvbmZpZ1NlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogT2F1dGhTZXJ2aWNlLCB1c2VDbGFzczogT2F1dGhTZXJ2aWNlLCBkZXBzOiBbSHR0cENsaWVudCwgU2hhcmVkU2VydmljZSwgQ29uZmlnU2VydmljZSwgUG9wdXBTZXJ2aWNlXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IEF1dGhTZXJ2aWNlLCB1c2VDbGFzczogQXV0aFNlcnZpY2UsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBMb2NhbFNlcnZpY2UsIE9hdXRoU2VydmljZV0gfSxcbiAgICAgICAgLi4uKGRlZmF1bHRKd3RJbnRlcmNlcHRvclxuICAgICAgICAgID8gW3sgcHJvdmlkZTogSFRUUF9JTlRFUkNFUFRPUlMsIHVzZUNsYXNzOiBKd3RJbnRlcmNlcHRvciwgbXVsdGk6IHRydWUsIGRlcHM6IFtTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9XVxuICAgICAgICAgIDogW10pXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl0sIm5hbWVzIjpbIkluamVjdGlvblRva2VuIiwiSW5qZWN0YWJsZSIsIkluamVjdCIsInRzbGliXzEuX19leHRlbmRzIiwiRU1QVFkiLCJPYnNlcnZhYmxlIiwiZnJvbSIsInN3aXRjaE1hcCIsIm9mIiwiZW1wdHkiLCJtZXJnZSIsImZyb21FdmVudCIsImRlbGF5IiwibWFwIiwidGFrZSIsImludGVydmFsIiwidGhyb3dFcnJvciIsImh0dHAiLCJ0YXAiLCJIdHRwQ2xpZW50IiwidHNsaWJfMS5fX3NwcmVhZCIsIm1hcFRvIiwiSW5qZWN0b3IiLCJIVFRQX0lOVEVSQ0VQVE9SUyIsIk5nTW9kdWxlIiwiSHR0cENsaWVudE1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQUE7Ozs7Ozs7Ozs7Ozs7O0lBY0E7SUFFQSxJQUFJLGFBQWEsR0FBRyxVQUFTLENBQUMsRUFBRSxDQUFDO1FBQzdCLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYzthQUNoQyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1RSxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUFFLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0UsT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9CLENBQUMsQ0FBQztBQUVGLGFBQWdCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMxQixhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FB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QUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN4QyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQUMsS0FBSyxDQUFDOzRCQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsTUFBTTt3QkFDOUIsS0FBSyxDQUFDOzRCQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs0QkFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7d0JBQ3hELEtBQUssQ0FBQzs0QkFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRCxLQUFLLENBQUM7NEJBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7NEJBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3dCQUNqRDs0QkFDSSxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FBQyxTQUFTOzZCQUFFOzRCQUM1RyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUN0RixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0NBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQ0FBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FBQyxNQUFNOzZCQUFFOzRCQUNuRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0NBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFDdEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs0QkFBQyxTQUFTO3FCQUM5QjtvQkFDRCxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzlCO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO3dCQUFTO29CQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO1lBQzFELElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO1NBQ3BGO0lBQ0wsQ0FBQztBQUVELGFBZWdCLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxPQUFPLE1BQU0sS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUk7WUFDQSxPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxJQUFJO2dCQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlFO1FBQ0QsT0FBTyxLQUFLLEVBQUU7WUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUM7U0FBRTtnQkFDL0I7WUFDSixJQUFJO2dCQUNBLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7b0JBQ087Z0JBQUUsSUFBSSxDQUFDO29CQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUFFO1NBQ3BDO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0FBRUQsYUFBZ0IsUUFBUTtRQUNwQixLQUFLLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUM5QyxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Ozs7Ozs7Ozs7OztBQ3BJRCxhQUFnQixPQUFPLENBQUMsT0FBZSxFQUFFLEdBQVc7UUFDbEQsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDbEMsT0FBTyxHQUFHLENBQUM7U0FDWjs7WUFFSyxNQUFNLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUV2QyxPQUFPLE1BQU07YUFDVixPQUFPLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQzthQUN0QixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7O0FBRUQsYUFBZ0IsZ0JBQWdCLENBQUMsR0FBVztRQUMxQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ3BCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxRQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQU0sa0JBQWtCLENBQUMsR0FBRyxDQUFDLFNBQUksa0JBQWtCLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFHLEdBQUcsR0FBRyxJQUFDLENBQUM7YUFDN0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2YsQ0FBQzs7Ozs7QUFFRCxhQUFnQixlQUFlLENBQUMsQ0FBVTtRQUN4QyxJQUFJLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtZQUN2QyxDQUFDLEdBQUcsTUFBTSxDQUFDO1NBQ1o7UUFDRCxJQUFJO1lBQ0YsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQ3RCLE9BQVUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLFVBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBRSxDQUFDO2FBQ3hHO1lBQ0QsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztTQUMxQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxJQUFJLENBQUM7OztTQUdiO0lBQ0gsQ0FBQzs7Ozs7O0FDM0NEO0FBR0EsUUFBYSxnQkFBZ0IsR0FBZTtRQUMxQyxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixHQUFHLEVBQUUsZ0JBQWdCO1lBQ3JCLFdBQVcsRUFBSyxlQUFlLEVBQUUsTUFBRztZQUNwQyxxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsbUJBQW1CLEVBQUU7Z0JBQ25CLE9BQU8sRUFBRSxPQUFPO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2hCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLGNBQWM7WUFDbkIscUJBQXFCLEVBQUUsMkNBQTJDO1lBQ2xFLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTztnQkFDaEIsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixXQUFXLEVBQUUsU0FBUztnQkFDdEIsc0JBQXNCLEVBQUUsU0FBUztnQkFDakMsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7WUFDRCxLQUFLLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQztZQUNyQyxjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7WUFDekMsS0FBSyxFQUFFO2dCQUNMLE9BQUEsa0JBQWtCLENBQ2hCLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ1YsUUFBUSxDQUFDLEVBQUUsQ0FBQztxQkFDWixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2I7YUFBQTtTQUNKO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsY0FBYztZQUNuQixxQkFBcUIsRUFBRSwwQ0FBMEM7WUFDakUsS0FBSyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3JCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMzQztRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIscUJBQXFCLEVBQUUsMkNBQTJDO1lBQ2xFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNoQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLEdBQUcsRUFBRSxnQkFBZ0I7WUFDckIscUJBQXFCLEVBQUUsbURBQW1EO1lBQzFFLEtBQUssRUFBRSxDQUFDLGdCQUFnQixDQUFDO1lBQ3pCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUN6QyxLQUFLLEVBQUUsT0FBTztTQUNmO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixxQkFBcUIsRUFBRSw0Q0FBNEM7WUFDbkUsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzFDO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7WUFDZCxHQUFHLEVBQUUsY0FBYztZQUNuQixxQkFBcUIsRUFBRSwrQ0FBK0M7WUFDdEUsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTzthQUNqQjtZQUNELFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELElBQUksRUFBRTtZQUNKLElBQUksRUFBRSxNQUFNO1lBQ1osR0FBRyxFQUFFLFlBQVk7WUFDakIscUJBQXFCLEVBQUUsOENBQThDO1lBQ3JFLG1CQUFtQixFQUFFO2dCQUNuQixPQUFPLEVBQUUsT0FBTzthQUNqQjtZQUNELEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUNwQixjQUFjLEVBQUUsR0FBRztZQUNuQixTQUFTLEVBQUUsS0FBSztZQUNoQixZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUU7U0FDMUM7UUFDRCxLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsT0FBTztZQUNiLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLHFCQUFxQixFQUFFLGlEQUFpRDtZQUN4RSxLQUFLLEVBQUUsRUFBRTtZQUNULGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtTQUMxQztRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxXQUFXO1lBQ2pCLEdBQUcsRUFBRSxpQkFBaUI7WUFDdEIscUJBQXFCLEVBQUUsNkNBQTZDO1lBQ3BFLFdBQVcsRUFBSyxlQUFlLEVBQUUsTUFBRztZQUNwQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDaEIsY0FBYyxFQUFFLEdBQUc7WUFDbkIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsWUFBWSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFO1NBQzNDO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFNBQVM7WUFDZixHQUFHLEVBQUUsZUFBZTtZQUNwQixxQkFBcUIsRUFBRSx3Q0FBd0M7WUFDL0QsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDO1lBQzlCLGNBQWMsRUFBRSxHQUFHO1lBQ25CLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFlBQVksRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRTtZQUN6QyxLQUFLLEVBQUU7Z0JBQ0wsT0FBQSxrQkFBa0IsQ0FDaEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtxQkFDVixRQUFRLENBQUMsRUFBRSxDQUFDO3FCQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDYjthQUFBO1NBQ0o7S0FDRjs7Ozs7Ozs7UUNwSUMsTUFBTyxNQUFNO1FBQ2IsUUFBUyxRQUFRO1FBQ2pCLGVBQWdCLGNBQWM7UUFDOUIsaUJBQWtCLGdCQUFnQjtRQUNsQyxRQUFTLFFBQVE7UUFDakIsZ0JBQWlCLGVBQWU7Ozs7Ozs7O0FDRGxDLFFBQWEsY0FBYyxHQUFHLElBQUlBLG1CQUFjLENBQU0sZ0JBQWdCLENBQUM7QUFDdkU7UUFvREUsdUJBQW9DLE9BQThCO1lBbEQzRCxZQUFPLEdBQUk7Z0JBQ2hCLGVBQWUsRUFBRSxLQUFLO2dCQUN0QixTQUFTLEVBQUUsSUFBSTtnQkFDZixPQUFPLEVBQUUsR0FBRztnQkFDWixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsU0FBUyxFQUFFLGNBQWM7Z0JBQ3pCLFNBQVMsRUFBRSxlQUFlO2dCQUMxQixTQUFTLEVBQUUsT0FBTztnQkFDbEIsZ0JBQWdCLEVBQUUsZUFBZTtnQkFDakMsY0FBYyxFQUFFLEdBQUc7Z0JBQ25CLFdBQVcsRUFBRSxhQUFhO2dCQUMxQixVQUFVLEVBQUUsZUFBZTtnQkFDM0IsU0FBUyxFQUFFLFFBQVE7Z0JBQ25CLFdBQVcsRUFBRSxXQUFXLENBQUMsYUFBYTtnQkFDdEMsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFlBQVksRUFBRSxVQUFDLFFBQWEsRUFBRSxNQUFzQjs7d0JBQzVDLFdBQVcsR0FDZixRQUFRLEtBQUssUUFBUSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUM7b0JBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUU7O3dCQUVoQixPQUFPLElBQUksQ0FBQztxQkFDYjtvQkFDRCxJQUFJLE9BQU8sV0FBVyxLQUFLLFFBQVEsRUFBRTs7OzRCQUU3QixjQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQzt3QkFDdEQsMEJBQWUsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxjQUFZLEVBQUUsR0FBQztxQkFDekU7b0JBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7O3dCQUVuQyxPQUFPLElBQUksQ0FBQztxQkFDYjs7d0JBQ0ssYUFBYSxHQUNqQixNQUFNLENBQUMsU0FBUzt3QkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU07NEJBQ2hELE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUNiLEVBQUUsV0FBVyxDQUFDOzt3QkFDWCxLQUFLLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7O3dCQUN2RixZQUFZLEdBQUcsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO29CQUVsSCxJQUFJLEtBQUssRUFBRTt3QkFDVCwwQkFBZSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxHQUFDO3FCQUNuRTs7O29CQUlELE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELFNBQVMsRUFBRSxFQUFFO2FBQ2QsQ0FBQztZQUdBLElBQUksQ0FBQyxPQUFPLGdCQUNQLElBQUksQ0FBQyxPQUFPLEVBQ1osT0FBTyxDQUNYLENBQUM7WUFDRixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztTQUNsQzs7Ozs7UUFFRCx1Q0FBZTs7OztZQUFmLFVBQWdCLFNBQXFCO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsaUJBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsR0FDN0IsU0FBUyxDQUNiLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7YUFDbEM7Ozs7UUFFRCxpREFBeUI7OztZQUF6QjtnQkFBQSxpQkFTQztnQkFSQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztvQkFDN0MsSUFBSSxHQUFHLElBQUksZ0JBQWdCLEVBQUU7d0JBQzNCLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxnQkFDdEIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEVBQ3JCLEtBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUMvQixDQUFDO3FCQUNIO2lCQUNGLENBQUMsQ0FBQzthQUNKOztvQkE3RUZDLGVBQVU7Ozs7O3dEQW9ESUMsV0FBTSxTQUFDLGNBQWM7OztRQTBCcEMsb0JBQUM7S0E5RUQ7Ozs7Ozs7OztBQ0pBOzs7UUFBQTtTQVFDO1FBQUQscUJBQUM7SUFBRCxDQUFDOzs7Ozs7O1FDSjBDQyx5Q0FBYztRQUl2RCwrQkFBb0IsTUFBcUI7WUFBekMsWUFDRSxpQkFBTyxTQUlSO1lBTG1CLFlBQU0sR0FBTixNQUFNLENBQWU7WUFIakMsV0FBSyxHQUE4QixFQUFFLENBQUM7WUFDdEMsaUJBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1lBSXZDLElBQUksQ0FBQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDdkQsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxDQUFDO2FBQ2pFOztTQUNGOzs7OztRQUVNLGlEQUFpQjs7OztZQUF4QixVQUF5QixXQUF3Qjs7b0JBQ3pDLGtCQUFrQixHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtvQkFDdkIsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7Z0JBQ0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDO2FBQ2I7Ozs7O1FBRVksbUNBQUc7Ozs7WUFBaEIsVUFBaUIsR0FBVzs7O3dCQUMxQixRQUFRLElBQUksQ0FBQyxXQUFXOzRCQUN0QixLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUM7NEJBQ3hCLEtBQUssV0FBVyxDQUFDLGNBQWM7Z0NBQzdCLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDOzRCQUM5QyxLQUFLLFdBQVcsQ0FBQyxhQUFhLENBQUM7NEJBQy9CLEtBQUssV0FBVyxDQUFDLGVBQWU7Z0NBQzlCLHNCQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQzs0QkFDaEUsS0FBSyxXQUFXLENBQUMsTUFBTTtnQ0FDckIsc0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUM7NEJBQzFDLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQzs0QkFDdEI7Z0NBQ0Usc0JBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBQzt5QkFDaEM7Ozs7YUFDRjs7Ozs7OztRQUVZLG1DQUFHOzs7Ozs7WUFBaEIsVUFBaUIsR0FBVyxFQUFFLEtBQWEsRUFBRSxJQUFZOzs7d0JBQ3ZELFFBQVEsSUFBSSxDQUFDLFdBQVc7NEJBQ3RCLEtBQUssV0FBVyxDQUFDLE1BQU0sQ0FBQzs0QkFDeEIsS0FBSyxXQUFXLENBQUMsY0FBYztnQ0FDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7Z0NBQ2hGLE1BQU07NEJBQ1IsS0FBSyxXQUFXLENBQUMsYUFBYSxDQUFDOzRCQUMvQixLQUFLLFdBQVcsQ0FBQyxlQUFlO2dDQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0NBQzdDLE1BQU07NEJBQ1IsS0FBSyxXQUFXLENBQUMsTUFBTTtnQ0FDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0NBQ3hCLE1BQU07NEJBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDOzRCQUN0QjtnQ0FDRSxNQUFNO3lCQUNUOzs7O2FBQ0Y7Ozs7O1FBRVksc0NBQU07Ozs7WUFBbkIsVUFBb0IsR0FBVzs7O3dCQUM3QixRQUFRLElBQUksQ0FBQyxXQUFXOzRCQUN0QixLQUFLLFdBQVcsQ0FBQyxNQUFNLENBQUM7NEJBQ3hCLEtBQUssV0FBVyxDQUFDLGNBQWM7Z0NBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZCLE1BQU07NEJBQ1IsS0FBSyxXQUFXLENBQUMsYUFBYSxDQUFDOzRCQUMvQixLQUFLLFdBQVcsQ0FBQyxlQUFlO2dDQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQ0FDekMsTUFBTTs0QkFDUixLQUFLLFdBQVcsQ0FBQyxNQUFNO2dDQUNyQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0NBQ3ZCLE1BQU07NEJBQ1IsS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDOzRCQUN0QjtnQ0FDRSxNQUFNO3lCQUNUOzs7O2FBQ0Y7Ozs7OztRQUVPLHVEQUF1Qjs7Ozs7WUFBL0IsVUFBZ0MsV0FBd0I7Z0JBQ3RELFFBQVEsV0FBVztvQkFDakIsS0FBSyxXQUFXLENBQUMsTUFBTSxDQUFDO29CQUN4QixLQUFLLFdBQVcsQ0FBQyxjQUFjO3dCQUM3QixPQUFPLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO29CQUN6QyxLQUFLLFdBQVcsQ0FBQyxhQUFhLENBQUM7b0JBQy9CLEtBQUssV0FBVyxDQUFDLGVBQWU7d0JBQzlCLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUM7b0JBQ3RCLEtBQUssV0FBVyxDQUFDLE1BQU07d0JBQ3JCLE9BQU8sSUFBSSxDQUFDO29CQUNkO3dCQUNFLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjthQUNGOzs7Ozs7UUFFTyx3REFBd0I7Ozs7O1lBQWhDLFVBQWlDLFdBQW9FO2dCQUNuRyxJQUFJOzt3QkFDSSxTQUFTLEdBQUcsTUFBTSxJQUFJLFdBQVcsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUk7b0JBRWpGLElBQUksU0FBUyxFQUFFOzs0QkFDUCxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTs2QkFDdEIsUUFBUSxDQUFDLEVBQUUsQ0FBQzs2QkFDWixTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUNmLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUNyQztvQkFFRCxPQUFPLFNBQVMsQ0FBQztpQkFDbEI7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1YsT0FBTyxLQUFLLENBQUM7aUJBQ2Q7YUFDRjs7Ozs7UUFFTyx3REFBd0I7Ozs7WUFBaEM7Z0JBQ0UsSUFBSTs7d0JBQ0ksU0FBUyxHQUFHLFFBQVEsSUFBSSxRQUFRLElBQUksUUFBUTtvQkFFbEQsSUFBSSxTQUFTLEVBQUU7OzRCQUNQLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFOzZCQUN0QixRQUFRLENBQUMsRUFBRSxDQUFDOzZCQUNaLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzs7NEJBQ3RFLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQzt3QkFDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDdkIsT0FBTyxLQUFLLEtBQUssTUFBTSxDQUFDO3FCQUN6QjtvQkFDRCxPQUFPLEtBQUssQ0FBQztpQkFDZDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixPQUFPLEtBQUssQ0FBQztpQkFDZDthQUNGOzs7Ozs7Ozs7UUFFTyx5Q0FBUzs7Ozs7Ozs7WUFBakIsVUFBa0IsR0FBVyxFQUFFLEtBQWEsRUFBRSxPQUFZLEVBQUUsSUFBVTtnQkFBeEIsd0JBQUE7b0JBQUEsWUFBWTs7Z0JBQUUscUJBQUE7b0JBQUEsVUFBVTs7Z0JBQ3BFLFFBQVEsQ0FBQyxNQUFNLEdBQU0sR0FBRyxTQUFJLEtBQUssSUFBRyxPQUFPLEdBQUcsZUFBYSxPQUFTLEdBQUcsRUFBRSxnQkFBVSxJQUFNLENBQUM7YUFDM0Y7Ozs7Ozs7UUFFTyw0Q0FBWTs7Ozs7O1lBQXBCLFVBQXFCLEdBQVcsRUFBRSxJQUFVO2dCQUFWLHFCQUFBO29CQUFBLFVBQVU7O2dCQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDMUQ7Ozs7OztRQUVPLHlDQUFTOzs7OztZQUFqQixVQUFrQixHQUFXO2dCQUMzQixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksTUFBTSxDQUFDLHFCQUFtQixHQUFHLGdDQUE2QixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdkc7O29CQTFJRkYsZUFBVTs7Ozs7d0JBRkYsYUFBYTs7O1FBNkl0Qiw0QkFBQztLQUFBLENBMUkwQyxjQUFjOzs7Ozs7QUNOekQ7UUFHQTtTQU9DOzs7Ozs7UUFKQyxpREFBbUI7Ozs7O1lBQW5CLFVBQXFELFlBQW9CO2dCQUN2RSxPQUFPRyxVQUFLLENBQUM7YUFDZDs7b0JBTEZILGVBQVU7O1FBT1gsMEJBQUM7S0FQRDs7Ozs7OztRQ2VFLHVCQUFvQixPQUF1QixFQUFVLE1BQXFCLEVBQVUsbUJBQXdDO1lBQXhHLFlBQU8sR0FBUCxPQUFPLENBQWdCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFVLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7WUFSckgsY0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7a0JBQzlDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7a0JBQ3pHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUMzQixxQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO2tCQUNyRCxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUM7a0JBQ2hILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDO1NBR3VGOzs7O1FBRW5ILHVDQUFlOzs7WUFBNUI7Ozs7b0NBQ1MscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUE7b0NBQXBELHNCQUFPLFNBQTZDLEVBQUM7Ozs7YUFDdEQ7Ozs7UUFFWSxnQ0FBUTs7O1lBQXJCOzs7O29DQUNTLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTtvQ0FBN0Msc0JBQU8sU0FBc0MsRUFBQzs7OzthQUMvQzs7Ozs7UUFFWSxrQ0FBVTs7OztZQUF2QixVQUF3QixLQUFjOzs7Ozs7cUNBQ2hDLENBQUMsS0FBSztvQ0FBTix3QkFBTTtnQ0FDQSxxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7O2dDQUE3QixLQUFLLEdBQUcsU0FBcUIsQ0FBQzs7O2dDQUdoQyxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7b0NBQzFDLElBQUk7d0NBQ0ksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUMvQixNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUM7d0NBQzlELHNCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUM7cUNBQ2xEO29DQUFDLE9BQU8sQ0FBQyxFQUFFO3dDQUNWLHNCQUFPLFNBQVMsRUFBQztxQ0FDbEI7aUNBQ0Y7Ozs7O2FBQ0Y7Ozs7O1FBRVksZ0NBQVE7Ozs7WUFBckIsVUFBc0IsUUFBeUI7Ozs7OztnQ0FDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRTs7b0NBRWIsc0JBQU8sSUFBSSxFQUFDO2lDQUNiO2dDQUdELElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO29DQUNoQyxNQUFNLEdBQUcsRUFBQyxXQUFXLEVBQUUsUUFBUSxFQUFDLENBQUM7aUNBQ2xDO3FDQUFNO29DQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7aUNBQzFFO3FDQUVHLE1BQU0sQ0FBQyxXQUFXO29DQUFsQix3QkFBa0I7Z0NBQ0oscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQTs7Z0NBQTFELE9BQU8sR0FBRyxTQUFnRDtnQ0FDaEUscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUE7O2dDQUFoRyxTQUFnRyxDQUFDOzs7cUNBRy9GLE1BQU0sQ0FBQyxZQUFZO29DQUFuQix3QkFBbUI7Z0NBQ0wscUJBQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBQTs7Z0NBQTNELE9BQU8sR0FBRyxTQUFpRDtnQ0FDakUscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBQTs7Z0NBQXhHLFNBQXdHLENBQUM7O29DQUczRyxzQkFBTyxNQUFNLEVBQUM7Ozs7YUFDZjs7OztRQUVZLG1DQUFXOzs7WUFBeEI7Ozs7b0NBQ0UscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFBOztnQ0FBekMsU0FBeUMsQ0FBQzs7Ozs7YUFDM0M7Ozs7O1FBRVksdUNBQWU7Ozs7WUFBNUIsVUFBNkIsS0FBYzs7Ozs7O3FDQUNyQyxDQUFDLEtBQUs7b0NBQU4sd0JBQU07Z0NBQ0EscUJBQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFBOztnQ0FBN0IsS0FBSyxHQUFHLFNBQXFCLENBQUM7OztxQ0FJNUIsS0FBSztvQ0FBTCx5QkFBSztnQ0FDUCxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7b0NBQzVCLHNCQUFPLElBQUksRUFBQztpQ0FDYjtnQ0FFb0IscUJBQU0sSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFBOztnQ0FBM0MsWUFBWSxHQUFHLFNBQTRCO3FDQUM3QyxZQUFZO29DQUFaLHdCQUFZO3FDQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDO29DQUEvQix3QkFBK0I7Z0NBQ2hCLHFCQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBQTs7Z0NBQXZGLFFBQVEsR0FBRyxTQUE0RTtnQ0FDOUUscUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBQTs7Z0NBQXRDLE1BQU0sR0FBRyxTQUE2QjtnQ0FFNUMsc0JBQU8sTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFDO29DQUd6RCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBQTs7Z0NBQWhELFNBQWdELENBQUM7O29DQUduRCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUE7O2dDQUF6QyxTQUF5QyxDQUFDOztxQ0FHNUMsc0JBQU8sS0FBSyxFQUFDOzs7O2FBQ2Q7Ozs7O1FBRUQsb0NBQVk7Ozs7WUFBWixVQUFhLEtBQWE7O2dCQUV4QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTs7b0JBRWpDLElBQUk7OzRCQUNJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7NEJBQy9CLE1BQU0sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQzs7NEJBQ3hELEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUc7O3dCQUV6RCxJQUFJLEdBQUcsRUFBRTs7Z0NBQ0QsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHOzRCQUNoRSxPQUFPLENBQUMsU0FBUyxDQUFDO3lCQUNuQjtxQkFDRjtvQkFBQyxPQUFPLENBQUMsRUFBRTs7d0JBRVYsT0FBTyxJQUFJLENBQUM7cUJBQ2I7aUJBQ0Y7O2dCQUVELE9BQU8sSUFBSSxDQUFDO2FBQ2I7Ozs7O1FBRVkseUNBQWlCOzs7O1lBQTlCLFVBQStCLEtBQWM7Ozs7OztxQ0FDdkMsQ0FBQyxLQUFLO29DQUFOLHdCQUFNO2dDQUNBLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7Z0NBQTdCLEtBQUssR0FBRyxTQUFxQixDQUFDOztvQ0FHaEIscUJBQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQTs7Z0NBQXRDLE9BQU8sR0FBRyxTQUE0QjtnQ0FDNUMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRTtvQ0FDN0UsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FDeEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0NBQ2hDLHNCQUFPLElBQUksRUFBQztpQ0FDYjtnQ0FDRCxzQkFBTyxJQUFJLEVBQUM7Ozs7YUFDYjs7OztRQUVNLDhCQUFNOzs7WUFBYjtnQkFBQSxpQkFNQztnQkFMQyxPQUFPSSxlQUFVLENBQUMsTUFBTSxDQUFDLFVBQU8sUUFBeUI7Ozs7d0NBQ3ZELHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBQTs7b0NBQXpDLFNBQXlDLENBQUM7b0NBQzFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQ0FDaEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDOzs7OztpQkFDckIsQ0FBQyxDQUFDO2FBQ0o7Ozs7O1FBRU0sc0NBQWM7Ozs7WUFBckIsVUFBc0IsSUFBaUI7Z0JBQ3JDLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM3Qzs7Ozs7O1FBRU8sd0NBQWdCOzs7OztZQUF4QixVQUF5QixHQUFHO2dCQUMxQixPQUFPLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3JJOztvQkFqSkZKLGVBQVU7Ozs7O3dCQUxGLGNBQWM7d0JBQ2QsYUFBYTt3QkFFZCxtQkFBbUI7OztRQW9KM0Isb0JBQUM7S0FsSkQ7Ozs7OztBQ1JBO1FBU0Usd0JBQW9CLE1BQXFCLEVBQVUsTUFBcUI7WUFBcEQsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7U0FBSTs7Ozs7O1FBRTVFLGtDQUFTOzs7OztZQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtnQkFDMUMsSUFBQSx3QkFBK0MsRUFBN0MsMEJBQVUsRUFBRSx3QkFBaUM7Z0JBRXJELE9BQU9LLFNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDOUUsSUFBSSxDQUNIQyxtQkFBUyxDQUFDLFVBQUMsSUFBSTs7O3dCQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOzt3QkFDZixlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7d0JBRXpCLE1BQU0sR0FDVixlQUFlLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUMsVUFBVSxZQUFHLEdBQUMsVUFBVSxJQUFNLFNBQVMsU0FBSSxLQUFPLEtBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRztvQkFDMUgsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM1QixDQUFDLENBQ0gsQ0FBQzthQUNMOztvQkFsQkZOLGVBQVU7Ozs7O3dCQUxGLGFBQWE7d0JBQ2IsYUFBYTs7O1FBdUJ0QixxQkFBQztLQW5CRDs7Ozs7OztRQ0NBO1NBeUlDOzs7Ozs7O1FBdklRLDJCQUFJOzs7Ozs7WUFBWCxVQUFZLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQTZCO2dCQUE3Qix3QkFBQTtvQkFBQSxVQUFVLElBQUksQ0FBQyxZQUFZLEVBQUU7OztvQkFDeEYsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDOztvQkFDckYsVUFBVSxHQUFHLE9BQU8sR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLElBQUk7O29CQUU5QyxXQUFXLEdBQUcsT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxHQUFHLElBQUk7Z0JBRTNHLElBQUksV0FBVyxFQUFFO29CQUNmLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTt3QkFDckIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO3FCQUNyQjtvQkFDRCxPQUFPTyxPQUFFLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ3hCO2dCQUNELE9BQU9DLFVBQUssRUFBRSxDQUFDO2FBQ2hCOzs7Ozs7O1FBRU0sbUNBQVk7Ozs7OztZQUFuQixVQUFvQixXQUFtQixFQUFFLE9BQTZCLEVBQUUsV0FBK0I7Z0JBQTlELHdCQUFBO29CQUFBLFVBQVUsSUFBSSxDQUFDLFlBQVksRUFBRTs7Z0JBQUUsNEJBQUE7b0JBQUEsY0FBYyxlQUFlLEVBQUU7O2dCQUNyRyxPQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQzthQUMxRzs7Ozs7OztRQUVPLG9DQUFhOzs7Ozs7WUFBckIsVUFBc0IsV0FBbUIsRUFBRSxXQUErQjtnQkFBMUUsaUJBMkNDO2dCQTNDMEMsNEJBQUE7b0JBQUEsY0FBYyxlQUFlLEVBQUU7O2dCQUN4RSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7aUJBQzFDO2dCQUNELE9BQU9DLFVBQUssQ0FDVkMsY0FBUyxDQUFRLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQ3hDQyxlQUFLLENBQUMsR0FBRyxDQUFDLEVBQ1ZDLGFBQUcsQ0FBQztvQkFDRixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7aUJBQzVDLENBQUMsQ0FDSCxFQUNERixjQUFTLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUNwQyxDQUFDLElBQUksQ0FDSkosbUJBQVMsQ0FBQyxVQUFDLEtBQThCO29CQUN2QyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEVBQUU7d0JBQ3RDLE9BQU9GLGVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO3FCQUMvRDtvQkFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTt3QkFDeEMsT0FBT0ksVUFBSyxFQUFFLENBQUM7cUJBQ2hCOzt3QkFFSyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7b0JBQzFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFFeEIsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7OzRCQUMxQixXQUFXLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7OzRCQUMzRCxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7OzRCQUN4RCxJQUFJLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQzs7NEJBQ3hDLEVBQUUsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDOzs0QkFDdkMsU0FBUyxnQkFBUSxFQUFFLEVBQUssSUFBSSxDQUFFO3dCQUVwQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBRXBCLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTs0QkFDbkIsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUN2Qjs2QkFBTTs0QkFDTCxPQUFPRCxPQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGO29CQUNELE9BQU9DLFVBQUssRUFBRSxDQUFDO2lCQUNoQixDQUFDLEVBQ0ZLLGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO2FBQ0g7Ozs7Ozs7UUFFTyxnQ0FBUzs7Ozs7O1lBQWpCLFVBQWtCLFdBQW1CLEVBQUUsV0FBK0I7Z0JBQXRFLGlCQThCQztnQkE5QnNDLDRCQUFBO29CQUFBLGNBQWMsZUFBZSxFQUFFOztnQkFDcEUsT0FBT0MsYUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDdEJSLG1CQUFTLENBQUM7b0JBQ1IsSUFBSSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO3dCQUN0QyxPQUFPUyxlQUFVLENBQUMsSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO3FCQUN6RDs7d0JBRUssaUJBQWlCLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQztvQkFFdEQsSUFDRSxpQkFBaUI7eUJBQ2hCLFdBQVcsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDN0YsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDMUQ7OzRCQUNNLFdBQVcsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7OzRCQUN6RSxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDOzs0QkFDeEUsSUFBSSxHQUFHLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7OzRCQUN4QyxFQUFFLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQzt3QkFDN0MsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDOzs0QkFDZCxTQUFTLGdCQUFRLEVBQUUsRUFBSyxJQUFJLENBQUU7d0JBQ3BDLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTs0QkFDbkIsTUFBTSxTQUFTLENBQUMsS0FBSyxDQUFDO3lCQUN2Qjs2QkFBTTs0QkFDTCxPQUFPUixPQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGO29CQUNELE9BQU9DLFVBQUssRUFBRSxDQUFDO2lCQUNoQixDQUFDLEVBQ0ZLLGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FDUixDQUFDO2FBQ0g7Ozs7OztRQUVPLHFDQUFjOzs7OztZQUF0QixVQUF1QixPQUF1QjtnQkFDNUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7O29CQUNsQixLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHOztvQkFDNUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRztnQkFDcEMsa0JBQ0UsS0FBSyxPQUFBO29CQUNMLE1BQU0sUUFBQSxFQUNOLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxLQUFLLElBQUksQ0FBQyxFQUN0RCxHQUFHLEVBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLEdBQUcsRUFDekQsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLEdBQUcsS0FBSyxHQUFHLElBQUksSUFDM0MsT0FBTyxFQUNWO2FBQ0g7Ozs7OztRQUVPLHVDQUFnQjs7Ozs7WUFBeEIsVUFBeUIsT0FBMEU7Z0JBQ2pHLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQ3hCLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxRQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUMsQ0FBQztxQkFDbEcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7Ozs7OztRQUVPLHVDQUFnQjs7Ozs7WUFBeEIsVUFBeUIsY0FBc0I7O29CQUN6QyxHQUFHOztvQkFDSCxLQUFLO2dCQUNULE9BQU8sY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQ3JDLFVBQUMsR0FBRyxFQUFFLFFBQVE7b0JBQ1osSUFBSSxRQUFRLEVBQUU7d0JBQ1osS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzVCLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7cUJBQ2xGO29CQUNELE9BQU8sR0FBRyxDQUFDO2lCQUNaLHFCQUNELEVBQUUsR0FDSCxDQUFDO2FBQ0g7Ozs7O1FBRU8sbUNBQVk7Ozs7WUFBcEI7Z0JBQ0UsT0FBTyxPQUFPLE9BQU8sS0FBSyxRQUFRLEtBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMzSDs7b0JBeElGYixlQUFVOztRQXlJWCxtQkFBQztLQXpJRDs7Ozs7O0FDUkE7UUFZRSx1QkFBc0JnQixPQUFnQixFQUFZLEtBQW1CLEVBQVksTUFBcUI7WUFBaEYsU0FBSSxHQUFKQSxPQUFJLENBQVk7WUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFjO1lBQVksV0FBTSxHQUFOLE1BQU0sQ0FBZTtTQUFJOzs7Ozs7O1FBRTFHLDRCQUFJOzs7Ozs7WUFBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO2dCQUFwRixpQkFtQkM7O29CQWxCTyxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxHQUFHO2dCQUN6SCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNuRlYsbUJBQVMsQ0FBQyxVQUFBLFdBQVc7b0JBQ25CLE9BQUEsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQVMsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FDbERXLGFBQUcsQ0FBQyxVQUFBLGlCQUFpQjt3QkFDbkIsT0FBQSxXQUFXOzhCQUNQLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7OEJBQ2pILFNBQVM7cUJBQUEsQ0FDZCxFQUNEWCxtQkFBUyxDQUFDLFVBQUEsaUJBQWlCO3dCQUN6QixPQUFBLEtBQUksQ0FBQyxLQUFLOzZCQUNQLFlBQVksQ0FBQyxXQUFXLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUM7NkJBQ2hGLElBQUksQ0FBQ00sYUFBRyxDQUFDLFVBQUEsU0FBUyxJQUFJLFFBQUMsRUFBRSxpQkFBaUIsbUJBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxJQUFDLENBQUMsQ0FBQztxQkFBQSxDQUM5RCxDQUNGO2lCQUFBLENBQ0YsRUFDRE4sbUJBQVMsQ0FBQyxVQUFDLEVBQWdDO3dCQUE5Qix3Q0FBaUIsRUFBRSx3QkFBUztvQkFBTyxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBSSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQztpQkFBQSxDQUFDLENBQ2hJLENBQUM7YUFDSDs7Ozs7Ozs7OztRQUVTLHdDQUFnQjs7Ozs7Ozs7O1lBQTFCLFVBQThCLFlBQTRCLEVBQUUsaUJBQXlCLEVBQUUsU0FBaUIsRUFBRSxRQUFnQjs7b0JBQ2xILElBQUksR0FBRyxFQUFFLFlBQVksY0FBQSxFQUFFLGlCQUFpQixtQkFBQSxFQUFFLFNBQVMsV0FBQSxFQUFFLFFBQVEsVUFBQSxFQUFFO2dCQUMvRCxJQUFBLHdCQUFrRCxFQUFoRCxvQ0FBZSxFQUFFLG9CQUErQjtnQkFDaEQsSUFBQSx3QkFBZSxFQUFmLG9DQUFlLEVBQUUsc0JBQUc7O29CQUN0QixtQkFBbUIsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHO2dCQUNqRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFJLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxFQUFFLElBQUksTUFBQSxFQUFFLGVBQWUsaUJBQUEsRUFBRSxDQUFDLENBQUM7YUFDckY7O29CQS9CRk4sZUFBVTs7Ozs7d0JBVkZrQixlQUFVO3dCQU9WLFlBQVk7d0JBRlosYUFBYTs7O1FBcUN0QixvQkFBQztLQWhDRDs7Ozs7OztRQ0VFLHVCQUFzQkYsT0FBZ0IsRUFBWSxLQUFtQixFQUFZLE1BQXFCO1lBQWhGLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVksVUFBSyxHQUFMLEtBQUssQ0FBYztZQUFZLFdBQU0sR0FBTixNQUFNLENBQWU7U0FBSTs7Ozs7OztRQUUxRyw0QkFBSTs7Ozs7O1lBQUosVUFBc0MsWUFBNEIsRUFBRSxRQUFnQjtnQkFBcEYsaUJBc0JDOztvQkFyQk8saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQzs7b0JBQzNELEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDL0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDekVWLG1CQUFTLENBQUMsVUFBQyxNQUFlO29CQUN4QixPQUFBLE1BQU0sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBR0UsVUFBSyxFQUFFO2lCQUFBLENBQzFHLEVBQ0RGLG1CQUFTLENBQUMsVUFBQyxTQUFjOzs7OztvQkFLdkIsSUFBSSxZQUFZLENBQUMsWUFBWSxLQUFLLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7d0JBQzlELE9BQU9DLE9BQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDdEI7b0JBRUQsSUFBSSxTQUFTLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxLQUFLLEtBQUssaUJBQWlCLENBQUMsS0FBSyxFQUFFO3dCQUNsRSxNQUFNLElBQUksS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7cUJBQzNDO29CQUNELE9BQU8sS0FBSSxDQUFDLGdCQUFnQixDQUFJLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3ZGLENBQUMsQ0FDSCxDQUFDO2FBQ0g7Ozs7Ozs7Ozs7UUFFUyx3Q0FBZ0I7Ozs7Ozs7OztZQUExQixVQUE4QixPQUF1QixFQUFFLGlCQUF5QixFQUFFLFNBQWlCLEVBQUUsUUFBZ0I7O29CQUM3RyxJQUFJLEdBQUcsRUFBRSxpQkFBaUIsbUJBQUEsRUFBRSxTQUFTLFdBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRTtnQkFDakQsSUFBQSx3QkFBa0QsRUFBaEQsb0JBQU8sRUFBRSxvQ0FBdUM7Z0JBQ2hELElBQUEsaUJBQUcsRUFBRSxtQkFBZSxFQUFmLG9DQUFlOztvQkFDdEIsbUJBQW1CLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRztnQkFDakUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBSSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsRUFBRSxJQUFJLE1BQUEsRUFBRSxlQUFlLGlCQUFBLEVBQUUsQ0FBQyxDQUFDO2FBQ3JGOzs7Ozs7UUFFUyw0Q0FBb0I7Ozs7O1lBQTlCLFVBQStCLE9BQXVCO2dCQUVsRCxJQUFBLHlCQUFxQixFQUFyQiwwQ0FBcUIsRUFDckIsMkJBQVEsRUFDUix3QkFBcUMsRUFBckMsMERBQXFDLEVBQ3JDLDJCQUFvQixFQUFwQix5Q0FBb0IsRUFDcEIscUJBQUssRUFDTCxxQkFBSyxFQUNMLGlEQUFtQjs7b0JBRWYsYUFBYSxHQUFHLE9BQU8sS0FBSyxLQUFLLFVBQVUsR0FBRyxLQUFLLEVBQUUsR0FBRyxLQUFLO2dCQUNuRSxPQUFPWTtvQkFDTCxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUM7b0JBQy9CLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQztvQkFDdkIsQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDO29CQUN6QixLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFDdkMsS0FBSyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUNwRCxtQkFBbUI7c0JBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHOzs0QkFDaEMsS0FBSyxHQUErQyxvQkFBQyxtQkFBbUIsSUFBUyxHQUFHLENBQUM7d0JBQzNGLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUNyQjs2QkFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsRUFBRTs0QkFDdEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO3lCQUN2Qjs2QkFBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7NEJBQ3pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7eUJBQ2xCO3dCQUNELE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQ2pCLENBQUM7c0JBQ0YsRUFBRSxHQUVMLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUEsQ0FBQztxQkFDbkIsTUFBTSxDQUFDLFVBQUMsR0FBRyxFQUFFLElBQUk7O29CQUFLLHFCQUFNLEdBQUcsZUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFBRyxxQkFBRSxFQUFFLEdBQThCLENBQUM7YUFDN0Y7O29CQXJFRm5CLGVBQVU7Ozs7O3dCQVZGa0IsZUFBVTt3QkFPVixZQUFZO3dCQUZaLGFBQWE7OztRQTJFdEIsb0JBQUM7S0F0RUQ7Ozs7Ozs7UUNXRSxzQkFBc0JGLE9BQWdCLEVBQVksTUFBcUIsRUFBWSxNQUFxQixFQUFZLEtBQW1CO1lBQWpILFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVksV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFZLFdBQU0sR0FBTixNQUFNLENBQWU7WUFBWSxVQUFLLEdBQUwsS0FBSyxDQUFjO1lBUHBILGlCQUFZLEdBQUc7Z0JBQ2hDLEVBQUUsT0FBTyxFQUFFRSxlQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDL0MsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFO2FBQ2xELENBQUM7WUFDaUIsU0FBSSxHQUFHLENBQUNBLGVBQVUsRUFBRSxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FFdUU7Ozs7Ozs7UUFFcEksbUNBQVk7Ozs7OztZQUFuQixVQUErQyxJQUFZLEVBQUUsUUFBYztnQkFBM0UsaUJBZUM7O29CQWRPLFFBQVEsR0FBa0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBRXJELE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDL0VaLG1CQUFTLENBQUMsVUFBQSxRQUFROzs7O29CQUloQixJQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUU7d0JBQzNDLE9BQU9ELFNBQUksQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQ2UsZUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7cUJBQ25FO29CQUVELE9BQU9iLE9BQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDckIsQ0FBQyxDQUNILENBQUM7YUFDSDs7Ozs7O1FBRVMsaUNBQVU7Ozs7O1lBQXBCLFVBQXFCLElBQVk7Z0JBQy9CLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsS0FBSyxLQUFLO3NCQUMxRGMsYUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFNBQVMsV0FBTSxJQUFJLENBQUMsWUFBWSxHQUFFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7c0JBQ3RIQSxhQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxXQUFNLElBQUksQ0FBQyxZQUFZLEdBQUUsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzVIOzs7Ozs7OztRQUVNLDZCQUFNOzs7Ozs7O1lBQWIsVUFBaUIsUUFBZ0IsRUFBRSxHQUF5RSxFQUFFLE1BQWU7Z0JBQTFGLG9CQUFBO29CQUFBLE1BQU0sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7O2dCQUFFLHVCQUFBO29CQUFBLGVBQWU7O2dCQUMzSCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFJLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxRQUFRLFVBQUEsRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNsRTs7b0JBcENGckIsZUFBVTs7Ozs7d0JBSEZrQixlQUFVO3dCQURWLGFBQWE7d0JBRGIsYUFBYTt3QkFEYixZQUFZOzs7UUEyQ3JCLG1CQUFDO0tBckNEOzs7Ozs7QUNaQTtRQVVFLHNCQUFvQkYsT0FBZ0IsRUFBVSxNQUFxQixFQUFVLE1BQXFCO1lBQTlFLFNBQUksR0FBSkEsT0FBSSxDQUFZO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7U0FBSTs7Ozs7OztRQUUvRiw0QkFBSzs7Ozs7O1lBQVosVUFBd0MsSUFBcUIsRUFBRSxHQUFZO2dCQUEzRSxpQkFJQztnQkFIQyxPQUFPLElBQUksQ0FBQyxJQUFJO3FCQUNiLElBQUksQ0FBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUM7cUJBQ3hGLElBQUksQ0FBQ0MsYUFBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUEsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7Ozs7Ozs7UUFFTSw2QkFBTTs7Ozs7O1lBQWIsVUFBdUIsSUFBcUIsRUFBRSxHQUFZO2dCQUN4RCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzVHOztvQkFaRmpCLGVBQVU7Ozs7O3dCQVBGa0IsZUFBVTt3QkFDVixhQUFhO3dCQUNiLGFBQWE7OztRQWtCdEIsbUJBQUM7S0FiRDs7Ozs7OztRQ0NFLHFCQUFvQixNQUFxQixFQUFVLEtBQW1CLEVBQVUsS0FBbUI7WUFBL0UsV0FBTSxHQUFOLE1BQU0sQ0FBZTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWM7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFjO1NBQUk7Ozs7Ozs7UUFFaEcsMkJBQUs7Ozs7OztZQUFaLFVBQThDLElBQXFCLEVBQUUsR0FBWTtnQkFDL0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBSSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDdkM7Ozs7Ozs7UUFFTSw0QkFBTTs7Ozs7O1lBQWIsVUFBdUIsSUFBcUIsRUFBRSxHQUFZO2dCQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN4Qzs7OztRQUVNLDRCQUFNOzs7WUFBYjtnQkFDRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDN0I7Ozs7Ozs7UUFFTSxrQ0FBWTs7Ozs7O1lBQW5CLFVBQXFELElBQVksRUFBRSxRQUFjO2dCQUMvRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFJLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQzthQUNuRDs7Ozs7OztRQUVNLDBCQUFJOzs7Ozs7WUFBWCxVQUE2QyxJQUFZLEVBQUUsUUFBYztnQkFDdkUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBSSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDbkQ7Ozs7Ozs7UUFFTSw0QkFBTTs7Ozs7O1lBQWIsVUFBdUIsUUFBZ0IsRUFBRSxHQUFZO2dCQUNuRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFJLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUM1Qzs7OztRQUVZLHFDQUFlOzs7WUFBNUI7Ozs7b0NBQ1MscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBQTtvQ0FBMUMsc0JBQU8sU0FBbUMsRUFBQzs7OzthQUM1Qzs7OztRQUVZLDhCQUFROzs7WUFBckI7Ozs7b0NBQ1MscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBQTtvQ0FBbkMsc0JBQU8sU0FBNEIsRUFBQzs7OzthQUNyQzs7Ozs7UUFFWSw4QkFBUTs7OztZQUFyQixVQUFzQixLQUFzQjs7OztvQ0FDMUMscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUE7O2dDQUFqQyxTQUFpQyxDQUFDOzs7OzthQUNuQzs7OztRQUVZLGlDQUFXOzs7WUFBeEI7Ozs7b0NBQ0UscUJBQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsRUFBQTs7Z0NBQS9CLFNBQStCLENBQUM7Ozs7O2FBQ2pDOzs7O1FBRVksZ0NBQVU7OztZQUF2Qjs7OztvQ0FDUyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFBO29DQUFyQyxzQkFBTyxTQUE4QixFQUFDOzs7O2FBQ3ZDOzs7OztRQUVZLG9DQUFjOzs7O1lBQTNCLFVBQTRCLElBQWlCOzs7O29DQUNwQyxxQkFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBQTtvQ0FBN0Msc0JBQU8sU0FBc0MsRUFBQzs7OzthQUMvQzs7OztRQUVZLHVDQUFpQjs7O1lBQTlCOzs7O29DQUNTLHFCQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBQTtvQ0FBNUMsc0JBQU8sU0FBcUMsRUFBQzs7OzthQUM5Qzs7b0JBdERGbEIsZUFBVTs7Ozs7d0JBSEYsYUFBYTt3QkFGYixZQUFZO3dCQUNaLFlBQVk7OztRQTJEckIsa0JBQUM7S0F2REQ7Ozs7Ozs7UUNPQTtTQXdCQzs7Ozs7O1FBbEJRLHVCQUFPOzs7OztZQUFkLFVBQWUsYUFBcUMsRUFBRSxxQkFBNEI7Z0JBQTVCLHNDQUFBO29CQUFBLDRCQUE0Qjs7Z0JBQ2hGLE9BQU87b0JBQ0wsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFNBQVMsWUFDSCxhQUFhLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxDQUFDLEdBQUcsRUFBRTt3QkFDL0UsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7d0JBQzNFLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQUU7d0JBQ25GLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDLGNBQWMsRUFBRSxhQUFhLENBQUMsRUFBRTt3QkFDMUYsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUNrQixlQUFVLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFO3dCQUNuRyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTt3QkFDeEUsRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUNBLGVBQVUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUNqSCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLFlBQVksQ0FBQyxFQUFFO3dCQUM5RixxQkFBcUI7MEJBQ3JCLENBQUMsRUFBRSxPQUFPLEVBQUVJLHNCQUFpQixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLEVBQUUsQ0FBQzswQkFDN0csRUFBRSxFQUNQO2lCQUNGLENBQUM7YUFDSDs7b0JBdkJGQyxhQUFRLFNBQUM7d0JBQ1IsT0FBTyxFQUFFLENBQUNDLHFCQUFnQixDQUFDO3dCQUMzQixZQUFZLEVBQUUsRUFBRTt3QkFDaEIsT0FBTyxFQUFFLEVBQUU7cUJBQ1o7O1FBb0JELHNCQUFDO0tBeEJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=