// Angular
import { Component, Input, OnInit } from '@angular/core';

import { AuthService, User } from '../../../../../core/auth';


@Component({
	selector: 'kt-user-profile',
	templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
	// Public properties
	user: User;

	@Input() avatar: boolean = true;
	@Input() greeting: boolean = true;
	@Input() badge: boolean;
	@Input() icon: boolean;

	/**
	 * Component constructor
	 *
	 * @param store: Store<AppState>
	 */
	constructor(private userAuthService: AuthService) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit(): void {
		this.user = this.userAuthService.getLoggedInUser();
	}

	/**
	 * Log out
	 */
	logout() {
		this.userAuthService.logout();
	}
}
