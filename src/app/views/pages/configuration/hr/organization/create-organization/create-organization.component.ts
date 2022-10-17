import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { OrgUnitService } from './../../../../services/asset/hr/org-unit.service';

@Component({
	selector: 'kt-create-organization',
	templateUrl: './create-organization.component.html',
	styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

	id: Subject<number>;
	editable: boolean;
	organizationForm: FormGroup;
	result: Subject<any>;
	orgunittype = [];
	orgunit = [];
	formTitle: string;

	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private orgunitService: OrgUnitService,
		private lookListService: LookListService,
		private cdf: ChangeDetectorRef
	) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "ثبت ریاست/آمریت جدید";
		this.result = new Subject<any>();
		this.initializeForm();
	}


	initializeForm() {
		this.organizationForm = this.fb.group({
			id: '',
			orgUnitTypeId: ['', Validators.required],
			name: ['', Validators.required],
			parentId: [''],
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	organizationList() {
		this.orgunitService.getList({}).subscribe((res) => {
			this.orgunit = res.data;
		})

	}
	orgUnitTypeList() {

		this.lookListService.getUnitTypeList().subscribe((res) => {
			this.orgunittype = res;
		})

	}

	newOrganization() {
		this.organizationForm.reset()
	}

	isControlHasError(controlName, type) {
		const control = this.organizationForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


	ngOnInit() {

		this.organizationList();
		this.orgUnitTypeList();

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = "ویرایش ریاست/آمریت";
				this.orgunitService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.organizationForm.patchValue({
								id: val.data.id,
								orgUnitTypeId: val.data.orgUnitTypeId,
								name: val.data.name,
								parentId: val.data.parentId,
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

		const controls = this.organizationForm.controls;
		/** check form */
		if (this.organizationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.orgunitService.save(this.organizationForm.value).subscribe({
			next: val => {
				if (val.successful) {

					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.organizationForm.patchValue({
						id: val.data.id,
						orgUnitTypeId: val.data.orgUnitTypeId,
						name: val.data.name,
						parentId: val.data.parentId,
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
