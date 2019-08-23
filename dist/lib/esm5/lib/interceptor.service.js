/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { ConfigService } from './config.service';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
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
export { JwtInterceptor };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJjZXB0b3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzb2FhL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL2ludGVyY2VwdG9yLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsSUFBSSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6QztJQUVFLHdCQUFvQixNQUFxQixFQUFVLE1BQXFCO1FBQXBELFdBQU0sR0FBTixNQUFNLENBQWU7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQUcsQ0FBQzs7Ozs7O0lBRTVFLGtDQUFTOzs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUMxQyxJQUFBLHdCQUErQyxFQUE3QywwQkFBVSxFQUFFLHdCQUFpQztRQUVyRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5RSxJQUFJLENBQ0gsU0FBUyxDQUFDLFVBQUMsSUFBSTs7O2dCQUNQLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDOztnQkFDZixlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpCLE1BQU0sR0FDVixlQUFlLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFDLFVBQVUsWUFBRyxHQUFDLFVBQVUsSUFBTSxTQUFTLFNBQUksS0FBTyxLQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHO1lBQzFILE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM3QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQzs7Z0JBbEJGLFVBQVU7Ozs7Z0JBTEYsYUFBYTtnQkFDYixhQUFhOztJQXVCdEIscUJBQUM7Q0FBQSxBQW5CRCxJQW1CQztTQWxCWSxjQUFjOzs7Ozs7SUFDYixnQ0FBNkI7Ozs7O0lBQUUsZ0NBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwUmVxdWVzdCwgSHR0cEhhbmRsZXIsIEh0dHBFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IFNoYXJlZFNlcnZpY2UgfSBmcm9tICcuL3NoYXJlZC5zZXJ2aWNlJztcbmltcG9ydCB7IENvbmZpZ1NlcnZpY2UgfSBmcm9tICcuL2NvbmZpZy5zZXJ2aWNlJztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3N3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSnd0SW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNoYXJlZDogU2hhcmVkU2VydmljZSwgcHJpdmF0ZSBjb25maWc6IENvbmZpZ1NlcnZpY2UpIHt9XG5cbiAgaW50ZXJjZXB0KHJlcTogSHR0cFJlcXVlc3Q8YW55PiwgbmV4dDogSHR0cEhhbmRsZXIpOiBPYnNlcnZhYmxlPEh0dHBFdmVudDxhbnk+PiB7XG4gICAgY29uc3QgeyBhdXRoSGVhZGVyLCBhdXRoVG9rZW4gfSA9IHRoaXMuY29uZmlnLm9wdGlvbnM7XG5cbiAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChbdGhpcy5zaGFyZWQuZ2V0VG9rZW4oKSwgdGhpcy5zaGFyZWQuaXNBdXRoZW50aWNhdGVkKCldKSlcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoKGF1dGgpID0+IHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IGF1dGhbMF07XG4gICAgICAgICAgY29uc3QgaXNBdXRoZW50aWNhdGVkID0gYXV0aFsxXTtcblxuICAgICAgICAgIGNvbnN0IG5ld1JlcSA9XG4gICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQgJiYgIXJlcS5oZWFkZXJzLmhhcyhhdXRoSGVhZGVyKSA/IHJlcS5jbG9uZSh7c2V0SGVhZGVyczoge1thdXRoSGVhZGVyXTogYCR7YXV0aFRva2VufSAke3Rva2VufWB9fSkgOiByZXE7XG4gICAgICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKG5ld1JlcSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9XG59XG4iXX0=