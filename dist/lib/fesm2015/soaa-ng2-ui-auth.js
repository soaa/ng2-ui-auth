import { Inject, Injectable, InjectionToken, Injector, NgModule } from '@angular/core';
import { __awaiter } from 'tslib';
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
    const joined = [baseUrl, url].join('/');
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
        .map(key => (!!obj[key] ? `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}` : key))
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
            return `${w.location.protocol}//${w.location.hostname}${w.location.port ? ':' + w.location.port : ''}`;
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
const defaultProviders = {
    facebook: {
        name: 'facebook',
        url: '/auth/facebook',
        redirectUri: `${getWindowOrigin()}/`,
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
        state: () => encodeURIComponent(Math.random()
            .toString(36)
            .substr(2))
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
        redirectUri: `${getWindowOrigin()}/`,
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
        state: () => encodeURIComponent(Math.random()
            .toString(36)
            .substr(2))
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const StorageType = {
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
const CONFIG_OPTIONS = new InjectionToken('config.options');
class ConfigService {
    /**
     * @param {?} options
     */
    constructor(options) {
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
            resolveToken: (response, config) => {
                /** @type {?} */
                const accessToken = response && (response.access_token || response.token || response.data);
                if (!accessToken) {
                    // console.warn('No token found');
                    return null;
                }
                if (typeof accessToken === 'string') {
                    // tslint:disable-next-line:no-shadowed-variable
                    /** @type {?} */
                    const refreshToken = response[config.refreshTokenName];
                    return (/** @type {?} */ ({ accessToken: accessToken, refreshToken: refreshToken }));
                }
                if (typeof accessToken !== 'object') {
                    // console.warn('No token found');
                    return null;
                }
                /** @type {?} */
                const tokenRootData = config.tokenRoot &&
                    config.tokenRoot.split('.').reduce((o, x) => {
                        return o[x];
                    }, accessToken);
                /** @type {?} */
                const token = tokenRootData ? tokenRootData[config.tokenName] : accessToken[config.tokenName];
                /** @type {?} */
                const refreshToken = tokenRootData ? tokenRootData[config.refreshTokenName] : accessToken[config.refreshTokenName];
                if (token) {
                    return (/** @type {?} */ ({ accessToken: token, refreshToken: refreshToken }));
                }
                // const tokenPath = this.tokenRoot ? this.tokenRoot + '.' + this.tokenName : this.tokenName;
                // console.warn('Expecting a token named "' + tokenPath);
                return null;
            },
            providers: {}
        };
        this.options = Object.assign({}, this.options, options);
        this.mergeWithDefaultProviders();
    }
    /**
     * @param {?} providers
     * @return {?}
     */
    updateProviders(providers) {
        this.options.providers = Object.assign({}, (this.options.providers || {}), providers);
        this.mergeWithDefaultProviders();
    }
    /**
     * @return {?}
     */
    mergeWithDefaultProviders() {
        Object.keys(this.options.providers).forEach(key => {
            if (key in defaultProviders) {
                this.options.providers[key] = Object.assign({}, defaultProviders[key], this.options.providers[key]);
            }
        });
    }
}
ConfigService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ConfigService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [CONFIG_OPTIONS,] }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class StorageService {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BrowserStorageService extends StorageService {
    /**
     * @param {?} config
     */
    constructor(config) {
        super();
        this.config = config;
        this.store = {};
        this.storageType = StorageType.MEMORY;
        if (!this.updateStorageType(config.options.storageType)) {
            console.warn(config.options.storageType + ' is not available.');
        }
    }
    /**
     * @param {?} storageType
     * @return {?}
     */
    updateStorageType(storageType) {
        /** @type {?} */
        const isStorageAvailable = this.checkIsStorageAvailable(storageType);
        if (!isStorageAvailable) {
            return false;
        }
        this.storageType = storageType;
        return true;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.storageType) {
                case StorageType.COOKIE:
                case StorageType.SESSION_COOKIE:
                    return Promise.resolve(this.getCookie(key));
                case StorageType.LOCAL_STORAGE:
                case StorageType.SESSION_STORAGE:
                    return Promise.resolve(window[this.storageType].getItem(key));
                case StorageType.MEMORY:
                    return Promise.resolve(this.store[key]);
                case StorageType.NONE:
                default:
                    return Promise.resolve(null);
            }
        });
    }
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} date
     * @return {?}
     */
    set(key, value, date) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * @param {?} key
     * @return {?}
     */
    remove(key) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    checkIsStorageAvailable(storageType) {
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
    }
    /**
     * @private
     * @param {?} storageType
     * @return {?}
     */
    isWindowStorageAvailable(storageType) {
        try {
            /** @type {?} */
            const supported = window && storageType in window && window[storageType] !== null;
            if (supported) {
                /** @type {?} */
                const key = Math.random()
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
    }
    /**
     * @private
     * @return {?}
     */
    isCookieStorageAvailable() {
        try {
            /** @type {?} */
            const supported = document && 'cookie' in document;
            if (supported) {
                /** @type {?} */
                const key = Math.random()
                    .toString(36)
                    .substring(7);
                this.setCookie(key, 'test', new Date(Date.now() + 60 * 1000).toUTCString());
                /** @type {?} */
                const value = this.getCookie(key);
                this.removeCookie(key);
                return value === 'test';
            }
            return false;
        }
        catch (e) {
            return false;
        }
    }
    /**
     * @private
     * @param {?} key
     * @param {?} value
     * @param {?=} expires
     * @param {?=} path
     * @return {?}
     */
    setCookie(key, value, expires = '', path = '/') {
        document.cookie = `${key}=${value}${expires ? `; expires=${expires}` : ''}; path=${path}`;
    }
    /**
     * @private
     * @param {?} key
     * @param {?=} path
     * @return {?}
     */
    removeCookie(key, path = '/') {
        this.setCookie(key, '', new Date(0).toUTCString(), path);
    }
    /**
     * @private
     * @param {?} key
     * @return {?}
     */
    getCookie(key) {
        return document.cookie.replace(new RegExp(`(?:(?:^|.*;\\s*)${key}\\s*\\=\\s*([^;]*).*$)|^.*$`), '$1');
    }
}
BrowserStorageService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BrowserStorageService.ctorParameters = () => [
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TokenRefreshService {
    /**
     * @template T
     * @param {?} refreshToken
     * @return {?}
     */
    requestTokenRefresh(refreshToken) {
        return EMPTY;
    }
}
TokenRefreshService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SharedService {
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
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get(this.refreshTokenName);
        });
    }
    /**
     * @return {?}
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.storage.get(this.tokenName);
        });
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    getPayload(token) {
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
            yield this.storage.remove(this.tokenName);
        });
    }
    /**
     * @param {?=} token
     * @return {?}
     */
    isAuthenticated(token) {
        return __awaiter(this, void 0, void 0, function* () {
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
        return __awaiter(this, void 0, void 0, function* () {
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
        return Observable.create((observer) => __awaiter(this, void 0, void 0, function* () {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class JwtInterceptor {
    /**
     * @param {?} shared
     * @param {?} config
     */
    constructor(shared, config) {
        this.shared = shared;
        this.config = config;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
        const { authHeader, authToken } = this.config.options;
        return from(Promise.all([this.shared.getToken(), this.shared.isAuthenticated()]))
            .pipe(switchMap((auth) => {
            /** @type {?} */
            const token = auth[0];
            /** @type {?} */
            const isAuthenticated = auth[1];
            /** @type {?} */
            const newReq = isAuthenticated && !req.headers.has(authHeader) ? req.clone({ setHeaders: { [authHeader]: `${authToken} ${token}` } }) : req;
            return next.handle(newReq);
        }));
    }
}
JwtInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
JwtInterceptor.ctorParameters = () => [
    { type: SharedService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PopupService {
    /**
     * @param {?} url
     * @param {?} options
     * @param {?=} cordova
     * @return {?}
     */
    open(url, options, cordova = this.isCordovaApp()) {
        /** @type {?} */
        const stringifiedOptions = this.stringifyOptions(this.prepareOptions(options.popupOptions));
        /** @type {?} */
        const windowName = cordova ? '_blank' : options.name;
        /** @type {?} */
        const popupWindow = typeof window !== 'undefined' ? window.open(url, windowName, stringifiedOptions) : null;
        if (popupWindow) {
            if (popupWindow.focus) {
                popupWindow.focus();
            }
            return of(popupWindow);
        }
        return empty();
    }
    /**
     * @param {?} popupWindow
     * @param {?=} cordova
     * @param {?=} redirectUri
     * @return {?}
     */
    waitForClose(popupWindow, cordova = this.isCordovaApp(), redirectUri = getWindowOrigin()) {
        return cordova ? this.eventListener(popupWindow, redirectUri) : this.pollPopup(popupWindow, redirectUri);
    }
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    eventListener(popupWindow, redirectUri = getWindowOrigin()) {
        if (!popupWindow) {
            throw new Error('Popup was not created');
        }
        return merge(fromEvent(popupWindow, 'exit').pipe(delay(100), map(() => {
            throw new Error('Authentication Canceled');
        })), fromEvent(popupWindow, 'loadstart')).pipe(switchMap((event) => {
            if (!popupWindow || popupWindow.closed) {
                return Observable.throw(new Error('Authentication Canceled'));
            }
            if (event.url.indexOf(redirectUri) !== 0) {
                return empty();
            }
            /** @type {?} */
            const parser = document.createElement('a');
            parser.href = event.url;
            if (parser.search || parser.hash) {
                /** @type {?} */
                const queryParams = parser.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hashParams = parser.hash.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hash = this.parseQueryString(hashParams);
                /** @type {?} */
                const qs = this.parseQueryString(queryParams);
                /** @type {?} */
                const allParams = Object.assign({}, qs, hash);
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
    }
    /**
     * @private
     * @param {?} popupWindow
     * @param {?=} redirectUri
     * @return {?}
     */
    pollPopup(popupWindow, redirectUri = getWindowOrigin()) {
        return interval(50).pipe(switchMap(() => {
            if (!popupWindow || popupWindow.closed) {
                return throwError(new Error('Authentication Canceled'));
            }
            /** @type {?} */
            const popupWindowOrigin = getWindowOrigin(popupWindow);
            if (popupWindowOrigin &&
                (redirectUri.indexOf(popupWindowOrigin) === 0 || popupWindowOrigin.indexOf(redirectUri) === 0) &&
                (popupWindow.location.search || popupWindow.location.hash)) {
                /** @type {?} */
                const queryParams = popupWindow.location.search.substring(1).replace(/\/$/, '');
                /** @type {?} */
                const hashParams = popupWindow.location.hash.substring(1).replace(/[\/$]/, '');
                /** @type {?} */
                const hash = this.parseQueryString(hashParams);
                /** @type {?} */
                const qs = this.parseQueryString(queryParams);
                popupWindow.close();
                /** @type {?} */
                const allParams = Object.assign({}, qs, hash);
                if (allParams.error) {
                    throw allParams.error;
                }
                else {
                    return of(allParams);
                }
            }
            return empty();
        }), take(1));
    }
    /**
     * @private
     * @param {?=} options
     * @return {?}
     */
    prepareOptions(options) {
        options = options || {};
        /** @type {?} */
        const width = options.width || 500;
        /** @type {?} */
        const height = options.height || 500;
        return Object.assign({ width,
            height, left: window.screenX + (window.outerWidth - width) / 2, top: window.screenY + (window.outerHeight - height) / 2.5, toolbar: options.visibleToolbar ? 'yes' : 'no' }, options);
    }
    /**
     * @private
     * @param {?} options
     * @return {?}
     */
    stringifyOptions(options) {
        return Object.keys(options)
            .map(key => (options[key] === null || options[key] === undefined ? key : key + '=' + options[key]))
            .join(',');
    }
    /**
     * @private
     * @param {?} joinedKeyValue
     * @return {?}
     */
    parseQueryString(joinedKeyValue) {
        /** @type {?} */
        let key;
        /** @type {?} */
        let value;
        return joinedKeyValue.split('&').reduce((obj, keyValue) => {
            if (keyValue) {
                value = keyValue.split('=');
                key = decodeURIComponent(value[0]);
                obj[key] = typeof value[1] !== 'undefined' ? decodeURIComponent(value[1]) : true;
            }
            return obj;
        }, (/** @type {?} */ ({})));
    }
    /**
     * @private
     * @return {?}
     */
    isCordovaApp() {
        return typeof cordova === 'object' || (document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1);
    }
}
PopupService.decorators = [
    { type: Injectable }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Oauth1Service {
    /**
     * @param {?} http
     * @param {?} popup
     * @param {?} config
     */
    constructor(http, popup, config) {
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
    open(oauthOptions, userData) {
        /** @type {?} */
        const serverUrl = this.config.options.baseUrl ? joinUrl(this.config.options.baseUrl, oauthOptions.url) : oauthOptions.url;
        return this.popup.open('about:blank', oauthOptions, this.config.options.cordova).pipe(switchMap(popupWindow => this.http.post(serverUrl, oauthOptions).pipe(tap(authorizationData => popupWindow
            ? popupWindow.location.replace([oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?'))
            : undefined), switchMap(authorizationData => this.popup
            .waitForClose(popupWindow, this.config.options.cordova, oauthOptions.redirectUri)
            .pipe(map(oauthData => ({ authorizationData, oauthData })))))), switchMap(({ authorizationData, oauthData }) => this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData)));
    }
    /**
     * @protected
     * @template T
     * @param {?} oauthOptions
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    exchangeForToken(oauthOptions, authorizationData, oauthData, userData) {
        /** @type {?} */
        const body = { oauthOptions, authorizationData, oauthData, userData };
        const { withCredentials, baseUrl } = this.config.options;
        const { method = 'POST', url } = oauthOptions;
        /** @type {?} */
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
}
Oauth1Service.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Oauth1Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Oauth2Service {
    /**
     * @param {?} http
     * @param {?} popup
     * @param {?} config
     */
    constructor(http, popup, config) {
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
    open(oauthOptions, userData) {
        /** @type {?} */
        const authorizationData = this.getAuthorizationData(oauthOptions);
        /** @type {?} */
        const url = [oauthOptions.authorizationEndpoint, buildQueryString(authorizationData)].join('?');
        return this.popup.open(url, oauthOptions, this.config.options.cordova).pipe(switchMap((window) => window ? this.popup.waitForClose(window, this.config.options.cordova, oauthOptions.redirectUri) : empty()), switchMap((oauthData) => {
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
            return this.exchangeForToken(oauthOptions, authorizationData, oauthData, userData);
        }));
    }
    /**
     * @protected
     * @template T
     * @param {?} options
     * @param {?} authorizationData
     * @param {?} oauthData
     * @param {?} userData
     * @return {?}
     */
    exchangeForToken(options, authorizationData, oauthData, userData) {
        /** @type {?} */
        const body = { authorizationData, oauthData, userData };
        const { baseUrl, withCredentials } = this.config.options;
        const { url, method = 'POST' } = options;
        /** @type {?} */
        const exchangeForTokenUrl = baseUrl ? joinUrl(baseUrl, url) : url;
        return this.http.request(method, exchangeForTokenUrl, { body, withCredentials });
    }
    /**
     * @protected
     * @param {?} options
     * @return {?}
     */
    getAuthorizationData(options) {
        const { responseType = 'code', clientId, redirectUri = getWindowOrigin() || '', scopeDelimiter = ',', scope, state, additionalUrlParams } = options;
        /** @type {?} */
        const resolvedState = typeof state === 'function' ? state() : state;
        return [
            ['response_type', responseType],
            ['client_id', clientId],
            ['redirect_uri', redirectUri],
            ...(state ? [['state', resolvedState]] : []),
            ...(scope ? [['scope', scope.join(scopeDelimiter)]] : []),
            ...(additionalUrlParams
                ? Object.keys(additionalUrlParams).map(key => {
                    /** @type {?} */
                    const value = ((/** @type {?} */ (additionalUrlParams)))[key];
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
                : [])
        ]
            .filter(_ => !!_[0])
            .reduce((acc, next) => (Object.assign({}, acc, { [next[0]]: next[1] })), (/** @type {?} */ ({})));
    }
}
Oauth2Service.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Oauth2Service.ctorParameters = () => [
    { type: HttpClient },
    { type: PopupService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OauthService {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class LocalService {
    /**
     * @param {?} http
     * @param {?} shared
     * @param {?} config
     */
    constructor(http, shared, config) {
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
    login(user, url) {
        return this.http
            .post(url || joinUrl(this.config.options.baseUrl, this.config.options.loginUrl), user)
            .pipe(tap(data => this.shared.setToken(data)));
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    signup(user, url) {
        return this.http.post(url || joinUrl(this.config.options.baseUrl, this.config.options.signupUrl), user);
    }
}
LocalService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
LocalService.ctorParameters = () => [
    { type: HttpClient },
    { type: SharedService },
    { type: ConfigService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AuthService {
    /**
     * @param {?} shared
     * @param {?} local
     * @param {?} oauth
     */
    constructor(shared, local, oauth) {
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
    login(user, url) {
        return this.local.login(user, url);
    }
    /**
     * @template T
     * @param {?} user
     * @param {?=} url
     * @return {?}
     */
    signup(user, url) {
        return this.local.signup(user, url);
    }
    /**
     * @return {?}
     */
    logout() {
        return this.shared.logout();
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    authenticate(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} name
     * @param {?=} userData
     * @return {?}
     */
    link(name, userData) {
        return this.oauth.authenticate(name, userData);
    }
    /**
     * @template T
     * @param {?} provider
     * @param {?=} url
     * @return {?}
     */
    unlink(provider, url) {
        return this.oauth.unlink(provider, url);
    }
    /**
     * @return {?}
     */
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shared.isAuthenticated();
        });
    }
    /**
     * @return {?}
     */
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shared.getToken();
        });
    }
    /**
     * @param {?} token
     * @return {?}
     */
    setToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shared.setToken(token);
        });
    }
    /**
     * @return {?}
     */
    removeToken() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.shared.removeToken();
        });
    }
    /**
     * @return {?}
     */
    getPayload() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shared.getPayload();
        });
    }
    /**
     * @param {?} type
     * @return {?}
     */
    setStorageType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shared.setStorageType(type);
        });
    }
    /**
     * @return {?}
     */
    getExpirationDate() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.shared.getExpirationDate();
        });
    }
}
AuthService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AuthService.ctorParameters = () => [
    { type: SharedService },
    { type: LocalService },
    { type: OauthService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Ng2UiAuthModule {
    /**
     * @param {?=} configOptions
     * @param {?=} defaultJwtInterceptor
     * @return {?}
     */
    static forRoot(configOptions, defaultJwtInterceptor = true) {
        return {
            ngModule: Ng2UiAuthModule,
            providers: [
                ...(configOptions ? [{ provide: CONFIG_OPTIONS, useValue: configOptions }] : []),
                { provide: ConfigService, useClass: ConfigService, deps: [CONFIG_OPTIONS] },
                { provide: StorageService, useClass: BrowserStorageService, deps: [ConfigService] },
                { provide: SharedService, useClass: SharedService, deps: [StorageService, ConfigService] },
                { provide: LocalService, useClass: LocalService, deps: [HttpClient, SharedService, ConfigService] },
                { provide: PopupService, useClass: PopupService, deps: [ConfigService] },
                { provide: OauthService, useClass: OauthService, deps: [HttpClient, SharedService, ConfigService, PopupService] },
                { provide: AuthService, useClass: AuthService, deps: [SharedService, LocalService, OauthService] },
                ...(defaultJwtInterceptor
                    ? [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true, deps: [SharedService, ConfigService] }]
                    : [])
            ]
        };
    }
}
Ng2UiAuthModule.decorators = [
    { type: NgModule, args: [{
                imports: [HttpClientModule],
                declarations: [],
                exports: []
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { Ng2UiAuthModule, LocalService, Oauth2Service, Oauth1Service, PopupService, OauthService, SharedService, StorageService, BrowserStorageService, AuthService, ConfigService, TokenRefreshService, JwtInterceptor, CONFIG_OPTIONS, StorageType };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29hYS1uZzItdWktYXV0aC5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3V0aWxzLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvY29uZmlnLXByb3ZpZGVycy50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3N0b3JhZ2UtdHlwZS5lbnVtLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvY29uZmlnLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9zdG9yYWdlLXNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9icm93c2VyLXN0b3JhZ2Uuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3Rva2VuLnJlZnJlc2guc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3NoYXJlZC5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvaW50ZXJjZXB0b3Iuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL3BvcHVwLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9vYXV0aDEuc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL29hdXRoMi5zZXJ2aWNlLnRzIiwibmc6Ly9Ac29hYS9uZzItdWktYXV0aC9saWIvb2F1dGguc2VydmljZS50cyIsIm5nOi8vQHNvYWEvbmcyLXVpLWF1dGgvbGliL2xvY2FsLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9hdXRoLnNlcnZpY2UudHMiLCJuZzovL0Bzb2FhL25nMi11aS1hdXRoL2xpYi9uZzItdWktYXV0aC5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cEhlYWRlcnMsIEh0dHBQYXJhbXMgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5cbi8qKlxuICogQ3JlYXRlZCBieSBSb24gb24gMTcvMTIvMjAxNS5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gam9pblVybChiYXNlVXJsOiBzdHJpbmcsIHVybDogc3RyaW5nKSB7XG4gIGlmICgvXig/OlthLXpdKzopP1xcL1xcLy9pLnRlc3QodXJsKSkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICBjb25zdCBqb2luZWQgPSBbYmFzZVVybCwgdXJsXS5qb2luKCcvJyk7XG5cbiAgcmV0dXJuIGpvaW5lZFxuICAgIC5yZXBsYWNlKC9bXFwvXSsvZywgJy8nKVxuICAgIC5yZXBsYWNlKC9cXC9cXD8vZywgJz8nKVxuICAgIC5yZXBsYWNlKC9cXC9cXCMvZywgJyMnKVxuICAgIC5yZXBsYWNlKC9cXDpcXC8vZywgJzovLycpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRRdWVyeVN0cmluZyhvYmo6IG9iamVjdCkge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKVxuICAgIC5tYXAoa2V5ID0+ICghIW9ialtrZXldID8gYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKX1gIDoga2V5KSlcbiAgICAuam9pbignJicpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0V2luZG93T3JpZ2luKHc/OiBXaW5kb3cpIHtcbiAgaWYgKCF3ICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgdyA9IHdpbmRvdztcbiAgfVxuICB0cnkge1xuICAgIGlmICghdyB8fCAhdy5sb2NhdGlvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICghdy5sb2NhdGlvbi5vcmlnaW4pIHtcbiAgICAgIHJldHVybiBgJHt3LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3LmxvY2F0aW9uLmhvc3RuYW1lfSR7dy5sb2NhdGlvbi5wb3J0ID8gJzonICsgdy5sb2NhdGlvbi5wb3J0IDogJyd9YDtcbiAgICB9XG4gICAgcmV0dXJuIHcubG9jYXRpb24ub3JpZ2luO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBudWxsO1xuICAgIC8vIGlnbm9yZSBET01FeGNlcHRpb246IEJsb2NrZWQgYSBmcmFtZSB3aXRoIG9yaWdpbiBmcm9tIGFjY2Vzc2luZyBhIGNyb3NzLW9yaWdpbiBmcmFtZS5cbiAgICAvLyBlcnJvciBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiBlcnJvci5uYW1lID09PSAnU2VjdXJpdHlFcnJvcidcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBJUHJvdmlkZXJzIH0gZnJvbSAnLi4vcHVibGljX2FwaSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UHJvdmlkZXJzOiBJUHJvdmlkZXJzID0ge1xuICBmYWNlYm9vazoge1xuICAgIG5hbWU6ICdmYWNlYm9vaycsXG4gICAgdXJsOiAnL2F1dGgvZmFjZWJvb2snLFxuICAgIHJlZGlyZWN0VXJpOiBgJHtnZXRXaW5kb3dPcmlnaW4oKX0vYCxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL3d3dy5mYWNlYm9vay5jb20vdjIuNS9kaWFsb2cvb2F1dGgnLFxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCdcbiAgICB9LFxuICAgIHNjb3BlOiBbJ2VtYWlsJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcsJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnLFxuICAgIHBvcHVwT3B0aW9uczogeyB3aWR0aDogNTgwLCBoZWlnaHQ6IDQwMCB9XG4gIH0sXG4gIGdvb2dsZToge1xuICAgIG5hbWU6ICdnb29nbGUnLFxuICAgIHVybDogJy9hdXRoL2dvb2dsZScsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL2F1dGgnLFxuICAgIGFkZGl0aW9uYWxVcmxQYXJhbXM6IHtcbiAgICAgIGRpc3BsYXk6ICdwb3B1cCcsXG4gICAgICBwcm9tcHQ6IHVuZGVmaW5lZCxcbiAgICAgIGxvZ2luX2hpbnQ6IHVuZGVmaW5lZCxcbiAgICAgIGFjY2Vzc190eXBlOiB1bmRlZmluZWQsXG4gICAgICBpbmNsdWRlX2dyYW50ZWRfc2NvcGVzOiB1bmRlZmluZWQsXG4gICAgICAnb3BlbmlkLnJlYWxtJzogdW5kZWZpbmVkLFxuICAgICAgaGQ6IHVuZGVmaW5lZFxuICAgIH0sXG4gICAgc2NvcGU6IFsnb3BlbmlkJywgJ3Byb2ZpbGUnLCAnZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0NTIsIGhlaWdodDogNjMzIH0sXG4gICAgc3RhdGU6ICgpID0+XG4gICAgICBlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgIE1hdGgucmFuZG9tKClcbiAgICAgICAgICAudG9TdHJpbmcoMzYpXG4gICAgICAgICAgLnN1YnN0cigyKVxuICAgICAgKVxuICB9LFxuICBnaXRodWI6IHtcbiAgICBuYW1lOiAnZ2l0aHViJyxcbiAgICB1cmw6ICcvYXV0aC9naXRodWInLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vZ2l0aHViLmNvbS9sb2dpbi9vYXV0aC9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ3VzZXI6ZW1haWwnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiAxMDIwLCBoZWlnaHQ6IDYxOCB9XG4gIH0sXG4gIGluc3RhZ3JhbToge1xuICAgIG5hbWU6ICdpbnN0YWdyYW0nLFxuICAgIHVybDogJy9hdXRoL2luc3RhZ3JhbScsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly9hcGkuaW5zdGFncmFtLmNvbS9vYXV0aC9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ2Jhc2ljJ10sXG4gICAgc2NvcGVEZWxpbWl0ZXI6ICcrJyxcbiAgICBvYXV0aFR5cGU6ICcyLjAnXG4gIH0sXG4gIGxpbmtlZGluOiB7XG4gICAgbmFtZTogJ2xpbmtlZGluJyxcbiAgICB1cmw6ICcvYXV0aC9saW5rZWRpbicsXG4gICAgYXV0aG9yaXphdGlvbkVuZHBvaW50OiAnaHR0cHM6Ly93d3cubGlua2VkaW4uY29tL3Vhcy9vYXV0aDIvYXV0aG9yaXphdGlvbicsXG4gICAgc2NvcGU6IFsncl9lbWFpbGFkZHJlc3MnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MjcsIGhlaWdodDogNTgyIH0sXG4gICAgc3RhdGU6ICdTVEFURSdcbiAgfSxcbiAgdHdpdHRlcjoge1xuICAgIG5hbWU6ICd0d2l0dGVyJyxcbiAgICB1cmw6ICcvYXV0aC90d2l0dGVyJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0dGVyLmNvbS9vYXV0aC9hdXRoZW50aWNhdGUnLFxuICAgIG9hdXRoVHlwZTogJzEuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA0OTUsIGhlaWdodDogNjQ1IH1cbiAgfSxcbiAgdHdpdGNoOiB7XG4gICAgbmFtZTogJ3R3aXRjaCcsXG4gICAgdXJsOiAnL2F1dGgvdHdpdGNoJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS50d2l0Y2gudHYva3Jha2VuL29hdXRoMi9hdXRob3JpemUnLFxuICAgIHNjb3BlOiBbJ3VzZXJfcmVhZCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnICcsXG4gICAgYWRkaXRpb25hbFVybFBhcmFtczoge1xuICAgICAgZGlzcGxheTogJ3BvcHVwJ1xuICAgIH0sXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1NjAgfVxuICB9LFxuICBsaXZlOiB7XG4gICAgbmFtZTogJ2xpdmUnLFxuICAgIHVybDogJy9hdXRoL2xpdmUnLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vbG9naW4ubGl2ZS5jb20vb2F1dGgyMF9hdXRob3JpemUuc3JmJyxcbiAgICBhZGRpdGlvbmFsVXJsUGFyYW1zOiB7XG4gICAgICBkaXNwbGF5OiAncG9wdXAnXG4gICAgfSxcbiAgICBzY29wZTogWyd3bC5lbWFpbHMnXSxcbiAgICBzY29wZURlbGltaXRlcjogJyAnLFxuICAgIG9hdXRoVHlwZTogJzIuMCcsXG4gICAgcG9wdXBPcHRpb25zOiB7IHdpZHRoOiA1MDAsIGhlaWdodDogNTYwIH1cbiAgfSxcbiAgeWFob286IHtcbiAgICBuYW1lOiAneWFob28nLFxuICAgIHVybDogJy9hdXRoL3lhaG9vJyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FwaS5sb2dpbi55YWhvby5jb20vb2F1dGgyL3JlcXVlc3RfYXV0aCcsXG4gICAgc2NvcGU6IFtdLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDU1OSwgaGVpZ2h0OiA1MTkgfVxuICB9LFxuICBiaXRidWNrZXQ6IHtcbiAgICBuYW1lOiAnYml0YnVja2V0JyxcbiAgICB1cmw6ICcvYXV0aC9iaXRidWNrZXQnLFxuICAgIGF1dGhvcml6YXRpb25FbmRwb2ludDogJ2h0dHBzOi8vYml0YnVja2V0Lm9yZy9zaXRlL29hdXRoMi9hdXRob3JpemUnLFxuICAgIHJlZGlyZWN0VXJpOiBgJHtnZXRXaW5kb3dPcmlnaW4oKX0vYCxcbiAgICBzY29wZTogWydlbWFpbCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDEwMjgsIGhlaWdodDogNTI5IH1cbiAgfSxcbiAgc3BvdGlmeToge1xuICAgIG5hbWU6ICdzcG90aWZ5JyxcbiAgICB1cmw6ICcvYXV0aC9zcG90aWZ5JyxcbiAgICBhdXRob3JpemF0aW9uRW5kcG9pbnQ6ICdodHRwczovL2FjY291bnRzLnNwb3RpZnkuY29tL2F1dGhvcml6ZScsXG4gICAgc2NvcGU6IFsnJywgJ3VzZXItcmVhZC1lbWFpbCddLFxuICAgIHNjb3BlRGVsaW1pdGVyOiAnLCcsXG4gICAgb2F1dGhUeXBlOiAnMi4wJyxcbiAgICBwb3B1cE9wdGlvbnM6IHsgd2lkdGg6IDUwMCwgaGVpZ2h0OiA1MzAgfSxcbiAgICBzdGF0ZTogKCkgPT5cbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgTWF0aC5yYW5kb20oKVxuICAgICAgICAgIC50b1N0cmluZygzNilcbiAgICAgICAgICAuc3Vic3RyKDIpXG4gICAgICApXG4gIH1cbn07XG4iLCJleHBvcnQgZW51bSBTdG9yYWdlVHlwZSB7XG4gIE5PTkUgPSAnbm9uZScsXG4gIE1FTU9SWSA9ICdtZW1vcnknLFxuICBMT0NBTF9TVE9SQUdFID0gJ2xvY2FsU3RvcmFnZScsXG4gIFNFU1NJT05fU1RPUkFHRSA9ICdzZXNzaW9uU3RvcmFnZScsXG4gIENPT0tJRSA9ICdjb29raWUnLFxuICBTRVNTSU9OX0NPT0tJRSA9ICdzZXNzaW9uQ29va2llJ1xufVxuIiwiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtJQ29uZmlnT3B0aW9ucywgSVBhcnRpYWxDb25maWdPcHRpb25zLCBJUHJvdmlkZXJzLCBUb2tlbnN9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgZGVmYXVsdFByb3ZpZGVycyB9IGZyb20gJy4vY29uZmlnLXByb3ZpZGVycyc7XG5pbXBvcnQgeyBTdG9yYWdlVHlwZSB9IGZyb20gJy4vc3RvcmFnZS10eXBlLmVudW0nO1xuXG5leHBvcnQgY29uc3QgQ09ORklHX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48YW55PignY29uZmlnLm9wdGlvbnMnKTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDb25maWdTZXJ2aWNlIHtcbiAgcHVibGljIG9wdGlvbnMgID0ge1xuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgdG9rZW5Sb290OiBudWxsLFxuICAgIGJhc2VVcmw6ICcvJyxcbiAgICBsb2dpblVybDogJy9hdXRoL2xvZ2luJyxcbiAgICBzaWdudXBVcmw6ICcvYXV0aC9zaWdudXAnLFxuICAgIHVubGlua1VybDogJy9hdXRoL3VubGluay8nLFxuICAgIHRva2VuTmFtZTogJ3Rva2VuJyxcbiAgICByZWZyZXNoVG9rZW5OYW1lOiAncmVmcmVzaF90b2tlbicsXG4gICAgdG9rZW5TZXBhcmF0b3I6ICdfJyxcbiAgICB0b2tlblByZWZpeDogJ25nMi11aS1hdXRoJyxcbiAgICBhdXRoSGVhZGVyOiAnQXV0aG9yaXphdGlvbicsXG4gICAgYXV0aFRva2VuOiAnQmVhcmVyJyxcbiAgICBzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRSxcbiAgICBjb3Jkb3ZhOiB1bmRlZmluZWQsXG4gICAgcmVzb2x2ZVRva2VuOiAocmVzcG9uc2U6IGFueSwgY29uZmlnOiBJQ29uZmlnT3B0aW9ucykgPT4ge1xuICAgICAgY29uc3QgYWNjZXNzVG9rZW46IHN0cmluZyB8IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsIHwgdW5kZWZpbmVkID1cbiAgICAgICAgcmVzcG9uc2UgJiYgKHJlc3BvbnNlLmFjY2Vzc190b2tlbiB8fCByZXNwb25zZS50b2tlbiB8fCByZXNwb25zZS5kYXRhKTtcbiAgICAgIGlmICghYWNjZXNzVG9rZW4pIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYWNjZXNzVG9rZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1zaGFkb3dlZC12YXJpYWJsZVxuICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSByZXNwb25zZVtjb25maWcucmVmcmVzaFRva2VuTmFtZV07XG4gICAgICAgIHJldHVybiA8VG9rZW5zPnsgYWNjZXNzVG9rZW46IGFjY2Vzc1Rva2VuLCByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbiB9O1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBhY2Nlc3NUb2tlbiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gY29uc29sZS53YXJuKCdObyB0b2tlbiBmb3VuZCcpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRva2VuUm9vdERhdGEgPVxuICAgICAgICBjb25maWcudG9rZW5Sb290ICYmXG4gICAgICAgIGNvbmZpZy50b2tlblJvb3Quc3BsaXQoJy4nKS5yZWR1Y2UoKG86IGFueSwgeDogYW55KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9beF07XG4gICAgICAgIH0sIGFjY2Vzc1Rva2VuKTtcbiAgICAgIGNvbnN0IHRva2VuID0gdG9rZW5Sb290RGF0YSA/IHRva2VuUm9vdERhdGFbY29uZmlnLnRva2VuTmFtZV0gOiBhY2Nlc3NUb2tlbltjb25maWcudG9rZW5OYW1lXTtcbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IHRva2VuUm9vdERhdGEgPyB0b2tlblJvb3REYXRhW2NvbmZpZy5yZWZyZXNoVG9rZW5OYW1lXSA6IGFjY2Vzc1Rva2VuW2NvbmZpZy5yZWZyZXNoVG9rZW5OYW1lXTtcblxuICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgIHJldHVybiA8VG9rZW5zPnsgYWNjZXNzVG9rZW46IHRva2VuLCByZWZyZXNoVG9rZW46IHJlZnJlc2hUb2tlbiB9O1xuICAgICAgfVxuXG4gICAgICAvLyBjb25zdCB0b2tlblBhdGggPSB0aGlzLnRva2VuUm9vdCA/IHRoaXMudG9rZW5Sb290ICsgJy4nICsgdGhpcy50b2tlbk5hbWUgOiB0aGlzLnRva2VuTmFtZTtcbiAgICAgIC8vIGNvbnNvbGUud2FybignRXhwZWN0aW5nIGEgdG9rZW4gbmFtZWQgXCInICsgdG9rZW5QYXRoKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG4gICAgcHJvdmlkZXJzOiB7fVxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoQ09ORklHX09QVElPTlMpIG9wdGlvbnM6IElQYXJ0aWFsQ29uZmlnT3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyA9IHtcbiAgICAgIC4uLnRoaXMub3B0aW9ucyxcbiAgICAgIC4uLm9wdGlvbnNcbiAgICB9O1xuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xuICB9XG5cbiAgdXBkYXRlUHJvdmlkZXJzKHByb3ZpZGVyczogSVByb3ZpZGVycykge1xuICAgIHRoaXMub3B0aW9ucy5wcm92aWRlcnMgPSB7XG4gICAgICAuLi4odGhpcy5vcHRpb25zLnByb3ZpZGVycyB8fCB7fSksXG4gICAgICAuLi5wcm92aWRlcnNcbiAgICB9O1xuICAgIHRoaXMubWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpO1xuICB9XG5cbiAgbWVyZ2VXaXRoRGVmYXVsdFByb3ZpZGVycygpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLm9wdGlvbnMucHJvdmlkZXJzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5IGluIGRlZmF1bHRQcm92aWRlcnMpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnByb3ZpZGVyc1trZXldID0ge1xuICAgICAgICAgIC4uLmRlZmF1bHRQcm92aWRlcnNba2V5XSxcbiAgICAgICAgICAuLi50aGlzLm9wdGlvbnMucHJvdmlkZXJzW2tleV1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFN0b3JhZ2VTZXJ2aWNlIHtcbiAgYWJzdHJhY3QgdXBkYXRlU3RvcmFnZVR5cGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKTogYm9vbGVhbjtcblxuICBhYnN0cmFjdCBhc3luYyBnZXQoa2V5OiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz47XG5cbiAgYWJzdHJhY3QgYXN5bmMgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBkYXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGFic3RyYWN0IGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZyk6IFByb21pc2U8dm9pZD47XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBCcm93c2VyU3RvcmFnZVNlcnZpY2UgZXh0ZW5kcyBTdG9yYWdlU2VydmljZSB7XG4gIHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgcHJpdmF0ZSBzdG9yYWdlVHlwZSA9IFN0b3JhZ2VUeXBlLk1FTU9SWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gICAgaWYgKCF0aGlzLnVwZGF0ZVN0b3JhZ2VUeXBlKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlKSkge1xuICAgICAgY29uc29sZS53YXJuKGNvbmZpZy5vcHRpb25zLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVTdG9yYWdlVHlwZShzdG9yYWdlVHlwZTogU3RvcmFnZVR5cGUpIHtcbiAgICBjb25zdCBpc1N0b3JhZ2VBdmFpbGFibGUgPSB0aGlzLmNoZWNrSXNTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlKTtcbiAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLnN0b3JhZ2VUeXBlID0gc3RvcmFnZVR5cGU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0KGtleTogc3RyaW5nKSB7XG4gICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VUeXBlKSB7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkNPT0tJRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9DT09LSUU6XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5nZXRDb29raWUoa2V5KSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLkxPQ0FMX1NUT1JBR0U6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fU1RPUkFHRTpcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc3RvcmVba2V5XSk7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk5PTkU6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXQoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGRhdGU6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnNldENvb2tpZShrZXksIHZhbHVlLCB0aGlzLnN0b3JhZ2VUeXBlID09PSBTdG9yYWdlVHlwZS5DT09LSUUgPyBkYXRlIDogJycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLk1FTU9SWTpcbiAgICAgICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlbW92ZShrZXk6IHN0cmluZykge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICB3aW5kb3dbdGhpcy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTUVNT1JZOlxuICAgICAgICBkZWxldGUgdGhpcy5zdG9yZVtrZXldO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTk9ORTpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tJc1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGU6IFN0b3JhZ2VUeXBlKSB7XG4gICAgc3dpdGNoIChzdG9yYWdlVHlwZSkge1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5DT09LSUU6XG4gICAgICBjYXNlIFN0b3JhZ2VUeXBlLlNFU1NJT05fQ09PS0lFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc0Nvb2tpZVN0b3JhZ2VBdmFpbGFibGUoKTtcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuTE9DQUxfU1RPUkFHRTpcbiAgICAgIGNhc2UgU3RvcmFnZVR5cGUuU0VTU0lPTl9TVE9SQUdFOlxuICAgICAgICByZXR1cm4gdGhpcy5pc1dpbmRvd1N0b3JhZ2VBdmFpbGFibGUoc3RvcmFnZVR5cGUpO1xuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5OT05FOlxuICAgICAgY2FzZSBTdG9yYWdlVHlwZS5NRU1PUlk6XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNXaW5kb3dTdG9yYWdlQXZhaWxhYmxlKHN0b3JhZ2VUeXBlOiBTdG9yYWdlVHlwZS5TRVNTSU9OX1NUT1JBR0UgfCBTdG9yYWdlVHlwZS5MT0NBTF9TVE9SQUdFKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHN1cHBvcnRlZCA9IHdpbmRvdyAmJiBzdG9yYWdlVHlwZSBpbiB3aW5kb3cgJiYgd2luZG93W3N0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHdpbmRvd1tzdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcbiAgICAgICAgd2luZG93W3N0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNDb29raWVTdG9yYWdlQXZhaWxhYmxlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzdXBwb3J0ZWQgPSBkb2N1bWVudCAmJiAnY29va2llJyBpbiBkb2N1bWVudDtcblxuICAgICAgaWYgKHN1cHBvcnRlZCkge1xuICAgICAgICBjb25zdCBrZXkgPSBNYXRoLnJhbmRvbSgpXG4gICAgICAgICAgLnRvU3RyaW5nKDM2KVxuICAgICAgICAgIC5zdWJzdHJpbmcoNyk7XG4gICAgICAgIHRoaXMuc2V0Q29va2llKGtleSwgJ3Rlc3QnLCBuZXcgRGF0ZShEYXRlLm5vdygpICsgNjAgKiAxMDAwKS50b1VUQ1N0cmluZygpKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLmdldENvb2tpZShrZXkpO1xuICAgICAgICB0aGlzLnJlbW92ZUNvb2tpZShrZXkpO1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09ICd0ZXN0JztcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzZXRDb29raWUoa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyZXMgPSAnJywgcGF0aCA9ICcvJykge1xuICAgIGRvY3VtZW50LmNvb2tpZSA9IGAke2tleX09JHt2YWx1ZX0ke2V4cGlyZXMgPyBgOyBleHBpcmVzPSR7ZXhwaXJlc31gIDogJyd9OyBwYXRoPSR7cGF0aH1gO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVDb29raWUoa2V5OiBzdHJpbmcsIHBhdGggPSAnLycpIHtcbiAgICB0aGlzLnNldENvb2tpZShrZXksICcnLCBuZXcgRGF0ZSgwKS50b1VUQ1N0cmluZygpLCBwYXRoKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29va2llKGtleTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZS5yZXBsYWNlKG5ldyBSZWdFeHAoYCg/Oig/Ol58Lio7XFxcXHMqKSR7a2V5fVxcXFxzKlxcXFw9XFxcXHMqKFteO10qKS4qJCl8Xi4qJGApLCAnJDEnKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtFTVBUWSwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVG9rZW5SZWZyZXNoU2VydmljZSAge1xuXG4gIHJlcXVlc3RUb2tlblJlZnJlc2g8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4ocmVmcmVzaFRva2VuOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gRU1QVFk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RvcmFnZVR5cGUgfSBmcm9tICcuL3N0b3JhZ2UtdHlwZS5lbnVtJztcbmltcG9ydCB7IFN1YnNjcmliZXIsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFN0b3JhZ2VTZXJ2aWNlIH0gZnJvbSAnLi9zdG9yYWdlLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtUb2tlbnN9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHtUb2tlblJlZnJlc2hTZXJ2aWNlfSBmcm9tICcuL3Rva2VuLnJlZnJlc2guc2VydmljZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTaGFyZWRTZXJ2aWNlIHtcbiAgcHVibGljIHRva2VuTmFtZSA9IHRoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXhcbiAgICA/IFt0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuUHJlZml4LCB0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuTmFtZV0uam9pbih0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuU2VwYXJhdG9yKVxuICAgIDogdGhpcy5jb25maWcub3B0aW9ucy50b2tlbk5hbWU7XG4gIHB1YmxpYyByZWZyZXNoVG9rZW5OYW1lID0gdGhpcy5jb25maWcub3B0aW9ucy50b2tlblByZWZpeFxuICAgID8gW3RoaXMuY29uZmlnLm9wdGlvbnMudG9rZW5QcmVmaXgsIHRoaXMuY29uZmlnLm9wdGlvbnMucmVmcmVzaFRva2VuTmFtZV0uam9pbih0aGlzLmNvbmZpZy5vcHRpb25zLnRva2VuU2VwYXJhdG9yKVxuICAgIDogdGhpcy5jb25maWcub3B0aW9ucy5yZWZyZXNoVG9rZW5OYW1lO1xuXG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UsIHByaXZhdGUgdG9rZW5SZWZyZXNoU2VydmljZTogVG9rZW5SZWZyZXNoU2VydmljZSkge31cblxuICBwdWJsaWMgYXN5bmMgZ2V0UmVmcmVzaFRva2VuKCkge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMucmVmcmVzaFRva2VuTmFtZSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0VG9rZW4oKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc3RvcmFnZS5nZXQodGhpcy50b2tlbk5hbWUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFBheWxvYWQodG9rZW4/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICB9XG5cbiAgICBpZiAodG9rZW4gJiYgdG9rZW4uc3BsaXQoJy4nKS5sZW5ndGggPT09IDMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh0aGlzLmI2NERlY29kZVVuaWNvZGUoYmFzZTY0KSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFRva2VuKHJlc3BvbnNlOiBzdHJpbmcgfCBvYmplY3QpOlByb21pc2U8VG9rZW5zPiB7XG4gICAgaWYgKCFyZXNwb25zZSkge1xuICAgICAgLy8gY29uc29sZS53YXJuKCdDYW5cXCd0IHNldCB0b2tlbiB3aXRob3V0IHBhc3NpbmcgYSB2YWx1ZScpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHRva2VuczogVG9rZW5zO1xuICAgIGlmICh0eXBlb2YgcmVzcG9uc2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0b2tlbnMgPSB7YWNjZXNzVG9rZW46IHJlc3BvbnNlfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9rZW5zID0gdGhpcy5jb25maWcub3B0aW9ucy5yZXNvbHZlVG9rZW4ocmVzcG9uc2UsIHRoaXMuY29uZmlnLm9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICh0b2tlbnMuYWNjZXNzVG9rZW4pIHtcbiAgICAgIGNvbnN0IGV4cERhdGUgPSBhd2FpdCB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2Vucy5hY2Nlc3NUb2tlbik7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2Uuc2V0KHRoaXMudG9rZW5OYW1lLCB0b2tlbnMuYWNjZXNzVG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XG4gICAgfVxuXG4gICAgaWYgKHRva2Vucy5yZWZyZXNoVG9rZW4pIHtcbiAgICAgIGNvbnN0IGV4cERhdGUgPSBhd2FpdCB0aGlzLmdldEV4cGlyYXRpb25EYXRlKHRva2Vucy5yZWZyZXNoVG9rZW4pO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnNldCh0aGlzLnJlZnJlc2hUb2tlbk5hbWUsIHRva2Vucy5yZWZyZXNoVG9rZW4sIGV4cERhdGUgPyBleHBEYXRlLnRvVVRDU3RyaW5nKCkgOiAnJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VucztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZW1vdmVUb2tlbigpIHtcbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0ZWQodG9rZW4/OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRva2VuKSB7XG4gICAgICB0b2tlbiA9IGF3YWl0IHRoaXMuZ2V0VG9rZW4oKTtcbiAgICB9XG5cbiAgICAvLyBhIHRva2VuIGlzIHByZXNlbnRcbiAgICBpZiAodG9rZW4pIHtcbiAgICAgIGlmICh0aGlzLmlzVmFsaWRUb2tlbih0b2tlbikpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZnJlc2hUb2tlbiA9IGF3YWl0IHRoaXMuZ2V0UmVmcmVzaFRva2VuKCk7XG4gICAgICBpZiAocmVmcmVzaFRva2VuKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUb2tlbihyZWZyZXNoVG9rZW4pKSB7XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLnRva2VuUmVmcmVzaFNlcnZpY2UucmVxdWVzdFRva2VuUmVmcmVzaChyZWZyZXNoVG9rZW4pLnRvUHJvbWlzZSgpO1xuICAgICAgICAgIGNvbnN0IHRva2VucyA9IGF3YWl0IHRoaXMuc2V0VG9rZW4ocmVzcG9uc2UpO1xuXG4gICAgICAgICAgcmV0dXJuIHRva2VucyAmJiB0aGlzLmlzVmFsaWRUb2tlbih0b2tlbnMuYWNjZXNzVG9rZW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzLnJlZnJlc2hUb2tlbk5hbWUpO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1ZhbGlkVG9rZW4odG9rZW46IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIHRva2VuIHdpdGggYSB2YWxpZCBKV1QgZm9ybWF0IFhYWC5ZWVkuWlpaXG4gICAgaWYgKHRva2VuLnNwbGl0KCcuJykubGVuZ3RoID09PSAzKSB7XG4gICAgICAvLyBjb3VsZCBiZSBhIHZhbGlkIEpXVCBvciBhbiBhY2Nlc3MgdG9rZW4gd2l0aCB0aGUgc2FtZSBmb3JtYXRcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XG4gICAgICAgIGNvbnN0IGJhc2U2NCA9IGJhc2U2NFVybC5yZXBsYWNlKC8tL2csICcrJykucmVwbGFjZSgvXy9nLCAnLycpO1xuICAgICAgICBjb25zdCBleHAgPSBKU09OLnBhcnNlKHRoaXMuYjY0RGVjb2RlVW5pY29kZShiYXNlNjQpKS5leHA7XG4gICAgICAgIC8vIGp3dCB3aXRoIGFuIG9wdGlvbmFsIGV4cGlyYXRpb24gY2xhaW1zXG4gICAgICAgIGlmIChleHApIHtcbiAgICAgICAgICBjb25zdCBpc0V4cGlyZWQgPSBNYXRoLnJvdW5kKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMCkgPj0gZXhwO1xuICAgICAgICAgIHJldHVybiAhaXNFeHBpcmVkO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIHBhc3M6IE5vbi1KV1QgdG9rZW4gdGhhdCBsb29rcyBsaWtlIEpXVFxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gcGFzczogQWxsIG90aGVyIHRva2Vuc1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldEV4cGlyYXRpb25EYXRlKHRva2VuPzogc3RyaW5nKSB7XG4gICAgaWYgKCF0b2tlbikge1xuICAgICAgdG9rZW4gPSBhd2FpdCB0aGlzLmdldFRva2VuKCk7XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IGF3YWl0IHRoaXMuZ2V0UGF5bG9hZCh0b2tlbik7XG4gICAgaWYgKHBheWxvYWQgJiYgcGF5bG9hZC5leHAgJiYgTWF0aC5yb3VuZChuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApIDwgcGF5bG9hZC5leHApIHtcbiAgICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhwYXlsb2FkLmV4cCk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgbG9nb3V0KCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIE9ic2VydmFibGUuY3JlYXRlKGFzeW5jIChvYnNlcnZlcjogU3Vic2NyaWJlcjxhbnk+KSA9PiB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMudG9rZW5OYW1lKTtcbiAgICAgIG9ic2VydmVyLm5leHQoKTtcbiAgICAgIG9ic2VydmVyLmNvbXBsZXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgc2V0U3RvcmFnZVR5cGUodHlwZTogU3RvcmFnZVR5cGUpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLnVwZGF0ZVN0b3JhZ2VUeXBlKHR5cGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBiNjREZWNvZGVVbmljb2RlKHN0cikge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKGF0b2Ioc3RyKSwgYyA9PiAnJScgKyAoJzAwJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKSkuam9pbignJykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcblxuICAgIHJldHVybiBmcm9tKFByb21pc2UuYWxsKFt0aGlzLnNoYXJlZC5nZXRUb2tlbigpLCB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKV0pKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoYXV0aCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gYXV0aFswXTtcbiAgICAgICAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSBhdXRoWzFdO1xuXG4gICAgICAgICAgY29uc3QgbmV3UmVxID1cbiAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZCAmJiAhcmVxLmhlYWRlcnMuaGFzKGF1dGhIZWFkZXIpID8gcmVxLmNsb25lKHtzZXRIZWFkZXJzOiB7W2F1dGhIZWFkZXJdOiBgJHthdXRoVG9rZW59ICR7dG9rZW59YH19KSA6IHJlcTtcbiAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXNoYWRvd2VkLXZhcmlhYmxlICovXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBlbXB0eSwgZnJvbUV2ZW50LCBpbnRlcnZhbCwgbWVyZ2UsIE9ic2VydmFibGUsIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWxheSwgbWFwLCBzd2l0Y2hNYXAsIHRha2UgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJT2F1dGgxT3B0aW9ucywgSU9hdXRoMk9wdGlvbnMsIElQb3B1cE9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IGdldFdpbmRvd09yaWdpbiB9IGZyb20gJy4vdXRpbHMnO1xuXG5kZWNsYXJlIGNvbnN0IGNvcmRvdmE6IGFueTtcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBQb3B1cFNlcnZpY2Uge1xuICBwdWJsaWMgb3Blbih1cmw6IHN0cmluZywgb3B0aW9uczogSU9hdXRoMk9wdGlvbnMgfCBJT2F1dGgxT3B0aW9ucywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCkpIHtcbiAgICBjb25zdCBzdHJpbmdpZmllZE9wdGlvbnMgPSB0aGlzLnN0cmluZ2lmeU9wdGlvbnModGhpcy5wcmVwYXJlT3B0aW9ucyhvcHRpb25zLnBvcHVwT3B0aW9ucykpO1xuICAgIGNvbnN0IHdpbmRvd05hbWUgPSBjb3Jkb3ZhID8gJ19ibGFuaycgOiBvcHRpb25zLm5hbWU7XG5cbiAgICBjb25zdCBwb3B1cFdpbmRvdyA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93Lm9wZW4odXJsLCB3aW5kb3dOYW1lLCBzdHJpbmdpZmllZE9wdGlvbnMpIDogbnVsbDtcblxuICAgIGlmIChwb3B1cFdpbmRvdykge1xuICAgICAgaWYgKHBvcHVwV2luZG93LmZvY3VzKSB7XG4gICAgICAgIHBvcHVwV2luZG93LmZvY3VzKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gb2YocG9wdXBXaW5kb3cpO1xuICAgIH1cbiAgICByZXR1cm4gZW1wdHkoKTtcbiAgfVxuXG4gIHB1YmxpYyB3YWl0Rm9yQ2xvc2UocG9wdXBXaW5kb3c6IFdpbmRvdywgY29yZG92YSA9IHRoaXMuaXNDb3Jkb3ZhQXBwKCksIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcbiAgICByZXR1cm4gY29yZG92YSA/IHRoaXMuZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdywgcmVkaXJlY3RVcmkpIDogdGhpcy5wb2xsUG9wdXAocG9wdXBXaW5kb3csIHJlZGlyZWN0VXJpKTtcbiAgfVxuXG4gIHByaXZhdGUgZXZlbnRMaXN0ZW5lcihwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XG4gICAgaWYgKCFwb3B1cFdpbmRvdykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3B1cCB3YXMgbm90IGNyZWF0ZWQnKTtcbiAgICB9XG4gICAgcmV0dXJuIG1lcmdlKFxuICAgICAgZnJvbUV2ZW50PEV2ZW50Pihwb3B1cFdpbmRvdywgJ2V4aXQnKS5waXBlKFxuICAgICAgICBkZWxheSgxMDApLFxuICAgICAgICBtYXAoKCkgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQXV0aGVudGljYXRpb24gQ2FuY2VsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICksXG4gICAgICBmcm9tRXZlbnQocG9wdXBXaW5kb3csICdsb2Fkc3RhcnQnKVxuICAgICkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoZXZlbnQ6IEV2ZW50ICYgeyB1cmw6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUudGhyb3cobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQudXJsLmluZGV4T2YocmVkaXJlY3RVcmkpICE9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJzZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIHBhcnNlci5ocmVmID0gZXZlbnQudXJsO1xuXG4gICAgICAgIGlmIChwYXJzZXIuc2VhcmNoIHx8IHBhcnNlci5oYXNoKSB7XG4gICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBwYXJzZXIuc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwYXJzZXIuaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKGhhc2hQYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IHFzID0gdGhpcy5wYXJzZVF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XG5cbiAgICAgICAgICBwb3B1cFdpbmRvdy5jbG9zZSgpO1xuXG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICB9KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb2xsUG9wdXAocG9wdXBXaW5kb3c6IFdpbmRvdywgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xuICAgIHJldHVybiBpbnRlcnZhbCg1MCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgIGlmICghcG9wdXBXaW5kb3cgfHwgcG9wdXBXaW5kb3cuY2xvc2VkKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBvcHVwV2luZG93T3JpZ2luID0gZ2V0V2luZG93T3JpZ2luKHBvcHVwV2luZG93KTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgcG9wdXBXaW5kb3dPcmlnaW4gJiZcbiAgICAgICAgICAocmVkaXJlY3RVcmkuaW5kZXhPZihwb3B1cFdpbmRvd09yaWdpbikgPT09IDAgfHwgcG9wdXBXaW5kb3dPcmlnaW4uaW5kZXhPZihyZWRpcmVjdFVyaSkgPT09IDApICYmXG4gICAgICAgICAgKHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaCB8fCBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBvcHVwV2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvXFwvJC8sICcnKTtcbiAgICAgICAgICBjb25zdCBoYXNoUGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uaGFzaC5zdWJzdHJpbmcoMSkucmVwbGFjZSgvW1xcLyRdLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xuICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XG4gICAgICAgICAgY29uc3QgYWxsUGFyYW1zID0geyAuLi5xcywgLi4uaGFzaCB9O1xuICAgICAgICAgIGlmIChhbGxQYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHRocm93IGFsbFBhcmFtcy5lcnJvcjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG9mKGFsbFBhcmFtcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbXB0eSgpO1xuICAgICAgfSksXG4gICAgICB0YWtlKDEpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcHJlcGFyZU9wdGlvbnMob3B0aW9ucz86IElQb3B1cE9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCB3aWR0aCA9IG9wdGlvbnMud2lkdGggfHwgNTAwO1xuICAgIGNvbnN0IGhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IDUwMDtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBsZWZ0OiB3aW5kb3cuc2NyZWVuWCArICh3aW5kb3cub3V0ZXJXaWR0aCAtIHdpZHRoKSAvIDIsXG4gICAgICB0b3A6IHdpbmRvdy5zY3JlZW5ZICsgKHdpbmRvdy5vdXRlckhlaWdodCAtIGhlaWdodCkgLyAyLjUsXG4gICAgICB0b29sYmFyOiBvcHRpb25zLnZpc2libGVUb29sYmFyID8gJ3llcycgOiAnbm8nLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIHN0cmluZ2lmeU9wdGlvbnMob3B0aW9uczogeyBbaW5kZXg6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW4gfCBudWxsIHwgdW5kZWZpbmVkIH0pIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMob3B0aW9ucylcbiAgICAgIC5tYXAoa2V5ID0+IChvcHRpb25zW2tleV0gPT09IG51bGwgfHwgb3B0aW9uc1trZXldID09PSB1bmRlZmluZWQgPyBrZXkgOiBrZXkgKyAnPScgKyBvcHRpb25zW2tleV0pKVxuICAgICAgLmpvaW4oJywnKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VRdWVyeVN0cmluZyhqb2luZWRLZXlWYWx1ZTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQga2V5O1xuICAgIGxldCB2YWx1ZTtcbiAgICByZXR1cm4gam9pbmVkS2V5VmFsdWUuc3BsaXQoJyYnKS5yZWR1Y2UoXG4gICAgICAob2JqLCBrZXlWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoa2V5VmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGtleVZhbHVlLnNwbGl0KCc9Jyk7XG4gICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlWzBdKTtcbiAgICAgICAgICBvYmpba2V5XSA9IHR5cGVvZiB2YWx1ZVsxXSAhPT0gJ3VuZGVmaW5lZCcgPyBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMV0pIDogdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfSxcbiAgICAgIHt9IGFzIHsgW2s6IHN0cmluZ106IHN0cmluZyB8IHRydWUgfVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzQ29yZG92YUFwcCgpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvcmRvdmEgPT09ICdvYmplY3QnIHx8IChkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cDovLycpID09PSAtMSAmJiBkb2N1bWVudC5VUkwuaW5kZXhPZignaHR0cHM6Ly8nKSA9PT0gLTEpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAsIHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElPYXV0aDFPcHRpb25zIH0gZnJvbSAnLi9jb25maWctaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcbmltcG9ydCB7IFBvcHVwU2VydmljZSB9IGZyb20gJy4vcG9wdXAuc2VydmljZSc7XG5pbXBvcnQgeyBidWlsZFF1ZXJ5U3RyaW5nLCBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPYXV0aDFTZXJ2aWNlIGltcGxlbWVudHMgSU9hdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBwcm90ZWN0ZWQgcG9wdXA6IFBvcHVwU2VydmljZSwgcHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBvcGVuPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIHVzZXJEYXRhOiBvYmplY3QpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBzZXJ2ZXJVcmwgPSB0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwgPyBqb2luVXJsKHRoaXMuY29uZmlnLm9wdGlvbnMuYmFzZVVybCwgb2F1dGhPcHRpb25zLnVybCkgOiBvYXV0aE9wdGlvbnMudXJsO1xuICAgIHJldHVybiB0aGlzLnBvcHVwLm9wZW4oJ2Fib3V0OmJsYW5rJywgb2F1dGhPcHRpb25zLCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEpLnBpcGUoXG4gICAgICBzd2l0Y2hNYXAocG9wdXBXaW5kb3cgPT5cbiAgICAgICAgdGhpcy5odHRwLnBvc3Q8b2JqZWN0PihzZXJ2ZXJVcmwsIG9hdXRoT3B0aW9ucykucGlwZShcbiAgICAgICAgICB0YXAoYXV0aG9yaXphdGlvbkRhdGEgPT5cbiAgICAgICAgICAgIHBvcHVwV2luZG93XG4gICAgICAgICAgICAgID8gcG9wdXBXaW5kb3cubG9jYXRpb24ucmVwbGFjZShbb2F1dGhPcHRpb25zLmF1dGhvcml6YXRpb25FbmRwb2ludCwgYnVpbGRRdWVyeVN0cmluZyhhdXRob3JpemF0aW9uRGF0YSldLmpvaW4oJz8nKSlcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWRcbiAgICAgICAgICApLFxuICAgICAgICAgIHN3aXRjaE1hcChhdXRob3JpemF0aW9uRGF0YSA9PlxuICAgICAgICAgICAgdGhpcy5wb3B1cFxuICAgICAgICAgICAgICAud2FpdEZvckNsb3NlKHBvcHVwV2luZG93LCB0aGlzLmNvbmZpZy5vcHRpb25zLmNvcmRvdmEsIG9hdXRoT3B0aW9ucy5yZWRpcmVjdFVyaSlcbiAgICAgICAgICAgICAgLnBpcGUobWFwKG9hdXRoRGF0YSA9PiAoeyBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhIH0pKSlcbiAgICAgICAgICApXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSB9KSA9PiB0aGlzLmV4Y2hhbmdlRm9yVG9rZW48VD4ob2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSkpXG4gICAgKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBleGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9uczogSU9hdXRoMU9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XG4gICAgY29uc3QgYm9keSA9IHsgb2F1dGhPcHRpb25zLCBhdXRob3JpemF0aW9uRGF0YSwgb2F1dGhEYXRhLCB1c2VyRGF0YSB9O1xuICAgIGNvbnN0IHsgd2l0aENyZWRlbnRpYWxzLCBiYXNlVXJsIH0gPSB0aGlzLmNvbmZpZy5vcHRpb25zO1xuICAgIGNvbnN0IHsgbWV0aG9kID0gJ1BPU1QnLCB1cmwgfSA9IG9hdXRoT3B0aW9ucztcbiAgICBjb25zdCBleGNoYW5nZUZvclRva2VuVXJsID0gYmFzZVVybCA/IGpvaW5VcmwoYmFzZVVybCwgdXJsKSA6IHVybDtcbiAgICByZXR1cm4gdGhpcy5odHRwLnJlcXVlc3Q8VD4obWV0aG9kLCBleGNoYW5nZUZvclRva2VuVXJsLCB7IGJvZHksIHdpdGhDcmVkZW50aWFscyB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSU9hdXRoMk9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiwgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XG4gICAgY29uc3QgdXJsID0gW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/Jyk7XG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh3aW5kb3c/OiBXaW5kb3cpID0+XG4gICAgICAgIHdpbmRvdyA/IHRoaXMucG9wdXAud2FpdEZvckNsb3NlKHdpbmRvdywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLCBvYXV0aE9wdGlvbnMucmVkaXJlY3RVcmkpIDogZW1wdHkoKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXG4gICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxuICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xuICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aCBcInN0YXRlXCIgbWlzbWF0Y2gnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XG4gICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcbiAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnLFxuICAgICAgY2xpZW50SWQsXG4gICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxuICAgICAgc2NvcGVEZWxpbWl0ZXIgPSAnLCcsXG4gICAgICBzY29wZSxcbiAgICAgIHN0YXRlLFxuICAgICAgYWRkaXRpb25hbFVybFBhcmFtc1xuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XG4gICAgcmV0dXJuIFtcbiAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXG4gICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcbiAgICAgIFsncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RVcmldLFxuICAgICAgLi4uKHN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSksXG4gICAgICAuLi4oc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSksXG4gICAgICAuLi4oYWRkaXRpb25hbFVybFBhcmFtc1xuICAgICAgICA/IE9iamVjdC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9IChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBbXSlcbiAgICBdXG4gICAgICAuZmlsdGVyKF8gPT4gISFfWzBdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQge21hcFRvLCBzd2l0Y2hNYXAsIHN3aXRjaE1hcFRvLCB0YXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IE9hdXRoMVNlcnZpY2UgfSBmcm9tICcuL29hdXRoMS5zZXJ2aWNlJztcbmltcG9ydCB7IE9hdXRoMlNlcnZpY2UgfSBmcm9tICcuL29hdXRoMi5zZXJ2aWNlJztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBJT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC1zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE9hdXRoU2VydmljZSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXBQcm92aWRlcnMgPSBbXG4gICAgeyBwcm92aWRlOiBIdHRwQ2xpZW50LCB1c2VWYWx1ZTogdGhpcy5odHRwIH0sXG4gICAgeyBwcm92aWRlOiBQb3B1cFNlcnZpY2UsIHVzZVZhbHVlOiB0aGlzLnBvcHVwIH0sXG4gICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VWYWx1ZTogdGhpcy5jb25maWcgfVxuICBdO1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZGVwcyA9IFtIdHRwQ2xpZW50LCBQb3B1cFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBwcm90ZWN0ZWQgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcm90ZWN0ZWQgY29uZmlnOiBDb25maWdTZXJ2aWNlLCBwcm90ZWN0ZWQgcG9wdXA6IFBvcHVwU2VydmljZSkge31cblxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmc+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICBjb25zdCBwcm92aWRlcjogSU9hdXRoU2VydmljZSA9IHRoaXMucHJvdmlkZXJPZihuYW1lKTtcblxuICAgIHJldHVybiBwcm92aWRlci5vcGVuPFQ+KHRoaXMuY29uZmlnLm9wdGlvbnMucHJvdmlkZXJzW25hbWVdLCB1c2VyRGF0YSB8fCB7fSkucGlwZShcbiAgICAgIHN3aXRjaE1hcChyZXNwb25zZSA9PiB7XG4gICAgICAgIC8vIHRoaXMgaXMgZm9yIGEgc2NlbmFyaW8gd2hlbiBzb21lb25lIHdpc2hlcyB0byBvcHQgb3V0IGZyb21cbiAgICAgICAgLy8gc2F0ZWxsaXplcidzIG1hZ2ljIGJ5IGRvaW5nIGF1dGhvcml6YXRpb24gY29kZSBleGNoYW5nZSBhbmRcbiAgICAgICAgLy8gc2F2aW5nIGEgdG9rZW4gbWFudWFsbHkuXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5vcHRpb25zLnByb3ZpZGVyc1tuYW1lXS51cmwpIHtcbiAgICAgICAgICByZXR1cm4gZnJvbSh0aGlzLnNoYXJlZC5zZXRUb2tlbihyZXNwb25zZSkpLnBpcGUobWFwVG8ocmVzcG9uc2UpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvZihyZXNwb25zZSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcHJvdmlkZXJPZihuYW1lOiBzdHJpbmcpOiBJT2F1dGhTZXJ2aWNlIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3B0aW9ucy5wcm92aWRlcnNbbmFtZV0ub2F1dGhUeXBlID09PSAnMS4wJ1xuICAgICAgPyBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFsuLi50aGlzLmRlcFByb3ZpZGVycywgeyBwcm92aWRlOiBPYXV0aDFTZXJ2aWNlLCBkZXBzOiB0aGlzLmRlcHMgfV0gfSkuZ2V0KE9hdXRoMVNlcnZpY2UpXG4gICAgICA6IEluamVjdG9yLmNyZWF0ZSh7IHByb3ZpZGVyczogWy4uLnRoaXMuZGVwUHJvdmlkZXJzLCB7IHByb3ZpZGU6IE9hdXRoMlNlcnZpY2UsIGRlcHM6IHRoaXMuZGVwcyB9XSB9KS5nZXQoT2F1dGgyU2VydmljZSk7XG4gIH1cblxuICBwdWJsaWMgdW5saW5rPFQ+KHByb3ZpZGVyOiBzdHJpbmcsIHVybCA9IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnVubGlua1VybCksIG1ldGhvZCA9ICdQT1NUJykge1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIHVybCwgeyBib2R5OiB7IHByb3ZpZGVyIH0gfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi9zaGFyZWQuc2VydmljZSc7XG5pbXBvcnQgeyBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBqb2luVXJsIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBMb2NhbFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdD4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAucG9zdDxUPih1cmwgfHwgam9pblVybCh0aGlzLmNvbmZpZy5vcHRpb25zLmJhc2VVcmwsIHRoaXMuY29uZmlnLm9wdGlvbnMubG9naW5VcmwpLCB1c2VyKVxuICAgICAgLnBpcGUodGFwKGRhdGEgPT4gdGhpcy5zaGFyZWQuc2V0VG9rZW4oZGF0YSkpKTtcbiAgfVxuXG4gIHB1YmxpYyBzaWdudXA8VCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3Q8VD4odXJsIHx8IGpvaW5VcmwodGhpcy5jb25maWcub3B0aW9ucy5iYXNlVXJsLCB0aGlzLmNvbmZpZy5vcHRpb25zLnNpZ251cFVybCksIHVzZXIpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2NhbFNlcnZpY2UgfSBmcm9tICcuL2xvY2FsLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IFN0b3JhZ2VUeXBlIH0gZnJvbSAnLi9zdG9yYWdlLXR5cGUuZW51bSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBdXRoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGxvY2FsOiBMb2NhbFNlcnZpY2UsIHByaXZhdGUgb2F1dGg6IE9hdXRoU2VydmljZSkge31cblxuICBwdWJsaWMgbG9naW48VCBleHRlbmRzIHN0cmluZyB8IG9iamVjdCA9IGFueT4odXNlcjogc3RyaW5nIHwgb2JqZWN0LCB1cmw/OiBzdHJpbmcpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5sb2NhbC5sb2dpbjxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIHNpZ251cDxUID0gYW55Pih1c2VyOiBzdHJpbmcgfCBvYmplY3QsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLmxvY2FsLnNpZ251cDxUPih1c2VyLCB1cmwpO1xuICB9XG5cbiAgcHVibGljIGxvZ291dCgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZWQubG9nb3V0KCk7XG4gIH1cblxuICBwdWJsaWMgYXV0aGVudGljYXRlPFQgZXh0ZW5kcyBvYmplY3QgfCBzdHJpbmcgPSBhbnk+KG5hbWU6IHN0cmluZywgdXNlckRhdGE/OiBhbnkpOiBPYnNlcnZhYmxlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy5vYXV0aC5hdXRoZW50aWNhdGU8VD4obmFtZSwgdXNlckRhdGEpO1xuICB9XG5cbiAgcHVibGljIGxpbms8VCBleHRlbmRzIG9iamVjdCB8IHN0cmluZyA9IGFueT4obmFtZTogc3RyaW5nLCB1c2VyRGF0YT86IGFueSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLmF1dGhlbnRpY2F0ZTxUPihuYW1lLCB1c2VyRGF0YSk7XG4gIH1cblxuICBwdWJsaWMgdW5saW5rPFQgPSBhbnk+KHByb3ZpZGVyOiBzdHJpbmcsIHVybD86IHN0cmluZyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiB0aGlzLm9hdXRoLnVubGluazxUPihwcm92aWRlciwgdXJsKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBpc0F1dGhlbnRpY2F0ZWQoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmlzQXV0aGVudGljYXRlZCgpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFRva2VuKCk6IFByb21pc2U8c3RyaW5nIHwgbnVsbD4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5nZXRUb2tlbigpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNldFRva2VuKHRva2VuOiBzdHJpbmcgfCBvYmplY3QpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNoYXJlZC5zZXRUb2tlbih0b2tlbik7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVtb3ZlVG9rZW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5zaGFyZWQucmVtb3ZlVG9rZW4oKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRQYXlsb2FkKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldFBheWxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzZXRTdG9yYWdlVHlwZSh0eXBlOiBTdG9yYWdlVHlwZSk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnNoYXJlZC5zZXRTdG9yYWdlVHlwZSh0eXBlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRFeHBpcmF0aW9uRGF0ZSgpOiBQcm9taXNlPERhdGUgfCBudWxsPiB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuc2hhcmVkLmdldEV4cGlyYXRpb25EYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50TW9kdWxlLCBIVFRQX0lOVEVSQ0VQVE9SUyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IElDb25maWdPcHRpb25zLCBJUGFydGlhbENvbmZpZ09wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IENPTkZJR19PUFRJT05TLCBDb25maWdTZXJ2aWNlIH0gZnJvbSAnLi9jb25maWcuc2VydmljZSc7XG5pbXBvcnQgeyBTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vc3RvcmFnZS1zZXJ2aWNlJztcbmltcG9ydCB7IEJyb3dzZXJTdG9yYWdlU2VydmljZSB9IGZyb20gJy4vYnJvd3Nlci1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgSnd0SW50ZXJjZXB0b3IgfSBmcm9tICcuL2ludGVyY2VwdG9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2F1dGhTZXJ2aWNlIH0gZnJvbSAnLi9vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IEh0dHBDbGllbnQgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBQb3B1cFNlcnZpY2UgfSBmcm9tICcuL3BvcHVwLnNlcnZpY2UnO1xuaW1wb3J0IHsgTG9jYWxTZXJ2aWNlIH0gZnJvbSAnLi9sb2NhbC5zZXJ2aWNlJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbSHR0cENsaWVudE1vZHVsZV0sXG4gIGRlY2xhcmF0aW9uczogW10sXG4gIGV4cG9ydHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5nMlVpQXV0aE1vZHVsZSB7XG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZ09wdGlvbnM/OiBJUGFydGlhbENvbmZpZ09wdGlvbnMsIGRlZmF1bHRKd3RJbnRlcmNlcHRvciA9IHRydWUpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nMlVpQXV0aE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICAuLi4oY29uZmlnT3B0aW9ucyA/IFt7IHByb3ZpZGU6IENPTkZJR19PUFRJT05TLCB1c2VWYWx1ZTogY29uZmlnT3B0aW9ucyB9XSA6IFtdKSxcbiAgICAgICAgeyBwcm92aWRlOiBDb25maWdTZXJ2aWNlLCB1c2VDbGFzczogQ29uZmlnU2VydmljZSwgZGVwczogW0NPTkZJR19PUFRJT05TXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IFN0b3JhZ2VTZXJ2aWNlLCB1c2VDbGFzczogQnJvd3NlclN0b3JhZ2VTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBTaGFyZWRTZXJ2aWNlLCB1c2VDbGFzczogU2hhcmVkU2VydmljZSwgZGVwczogW1N0b3JhZ2VTZXJ2aWNlLCBDb25maWdTZXJ2aWNlXSB9LFxuICAgICAgICB7IHByb3ZpZGU6IExvY2FsU2VydmljZSwgdXNlQ2xhc3M6IExvY2FsU2VydmljZSwgZGVwczogW0h0dHBDbGllbnQsIFNoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogUG9wdXBTZXJ2aWNlLCB1c2VDbGFzczogUG9wdXBTZXJ2aWNlLCBkZXBzOiBbQ29uZmlnU2VydmljZV0gfSxcbiAgICAgICAgeyBwcm92aWRlOiBPYXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBPYXV0aFNlcnZpY2UsIGRlcHM6IFtIdHRwQ2xpZW50LCBTaGFyZWRTZXJ2aWNlLCBDb25maWdTZXJ2aWNlLCBQb3B1cFNlcnZpY2VdIH0sXG4gICAgICAgIHsgcHJvdmlkZTogQXV0aFNlcnZpY2UsIHVzZUNsYXNzOiBBdXRoU2VydmljZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIExvY2FsU2VydmljZSwgT2F1dGhTZXJ2aWNlXSB9LFxuICAgICAgICAuLi4oZGVmYXVsdEp3dEludGVyY2VwdG9yXG4gICAgICAgICAgPyBbeyBwcm92aWRlOiBIVFRQX0lOVEVSQ0VQVE9SUywgdXNlQ2xhc3M6IEp3dEludGVyY2VwdG9yLCBtdWx0aTogdHJ1ZSwgZGVwczogW1NoYXJlZFNlcnZpY2UsIENvbmZpZ1NlcnZpY2VdIH1dXG4gICAgICAgICAgOiBbXSlcbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLFNBQWdCLE9BQU8sQ0FBQyxPQUFlLEVBQUUsR0FBVztJQUNsRCxJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxPQUFPLEdBQUcsQ0FBQztLQUNaOztVQUVLLE1BQU0sR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBRXZDLE9BQU8sTUFBTTtTQUNWLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDO1NBQ3RCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDO1NBQ3JCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDNUI7Ozs7O0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsR0FBVztJQUMxQyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxD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