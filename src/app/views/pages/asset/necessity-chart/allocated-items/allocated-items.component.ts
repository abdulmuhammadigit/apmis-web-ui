import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { NecessityChartDetailService } from '../../../services/asset/necessity-chart/necessity-chart-detail.service';
import { NecessityChartService } from '../../../services/asset/necessity-chart/necessity-chart.service';


@Component({
	selector: 'kt-allocated-items',
	templateUrl: './allocated-items.component.html',
	styleUrls: ['./allocated-items.component.scss']
})
export class AllocatedItemsComponent implements OnInit {

	id: Subject<number>;
	formTitle: string;
	submittedItemsForm: FormGroup;
	detailsModel: FormArray;
	editable: boolean;
	result: Subject<any>;
	itemDetailIdList = [];
	fiscalyearquarter = [];
	orgunit = [];
	fiscalyear = [];
	unitType = [];


	constructor(
		private fb: FormBuilder,
		private necessityChartDetailService: NecessityChartDetailService,
		private necessityChartService: NecessityChartService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService,
	) {
		this.initializeForm();
		this.result = new Subject<any>();
		this.editable = false;
		this.id = new BehaviorSubject(0);
		this.formTitle = 'ویرایش چارت';

	}


	ngOnInit() {

		this.findData();
	}

	initializeForm() {
		this.submittedItemsForm = this.fb.group({
			id: [''],
			orgUnitText: [''],
			fiscalYearText: [''],
			detailsModel: this.fb.array([this.createItem()]),
		});
		this.detailsModel = this.submittedItemsForm.get('detailsModel') as FormArray;
	}

	createItem(): FormGroup {
		return this.fb.group({
			id: '',
			fiscalYearQuarterText: [''],
			itemDetailId: '',
			itemDetailText: '',
			requestedQuantity: '',
			commissionDecision: [''],
			description: '',
			unitText: '',
			baseQuantity: '',
			baseUnitText: '',
			submitedQuantity: ['', Validators.required]
		});
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.detailsModel.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


	findData() {
		// this code is used for update data
		this.id.subscribe(next => {
			if (next != 0) {
				this.necessityChartService.findCommissionDecision({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.submittedItemsForm.patchValue(val.data);
							this.detailsModel.clear();
							val.data.detailModelList.map((item) => {
								let formArray = this.createItem();
								formArray.patchValue(item);
								this.detailsModel.push(formArray);
							})
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


	submit(index) {
		debugger;
		const controls = this.detailsModel.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		let data = this.submittedItemsForm.get('detailsModel').value;
		let record = data[index]
		const requstData = ({ necessityChartDetailId: record.id, commissionDecision: record.submitedQuantity });
		this.necessityChartDetailService.saveSubmited(requstData).subscribe({
			next: data => {
				if (data.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}


	//utility
	cancelClick() {
		this.result.next(-1);
	}

}
