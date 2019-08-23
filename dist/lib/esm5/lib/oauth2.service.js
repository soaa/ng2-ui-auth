/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { PopupService } from './popup.service';
import { buildQueryString, getWindowOrigin, joinUrl } from './utils';
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
        return tslib_1.__spread([
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
            return (tslib_1.__assign({}, acc, (_a = {}, _a[next[0]] = next[1], _a)));
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
export { Oauth2Service };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    Oauth2Service.prototype.http;
    /**
     * @type {?}
     * @protected
     */
    Oauth2Service.prototype.popup;
    /**
     * @type {?}
     * @protected
     */
    Oauth2Service.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2F1dGgyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Ac29hYS9uZzItdWktYXV0aC8iLCJzb3VyY2VzIjpbImxpYi9vYXV0aDIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQWMsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXJFO0lBRUUsdUJBQXNCLElBQWdCLEVBQVksS0FBbUIsRUFBWSxNQUFxQjtRQUFoRixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVksVUFBSyxHQUFMLEtBQUssQ0FBYztRQUFZLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBRyxDQUFDOzs7Ozs7O0lBRTFHLDRCQUFJOzs7Ozs7SUFBSixVQUFzQyxZQUE0QixFQUFFLFFBQWdCO1FBQXBGLGlCQXNCQzs7WUFyQk8saUJBQWlCLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQzs7WUFDM0QsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQy9GLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8s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O2dCQUMzRixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtvQkFDN0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztpQkFDckI7cUJBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxVQUFVLEVBQUU7b0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO29CQUN6QixPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNsQjtnQkFDRCxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2xCLENBQUMsQ0FBQztZQUNKLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFFTixNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFOLENBQU0sQ0FBQzthQUNuQixNQUFNLENBQUMsVUFBQyxHQUFHLEVBQUUsSUFBSTs7WUFBSyxPQUFBLHNCQUFNLEdBQUcsZUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFHO1FBQWhDLENBQWdDLEVBQUUsbUJBQUEsRUFBRSxFQUE2QixDQUFDLENBQUM7SUFDOUYsQ0FBQzs7Z0JBckVGLFVBQVU7Ozs7Z0JBVkYsVUFBVTtnQkFPVixZQUFZO2dCQUZaLGFBQWE7O0lBMkV0QixvQkFBQztDQUFBLEFBdEVELElBc0VDO1NBckVZLGFBQWE7Ozs7OztJQUNaLDZCQUEwQjs7Ozs7SUFBRSw4QkFBNkI7Ozs7O0lBQUUsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVtcHR5LCBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSU9hdXRoMk9wdGlvbnMgfSBmcm9tICcuL2NvbmZpZy1pbnRlcmZhY2VzJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7IElPYXV0aFNlcnZpY2UgfSBmcm9tICcuL29hdXRoLXNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wdXBTZXJ2aWNlIH0gZnJvbSAnLi9wb3B1cC5zZXJ2aWNlJztcbmltcG9ydCB7IGJ1aWxkUXVlcnlTdHJpbmcsIGdldFdpbmRvd09yaWdpbiwgam9pblVybCB9IGZyb20gJy4vdXRpbHMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT2F1dGgyU2VydmljZSBpbXBsZW1lbnRzIElPYXV0aFNlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgcHJvdGVjdGVkIHBvcHVwOiBQb3B1cFNlcnZpY2UsIHByb3RlY3RlZCBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgb3BlbjxUIGV4dGVuZHMgb2JqZWN0IHwgc3RyaW5nID0gYW55PihvYXV0aE9wdGlvbnM6IElPYXV0aDJPcHRpb25zLCB1c2VyRGF0YTogb2JqZWN0KTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgY29uc3QgYXV0aG9yaXphdGlvbkRhdGEgPSB0aGlzLmdldEF1dGhvcml6YXRpb25EYXRhKG9hdXRoT3B0aW9ucyk7XG4gICAgY29uc3QgdXJsID0gW29hdXRoT3B0aW9ucy5hdXRob3JpemF0aW9uRW5kcG9pbnQsIGJ1aWxkUXVlcnlTdHJpbmcoYXV0aG9yaXphdGlvbkRhdGEpXS5qb2luKCc/Jyk7XG4gICAgcmV0dXJuIHRoaXMucG9wdXAub3Blbih1cmwsIG9hdXRoT3B0aW9ucywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCh3aW5kb3c/OiBXaW5kb3cpID0+XG4gICAgICAgIHdpbmRvdyA/IHRoaXMucG9wdXAud2FpdEZvckNsb3NlKHdpbmRvdywgdGhpcy5jb25maWcub3B0aW9ucy5jb3Jkb3ZhLCBvYXV0aE9wdGlvbnMucmVkaXJlY3RVcmkpIDogZW1wdHkoKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgob2F1dGhEYXRhOiBhbnkpID0+IHtcbiAgICAgICAgLy8gd2hlbiBubyBzZXJ2ZXIgVVJMIHByb3ZpZGVkLCByZXR1cm4gcG9wdXAgcGFyYW1zIGFzLWlzLlxuICAgICAgICAvLyB0aGlzIGlzIGZvciBhIHNjZW5hcmlvIHdoZW4gc29tZW9uZSB3aXNoZXMgdG8gb3B0IG91dCBmcm9tXG4gICAgICAgIC8vIHNhdGVsbGl6ZXIncyBtYWdpYyBieSBkb2luZyBhdXRob3JpemF0aW9uIGNvZGUgZXhjaGFuZ2UgYW5kXG4gICAgICAgIC8vIHNhdmluZyBhIHRva2VuIG1hbnVhbGx5LlxuICAgICAgICBpZiAob2F1dGhPcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3Rva2VuJyB8fCAhb2F1dGhPcHRpb25zLnVybCkge1xuICAgICAgICAgIHJldHVybiBvZihvYXV0aERhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9hdXRoRGF0YS5zdGF0ZSAmJiBvYXV0aERhdGEuc3RhdGUgIT09IGF1dGhvcml6YXRpb25EYXRhLnN0YXRlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPQXV0aCBcInN0YXRlXCIgbWlzbWF0Y2gnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5leGNoYW5nZUZvclRva2VuPFQ+KG9hdXRoT3B0aW9ucywgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJvdGVjdGVkIGV4Y2hhbmdlRm9yVG9rZW48VD4ob3B0aW9uczogSU9hdXRoMk9wdGlvbnMsIGF1dGhvcml6YXRpb25EYXRhOiBvYmplY3QsIG9hdXRoRGF0YTogb2JqZWN0LCB1c2VyRGF0YTogb2JqZWN0KSB7XG4gICAgY29uc3QgYm9keSA9IHsgYXV0aG9yaXphdGlvbkRhdGEsIG9hdXRoRGF0YSwgdXNlckRhdGEgfTtcbiAgICBjb25zdCB7IGJhc2VVcmwsIHdpdGhDcmVkZW50aWFscyB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcbiAgICBjb25zdCB7IHVybCwgbWV0aG9kID0gJ1BPU1QnIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IGV4Y2hhbmdlRm9yVG9rZW5VcmwgPSBiYXNlVXJsID8gam9pblVybChiYXNlVXJsLCB1cmwpIDogdXJsO1xuICAgIHJldHVybiB0aGlzLmh0dHAucmVxdWVzdDxUPihtZXRob2QsIGV4Y2hhbmdlRm9yVG9rZW5VcmwsIHsgYm9keSwgd2l0aENyZWRlbnRpYWxzIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldEF1dGhvcml6YXRpb25EYXRhKG9wdGlvbnM6IElPYXV0aDJPcHRpb25zKSB7XG4gICAgY29uc3Qge1xuICAgICAgcmVzcG9uc2VUeXBlID0gJ2NvZGUnLFxuICAgICAgY2xpZW50SWQsXG4gICAgICByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpIHx8ICcnLFxuICAgICAgc2NvcGVEZWxpbWl0ZXIgPSAnLCcsXG4gICAgICBzY29wZSxcbiAgICAgIHN0YXRlLFxuICAgICAgYWRkaXRpb25hbFVybFBhcmFtc1xuICAgIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IHJlc29sdmVkU3RhdGUgPSB0eXBlb2Ygc3RhdGUgPT09ICdmdW5jdGlvbicgPyBzdGF0ZSgpIDogc3RhdGU7XG4gICAgcmV0dXJuIFtcbiAgICAgIFsncmVzcG9uc2VfdHlwZScsIHJlc3BvbnNlVHlwZV0sXG4gICAgICBbJ2NsaWVudF9pZCcsIGNsaWVudElkXSxcbiAgICAgIFsncmVkaXJlY3RfdXJpJywgcmVkaXJlY3RVcmldLFxuICAgICAgLi4uKHN0YXRlID8gW1snc3RhdGUnLCByZXNvbHZlZFN0YXRlXV0gOiBbXSksXG4gICAgICAuLi4oc2NvcGUgPyBbWydzY29wZScsIHNjb3BlLmpvaW4oc2NvcGVEZWxpbWl0ZXIpXV0gOiBbXSksXG4gICAgICAuLi4oYWRkaXRpb25hbFVybFBhcmFtc1xuICAgICAgICA/IE9iamVjdC5rZXlzKGFkZGl0aW9uYWxVcmxQYXJhbXMpLm1hcChrZXkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdmFsdWU6IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpIHwgbnVsbCB8IHVuZGVmaW5lZCA9IChhZGRpdGlvbmFsVXJsUGFyYW1zIGFzIGFueSlba2V5XTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCB2YWx1ZV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICByZXR1cm4gW2tleSwgdmFsdWUoKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBba2V5LCAnJ107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWycnLCAnJ107XG4gICAgICAgICAgfSlcbiAgICAgICAgOiBbXSlcbiAgICBdXG4gICAgICAuZmlsdGVyKF8gPT4gISFfWzBdKVxuICAgICAgLnJlZHVjZSgoYWNjLCBuZXh0KSA9PiAoeyAuLi5hY2MsIFtuZXh0WzBdXTogbmV4dFsxXSB9KSwge30gYXMgeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSk7XG4gIH1cbn1cbiJdfQ==