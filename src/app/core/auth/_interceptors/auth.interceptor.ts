
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { StorageService } from '../_services';

import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(
		private storageService: StorageService,
		private router: Router
	) {
	}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authReq = req;
		const token = this.storageService.getToken();
		if (token != null) {
			// for Spring Boot back-end
			authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });

		}
		return next.handle(authReq).pipe(
			catchError(
				(err, caught) => {
					if (err.status === 401) {
						this.handleAuthError();
						return of(err);
					}
					throw err;
				}
			)
		);
	}
	private handleAuthError() {
		this.storageService.signOut();
		this.router.navigateByUrl('/auth/login');
	}

}

export const AuthInterceptorProviders = [
	{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
