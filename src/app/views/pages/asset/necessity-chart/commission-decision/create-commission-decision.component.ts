import { ProcessEntity } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NecessityChartService } from '../../../services/asset/necessity-chart/necessity-chart.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { LookListService } from '../../../services/asset/look/look-list.service'
import { OrgUnitService } from '../../../services/asset/hr/org-unit.service';
import { NecessityChartDetailService } from '../../../services/asset/necessity-chart/necessity-chart-detail.service';

@Component({
	selector: 'kt-create-commission-decision',
	templateUrl: './create-commission-decision.component.html',
	styleUrls: ['./create-commission-decision.component.scss']
})
export class CreateCommissionDecisionComponent implements OnInit {
	@Output() passEntry: EventEmitter<any> = new EventEmitter();

	id: Subject<number>;
	formTitle: string;
	commisionDecisionForm: FormGroup;
	detailsModel: FormArray;
	editable: boolean;
	result: Subject<any>;
	itemDetailIdList = [];
	fiscalyearquarter = [];
	orgunit = [];
	fiscalyear = [];
	unitType = [];
	btnDisabled: boolean;

	// formData: FormData;

	constructor(
		private fb: FormBuilder,
		private necessityChartService: NecessityChartService,
		private necessityChartDetailService: NecessityChartDetailService,
		private cdf: ChangeDetectorRef,
		public activeModel: NgbActiveModal,
		private notify: NotificationService,
		private modalService: NgbModal,
		private lookListService: LookListService,
		private orgUnitService: OrgUnitService,
		private processTrackingService: ProcessTrackingService
	) {
		this.initializeForm();
		this.result = new Subject<any>();
		this.editable = false;
		this.id = new BehaviorSubject(0);
		this.formTitle = 'ویرایش چارت';

	}


	ngOnInit() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.necessityChartService.findCommissionDecision({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.processTracking(val.data.id, val.data.stageId)
							this.commisionDecisionForm.patchValue(val.data);
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

	initializeForm() {
		this.commisionDecisionForm = this.fb.group({
			id: [''],
			orgUnitText: [''],
			fiscalYearText: [''],
			detailsModel: this.fb.array([this.createItem()]),
		});
		this.detailsModel = this.commisionDecisionForm.get('detailsModel') as FormArray;
	}

	createItem(): FormGroup {
		return this.fb.group({
			id: '',
			fiscalYearQuarterText: [''],
			itemDetailId: '',
			itemDetailText: '',
			requestedQuantity: '',
			commissionDecision: ['', Validators.required],
			description: '',
			unitText: '',
			baseQuantity: '',
			baseUnitText: ''
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

	submit(index) {

		const controls = this.detailsModel.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		let data = this.commisionDecisionForm.get('detailsModel').value;
		let record = data[index]
		const requstData = ({ necessityChartDetailId: record.id, commissionDecision: record.commissionDecision });
		this.necessityChartDetailService.savedecision(requstData).subscribe({
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
	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.NecessityChart);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}

}
