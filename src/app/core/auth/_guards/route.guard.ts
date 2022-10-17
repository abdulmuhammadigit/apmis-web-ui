// Angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Permission } from '../_models/permission.model';
import { find } from 'lodash';

@Injectable()
export class RouteGuard implements CanActivate {
    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        const moduleName = route.data['moduleName'] as string;
        if (!moduleName) {
            return of(false);
        }
        //REMAIN:
        return null;
    }
}
