// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { AuthService } from '../_services';

import { tap, map } from 'rxjs/operators';
import { Permission } from '../_models/permission.model';
import { find } from 'lodash';

@Injectable()
export class ModuleGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

		let flag = this.authService.checkUserRolePage(state.url);

		return of(flag)
			.pipe(
				tap(flag => {
					if (!flag) {
						this.router.navigateByUrl('/dashboard');
					}
				})
			);
	}
}
