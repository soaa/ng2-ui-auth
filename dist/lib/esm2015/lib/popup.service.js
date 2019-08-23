/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/* tslint:disable:no-shadowed-variable */
import { Injectable } from '@angular/core';
import { empty, fromEvent, interval, merge, Observable, of, throwError } from 'rxjs';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { getWindowOrigin } from './utils';
export class PopupService {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bzb2FhL25nMi11aS1hdXRoLyIsInNvdXJjZXMiOlsibGliL3BvcHVwLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDckYsT0FBTyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFJMUMsTUFBTSxPQUFPLFlBQVk7Ozs7Ozs7SUFDaEIsSUFBSSxDQUFDLEdBQVcsRUFBRSxPQUF3QyxFQUFFLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFOztjQUN4RixrQkFBa0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7O2NBQ3JGLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUk7O2NBRTlDLFdBQVcsR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO1FBRTNHLElBQUksV0FBVyxFQUFFO1lBQ2YsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNyQixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDckI7WUFDRCxPQUFPLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUN4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a0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDbEY7WUFDRCxPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsRUFDRCxtQkFBQSxFQUFFLEVBQWtDLENBQ3JDLENBQUM7SUFDSixDQUFDOzs7OztJQUVPLFlBQVk7UUFDbEIsT0FBTyxPQUFPLE9BQU8sS0FBSyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVILENBQUM7OztZQXhJRixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyogdHNsaW50OmRpc2FibGU6bm8tc2hhZG93ZWQtdmFyaWFibGUgKi9cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGVtcHR5LCBmcm9tRXZlbnQsIGludGVydmFsLCBtZXJnZSwgT2JzZXJ2YWJsZSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlbGF5LCBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IElPYXV0aDFPcHRpb25zLCBJT2F1dGgyT3B0aW9ucywgSVBvcHVwT3B0aW9ucyB9IGZyb20gJy4vY29uZmlnLWludGVyZmFjZXMnO1xuaW1wb3J0IHsgZ2V0V2luZG93T3JpZ2luIH0gZnJvbSAnLi91dGlscyc7XG5cbmRlY2xhcmUgY29uc3QgY29yZG92YTogYW55O1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvcHVwU2VydmljZSB7XG4gIHB1YmxpYyBvcGVuKHVybDogc3RyaW5nLCBvcHRpb25zOiBJT2F1dGgyT3B0aW9ucyB8IElPYXV0aDFPcHRpb25zLCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSkge1xuICAgIGNvbnN0IHN0cmluZ2lmaWVkT3B0aW9ucyA9IHRoaXMuc3RyaW5naWZ5T3B0aW9ucyh0aGlzLnByZXBhcmVPcHRpb25zKG9wdGlvbnMucG9wdXBPcHRpb25zKSk7XG4gICAgY29uc3Qgd2luZG93TmFtZSA9IGNvcmRvdmEgPyAnX2JsYW5rJyA6IG9wdGlvbnMubmFtZTtcblxuICAgIGNvbnN0IHBvcHVwV2luZG93ID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cub3Blbih1cmwsIHdpbmRvd05hbWUsIHN0cmluZ2lmaWVkT3B0aW9ucykgOiBudWxsO1xuXG4gICAgaWYgKHBvcHVwV2luZG93KSB7XG4gICAgICBpZiAocG9wdXBXaW5kb3cuZm9jdXMpIHtcbiAgICAgICAgcG9wdXBXaW5kb3cuZm9jdXMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvZihwb3B1cFdpbmRvdyk7XG4gICAgfVxuICAgIHJldHVybiBlbXB0eSgpO1xuICB9XG5cbiAgcHVibGljIHdhaXRGb3JDbG9zZShwb3B1cFdpbmRvdzogV2luZG93LCBjb3Jkb3ZhID0gdGhpcy5pc0NvcmRvdmFBcHAoKSwgcmVkaXJlY3RVcmkgPSBnZXRXaW5kb3dPcmlnaW4oKSkge1xuICAgIHJldHVybiBjb3Jkb3ZhID8gdGhpcy5ldmVudExpc3RlbmVyKHBvcHVwV2luZG93LCByZWRpcmVjdFVyaSkgOiB0aGlzLnBvbGxQb3B1cChwb3B1cFdpbmRvdywgcmVkaXJlY3RVcmkpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmVudExpc3RlbmVyKHBvcHVwV2luZG93OiBXaW5kb3csIHJlZGlyZWN0VXJpID0gZ2V0V2luZG93T3JpZ2luKCkpIHtcbiAgICBpZiAoIXBvcHVwV2luZG93KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BvcHVwIHdhcyBub3QgY3JlYXRlZCcpO1xuICAgIH1cbiAgICByZXR1cm4gbWVyZ2UoXG4gICAgICBmcm9tRXZlbnQ8RXZlbnQ+KHBvcHVwV2luZG93LCAnZXhpdCcpLnBpcGUoXG4gICAgICAgIGRlbGF5KDEwMCksXG4gICAgICAgIG1hcCgoKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBdXRoZW50aWNhdGlvbiBDYW5jZWxlZCcpO1xuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIGZyb21FdmVudChwb3B1cFdpbmRvdywgJ2xvYWRzdGFydCcpXG4gICAgKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChldmVudDogRXZlbnQgJiB7IHVybDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcbiAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChldmVudC51cmwuaW5kZXhPZihyZWRpcmVjdFVyaSkgIT09IDApIHtcbiAgICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgcGFyc2VyLmhyZWYgPSBldmVudC51cmw7XG5cbiAgICAgICAgaWYgKHBhcnNlci5zZWFyY2ggfHwgcGFyc2VyLmhhc2gpIHtcbiAgICAgICAgICBjb25zdCBxdWVyeVBhcmFtcyA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gICAgICAgICAgY29uc3QgaGFzaFBhcmFtcyA9IHBhcnNlci5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcoaGFzaFBhcmFtcyk7XG4gICAgICAgICAgY29uc3QgcXMgPSB0aGlzLnBhcnNlUXVlcnlTdHJpbmcocXVlcnlQYXJhbXMpO1xuICAgICAgICAgIGNvbnN0IGFsbFBhcmFtcyA9IHsgLi4ucXMsIC4uLmhhc2ggfTtcblxuICAgICAgICAgIHBvcHVwV2luZG93LmNsb3NlKCk7XG5cbiAgICAgICAgICBpZiAoYWxsUGFyYW1zLmVycm9yKSB7XG4gICAgICAgICAgICB0aHJvdyBhbGxQYXJhbXMuZXJyb3I7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBvZihhbGxQYXJhbXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW1wdHkoKTtcbiAgICAgIH0pLFxuICAgICAgdGFrZSgxKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHBvbGxQb3B1cChwb3B1cFdpbmRvdzogV2luZG93LCByZWRpcmVjdFVyaSA9IGdldFdpbmRvd09yaWdpbigpKSB7XG4gICAgcmV0dXJuIGludGVydmFsKDUwKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgaWYgKCFwb3B1cFdpbmRvdyB8fCBwb3B1cFdpbmRvdy5jbG9zZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRXJyb3IoJ0F1dGhlbnRpY2F0aW9uIENhbmNlbGVkJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcG9wdXBXaW5kb3dPcmlnaW4gPSBnZXRXaW5kb3dPcmlnaW4ocG9wdXBXaW5kb3cpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBwb3B1cFdpbmRvd09yaWdpbiAmJlxuICAgICAgICAgIChyZWRpcmVjdFVyaS5pbmRleE9mKHBvcHVwV2luZG93T3JpZ2luKSA9PT0gMCB8fCBwb3B1cFdpbmRvd09yaWdpbi5pbmRleE9mKHJlZGlyZWN0VXJpKSA9PT0gMCkgJiZcbiAgICAgICAgICAocG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoIHx8IHBvcHVwV2luZG93LmxvY2F0aW9uLmhhc2gpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gcG9wdXBXaW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9cXC8kLywgJycpO1xuICAgICAgICAgIGNvbnN0IGhhc2hQYXJhbXMgPSBwb3B1cFdpbmRvdy5sb2NhdGlvbi5oYXNoLnN1YnN0cmluZygxKS5yZXBsYWNlKC9bXFwvJF0vLCAnJyk7XG4gICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhoYXNoUGFyYW1zKTtcbiAgICAgICAgICBjb25zdCBxcyA9IHRoaXMucGFyc2VRdWVyeVN0cmluZyhxdWVyeVBhcmFtcyk7XG4gICAgICAgICAgcG9wdXBXaW5kb3cuY2xvc2UoKTtcbiAgICAgICAgICBjb25zdCBhbGxQYXJhbXMgPSB7IC4uLnFzLCAuLi5oYXNoIH07XG4gICAgICAgICAgaWYgKGFsbFBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgdGhyb3cgYWxsUGFyYW1zLmVycm9yO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gb2YoYWxsUGFyYW1zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVtcHR5KCk7XG4gICAgICB9KSxcbiAgICAgIHRha2UoMSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlT3B0aW9ucyhvcHRpb25zPzogSVBvcHVwT3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IHdpZHRoID0gb3B0aW9ucy53aWR0aCB8fCA1MDA7XG4gICAgY29uc3QgaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgNTAwO1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIGxlZnQ6IHdpbmRvdy5zY3JlZW5YICsgKHdpbmRvdy5vdXRlcldpZHRoIC0gd2lkdGgpIC8gMixcbiAgICAgIHRvcDogd2luZG93LnNjcmVlblkgKyAod2luZG93Lm91dGVySGVpZ2h0IC0gaGVpZ2h0KSAvIDIuNSxcbiAgICAgIHRvb2xiYXI6IG9wdGlvbnMudmlzaWJsZVRvb2xiYXIgPyAneWVzJyA6ICdubycsXG4gICAgICAuLi5vcHRpb25zXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc3RyaW5naWZ5T3B0aW9ucyhvcHRpb25zOiB7IFtpbmRleDogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB8IG51bGwgfCB1bmRlZmluZWQgfSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhvcHRpb25zKVxuICAgICAgLm1hcChrZXkgPT4gKG9wdGlvbnNba2V5XSA9PT0gbnVsbCB8fCBvcHRpb25zW2tleV0gPT09IHVuZGVmaW5lZCA/IGtleSA6IGtleSArICc9JyArIG9wdGlvbnNba2V5XSkpXG4gICAgICAuam9pbignLCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBwYXJzZVF1ZXJ5U3RyaW5nKGpvaW5lZEtleVZhbHVlOiBzdHJpbmcpOiBhbnkge1xuICAgIGxldCBrZXk7XG4gICAgbGV0IHZhbHVlO1xuICAgIHJldHVybiBqb2luZWRLZXlWYWx1ZS5zcGxpdCgnJicpLnJlZHVjZShcbiAgICAgIChvYmosIGtleVZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChrZXlWYWx1ZSkge1xuICAgICAgICAgIHZhbHVlID0ga2V5VmFsdWUuc3BsaXQoJz0nKTtcbiAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQodmFsdWVbMF0pO1xuICAgICAgICAgIG9ialtrZXldID0gdHlwZW9mIHZhbHVlWzFdICE9PSAndW5kZWZpbmVkJyA/IGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZVsxXSkgOiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9LFxuICAgICAge30gYXMgeyBbazogc3RyaW5nXTogc3RyaW5nIHwgdHJ1ZSB9XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNDb3Jkb3ZhQXBwKCkge1xuICAgIHJldHVybiB0eXBlb2YgY29yZG92YSA9PT0gJ29iamVjdCcgfHwgKGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwOi8vJykgPT09IC0xICYmIGRvY3VtZW50LlVSTC5pbmRleE9mKCdodHRwczovLycpID09PSAtMSk7XG4gIH1cbn1cbiJdfQ==