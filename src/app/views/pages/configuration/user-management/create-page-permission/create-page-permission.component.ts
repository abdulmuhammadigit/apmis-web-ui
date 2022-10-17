import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RolePageEntityPermissionService } from '../../../services/security/role-page-entity-permission.service';
import { RolePageService } from '../../../services/security/role-page.service';

@Component({
	selector: 'kt-create-page-permission',
	templateUrl: './create-page-permission.component.html',
	styleUrls: ['./create-page-permission.component.scss']
})
export class CreatePagePermissionComponent implements OnInit {
	recordId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

	createForm: FormGroup;

	entities: any;

	entitySelectList: any;
	permissionSelectList: any;

	constructor(private fb: FormBuilder,
		private rolePagePermissionService: RolePageEntityPermissionService,
		private rolePageService: RolePageService,
		private notifier: NotificationService,
		private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.entitySelectList = [];
		this.permissionSelectList = [];

		this.createForm = this.fb.group({
			entityId: [null, Validators.required],
			permissionIds: [[]],
		});

		this.recordId$.subscribe({
			next: val => {
				if (val != null) {
					this.rolePageService.getRolePageEntities({ rolePageId: val })
						.subscribe(next => {
							if (next.successful) {
								this.entities = next.data;
								this.entitySelectList = this.entities.map(c => { return { id: c.id, title: c.title } });
								this.cdr.detectChanges();
							}
						});
				}
			}
		});
	}

	save() {
		const controls = this.createForm.controls;
		/** check form */
		if (this.createForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		const vals = this.createForm.value;
		vals['rolePageId'] = this.recordId$.getValue();
		this.rolePagePermissionService.save(vals)
			.subscribe(cur => {
				this.notifier.success("Permissions Saved Successfully!");
			})
	}

	entityChanged() {
		const control = this.createForm.controls['entityId'];
		const permissions = this.createForm.controls['permissionIds'];
		let er = this.entities.filter(e => e.id == control.value)[0];
		if (er) {
			this.permissionSelectList = er.permissions.map(c => { return { id: c.id, title: c.title }; });
		}
		else {
			this.permissionSelectList = [];
		}
		this.cdr.detectChanges();
		this.rolePagePermissionService.search({ rolePageId: this.recordId$.getValue(), entityId: control.value })
			.subscribe(cur => {
				permissions.patchValue(cur.data.map(e => e.entityPermissionId));
			});

	}

	isControlHasError(controlName, type) {
		const control = this.createForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
}
