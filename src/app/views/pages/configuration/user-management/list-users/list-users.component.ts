import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../core/auth/_services';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UserService } from '../../../services/security/user.service';


@Component({
	selector: 'kt-list-users',
	templateUrl: './list-users.component.html',
	styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

	searchForm: FormGroup;
	usersList: Array<any>;
	onOperation: boolean = false;

	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;



	// Subscriptions
	private subscriptions: Subscription[] = [];


	constructor(
		private cdr: ChangeDetectorRef,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private userService: UserService,
		private notifier: NotificationService,
		private creator: ComponentBase<CreateUserComponent>) {
	}

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.usersList = [];
		this.searchForm = this.fb.group({
			username: [''],
			fullName: [''],
			email: ['']
		});

	}

	/**
	 * On Destroy
	 */
	ngOnDestroy() {
		this.subscriptions.forEach(el => el.unsubscribe());
	}


	/**
	 * Redirect to edit page
	 *
	 * @param id
	 */

	editUser(id) {
		this.onOperation = true;

		const comp = this.creator.Construct(CreateUserComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.userIds.next(id);
	}

	createUser() {
		this.onOperation = true;

		const comp = this.creator.Construct(CreateUserComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	searchUsers() {
		if (this.searchForm.valid) {
			this.userService.search(this.searchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.usersList = d.data;
							this.cdr.markForCheck();
						}
					},
					error: err => {
						console.log(err);
					}
				});
		}
	}

	resetPassword(id) {
		this.notifier.confirm({
			message: "Are You Sure You Want To Reset This User Password?",
			ok: () => {
				this.userService.resetPassword({ id: id }).subscribe(val => {
					if (val.successful) {
						this.notifier.success("Users Password Is Successfully Resat!");
					}
				});
			}
		})
	}
}
