// Angular
import { Component, OnInit, Input } from '@angular/core';
// RxJS
import { BehaviorSubject, Observable, Subject } from 'rxjs';

// Auth
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-user-roles-list',
	templateUrl: './user-roles-list.component.html'
})
export class UserRolesListComponent implements OnInit {
	userId: Subject<number> = new Subject<number>();
	curUserID: number = -1;
	// Public properties
	// Incoming data
	// Roles
	allRoles: Array<any>;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor() {
		this.userId.subscribe(next => {
			this.curUserID = next;
			this.loadUserRoles(next);
		});
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {

	}

	loadUserRoles(id: number) {

	}

	delete(id: number) {

	}

	addNewRole() {

	}
}
