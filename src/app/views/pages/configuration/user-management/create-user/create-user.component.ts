import { LookListService } from './../../../services/asset/look/look-list.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { StageService } from './../../../services/process-tracking/stage.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { UserService } from '../../../services/security/user.service';
import { RoleService } from '../../../services/security/role.service';
import { EmployeeService } from '../../../services/asset/hr/employee.service';

@Component({
	selector: 'kt-create-user',
	templateUrl: './create-user.component.html',
	styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

	instList: any;
	opTypeList: any = [
		{ id: 1, label: "Any" }
	];
	rolesList: any = [];
	stagesList: any = [];
	employeeList: any = [];
	userIds: Subject<number>;

	userForm: FormGroup;

	hasFormErrors = false;

	formTitle: string;
	result: Subject<any>;

	constructor(
		private fb: FormBuilder,
		private translator: TranslateService,
		private userService: UserService,
		private cdr: ChangeDetectorRef,
		private roleService: RoleService,
		private lookListService: LookListService,
		private notifier: NotificationService,
		private stageService: StageService,
		private employeeService: EmployeeService,
	) {
		this.userIds = new BehaviorSubject(null);
		this.result = new Subject<any>();
	}

	async ngOnInit() {

		this.formTitle = 'ایجاد کاربر جدید';
		this.userForm = this.fb.group({
			id: [''],
			username: ['', Validators.required],
			fullName: ['', Validators.required],
			email: ['', Validators.compose([Validators.required, Validators.email])],
			phone: ['', Validators.compose([Validators.required, Validators.pattern('')])],
			institutionId: [null, Validators.required],
			operationTypeId: [null, Validators.required],
			employeeId: ['', Validators.required],
			isAdmin: [false],
			passwordExpired: [false],
			disabled: [false],
			roleIds: [[]],
			stageIds: [[]]
		});
		let iResult = await this.lookListService.getOrganizationList().toPromise();
		this.instList = iResult;
		// let iResult = await this.institutionService.getList({}).toPromise();
		// if (iResult.successful) {
		// 	this.instList = iResult.data.map(cur => {
		// 		return { id: cur.id, label: cur.applicationId + '-' + cur.description };
		// 	});
		// }
		let eResult = await this.employeeService.search({}).toPromise();
		if (eResult.successful) {
			this.employeeList = eResult.data;
		}


		let rResult = await this.roleService.getList({}).toPromise();
		if (rResult.successful) {
			this.rolesList = rResult.data;
		}

		let sResult = await this.stageService.getList({}).toPromise();
		if (sResult.successful) {
			this.stagesList = sResult.data.map(e => {
				return {
					id: e.id,
					name: `[${e.name}]-(type = ${e.stageTypeText})`,
					workFlow: e.workFlowText
				};
			});
		}

		this.userIds.subscribe(next => {
			if (next != null) {
				this.formTitle = 'Edit User';
				this.userService.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.userForm.patchValue(val.data);
							this.cdr.detectChanges();
						}
					}
				})
			}
		});
	}

	saveForm() {
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.userService.save(this.userForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.userForm.patchValue(val.data);
					this.notifier.success("User Saved Successfully!");
				}
			}
		});

	}

	cancelClick() {
		this.result.next(-1);
	}

	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.userForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(validationType) && (control.dirty || control.touched);
	}


}
