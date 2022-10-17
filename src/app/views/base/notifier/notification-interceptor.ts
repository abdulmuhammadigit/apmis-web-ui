import { NotificationService } from './../../../core/_base/layout/services/notification.service';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
	constructor(
		private notifier: NotificationService
	) {

	}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(tap(next => {
			let body = next["body"];
			if (body && body.successful != undefined && body.successful === false) {
				if (body.error) {
					this.notifier.error(body.error);
				}
				else {
					this.notifier.error("An Error Occurred!");
				}

			}
		}));
	}
}

export const NotificationInterceptorProvider = [
	{ provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true }
];

