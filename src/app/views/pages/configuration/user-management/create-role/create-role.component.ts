import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { RoleService } from './../../../services/security/role.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
	selector: 'kt-create-role',
	templateUrl: './create-role.component.html',
	styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {

	createForm: FormGroup;
	result: Subject<any> = new Subject<any>();
	recordId: BehaviorSubject<number> = new BehaviorSubject<number>(0);

	title: string;

	constructor(private fb: FormBuilder,
		private roleService: RoleService,
		private notifier: NotificationService,
		private cdr: ChangeDetectorRef) {
	}

	ngOnInit() {
		this.title = 'ایجاد نقش جدید';
		this.createForm = this.fb.group({
			id: [''],
			name: ['', Validators.required]
		});

		this.recordId.subscribe({
			next: val => {
				if (val > 0) {
					this.title = "Edit Role";
					this.roleService.findById({ id: val }).subscribe(next => {
						if (next.successful) {
							this.createForm.patchValue(next.data);
							this.cdr.markForCheck();
						}
					});
				}
			}
		});
	}

	back() {
		this.result.next(-1);
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
		this.roleService.save(this.createForm.value).subscribe(next => {
			if (next.successful) {
				this.title = "Edit Role";
				this.createForm.patchValue(next.data);
				this.notifier.success("Role Saved Successfully!");
				this.cdr.markForCheck();
			}
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
