import { EmployeeService } from '././../../../../services/asset/hr/employee.service';
import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { OrgUnitService } from './../../../../services/asset/hr/org-unit.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-create-employee',
	templateUrl: './create-employee.component.html',
	styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

	id: Subject<number>;
	editable: boolean;
	EmployeeForm: FormGroup;
	result: Subject<any>;
	orgunit = [];
	formTitle: string;


	constructor(
		private fb: FormBuilder,
		private employeeService: EmployeeService,
		private notify: NotificationService,
		private orgunitService: OrgUnitService,
		private cdf: ChangeDetectorRef,
		private translate: TranslateService

	) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "ثبت کارمند جدید ";
		this.result = new Subject<any>();
		this.initializeForm();

	}

	initializeForm() {
		this.EmployeeForm = this.fb.group({
			id: '',
			code: '',
			name: ['', Validators.required],
			lastName: [''],
			fatherName: [''],
			grandFatherName: [''],
			position: ['', Validators.required],
			orgUnitId: ['', Validators.required],
			cardId: ['']
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	getorganizationname() {
		this.orgunitService.getList({}).subscribe((res) => {
			this.orgunit = res.data;
		})

	}

	newEmployee() {
		this.EmployeeForm.reset()
	}

	isControlHasError(controlName, type) {
		const control = this.EmployeeForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	ngOnInit() {

		this.getorganizationname();

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = "ویرایش کارمند";
				this.employeeService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.EmployeeForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								name: val.data.name,
								lastName: val.data.lastName,
								fatherName: val.data.fatherName,
								grandFatherName: val.data.grandFatherName,
								position: val.data.position,
								orgUnitId: val.data.orgUnitId,
								cardId: val.data.cardId
							});

							this.cdf.detectChanges();
							this.cdf.markForCheck();
							this.editable = true;
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});
	}


	submit() {

		const controls = this.EmployeeForm.controls;
		/** check form */
		if (this.EmployeeForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.employeeService.save(this.EmployeeForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.EmployeeForm.patchValue({
						id: val.data.id,
						code: val.data.code,
						name: val.data.name,
						lastName: val.data.lastName,
						fatherName: val.data.fatherName,
						grandFatherName: val.data.grandFatherName,
						position: val.data.position,
						orgUnitId: val.data.orgUnitId,
						cardId: val.data.cardId
					});
					this.cdf.markForCheck();
					this.editable = true;
				}
			},
			error: er => {
				this.notify.error(er);
				this.cdf.markForCheck();
			}
		});

	}

}
