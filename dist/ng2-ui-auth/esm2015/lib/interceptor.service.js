/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
export class JwtInterceptor {
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    JwtInterceptor.prototype.shared;
    /**
     * @type {?}
     * @private
     */
    JwtInterceptor.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL2ludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsSUFBSSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6QyxNQUFNLE9BQU8sY0FBYzs7Ozs7SUFDekIsWUFBb0IsTUFBcUIsRUFBVSxNQUFxQjtRQUFwRCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZTtJQUFHLENBQUM7Ozs7OztJQUU1RSxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtjQUMxQyxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU87UUFFckQsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDOUUsSUFBSSxDQUNILFNBQVMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztrQkFDWCxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7a0JBQ2YsZUFBZSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7O2tCQUV6QixNQUFNLEdBQ1YsZUFBZSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQyxVQUFVLEVBQUUsRUFBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsU0FBUyxJQUFJLEtBQUssRUFBRSxFQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO1lBQzFILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7O1lBbEJGLFVBQVU7Ozs7WUFMRixhQUFhO1lBQ2IsYUFBYTs7Ozs7OztJQU1SLGdDQUE2Qjs7Ozs7SUFBRSxnQ0FBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBSZXF1ZXN0LCBIdHRwSGFuZGxlciwgSHR0cEV2ZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgU2hhcmVkU2VydmljZSB9IGZyb20gJy4vc2hhcmVkLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnU2VydmljZSB9IGZyb20gJy4vY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcbmltcG9ydCB7c3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBKd3RJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2hhcmVkOiBTaGFyZWRTZXJ2aWNlLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnU2VydmljZSkge31cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBjb25zdCB7IGF1dGhIZWFkZXIsIGF1dGhUb2tlbiB9ID0gdGhpcy5jb25maWcub3B0aW9ucztcblxuICAgIHJldHVybiBmcm9tKFByb21pc2UuYWxsKFt0aGlzLnNoYXJlZC5nZXRUb2tlbigpLCB0aGlzLnNoYXJlZC5pc0F1dGhlbnRpY2F0ZWQoKV0pKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcCgoYXV0aCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRva2VuID0gYXV0aFswXTtcbiAgICAgICAgICBjb25zdCBpc0F1dGhlbnRpY2F0ZWQgPSBhdXRoWzFdO1xuXG4gICAgICAgICAgY29uc3QgbmV3UmVxID1cbiAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZCAmJiAhcmVxLmhlYWRlcnMuaGFzKGF1dGhIZWFkZXIpID8gcmVxLmNsb25lKHtzZXRIZWFkZXJzOiB7W2F1dGhIZWFkZXJdOiBgJHthdXRoVG9rZW59ICR7dG9rZW59YH19KSA6IHJlcTtcbiAgICAgICAgICByZXR1cm4gbmV4dC5oYW5kbGUobmV3UmVxKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==