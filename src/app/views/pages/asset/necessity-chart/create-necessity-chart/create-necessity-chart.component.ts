import { ProcessEntity } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { NecessityChartDetailService } from './../../../services/asset/necessity-chart/necessity-chart-detail.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, of, Subject } from "rxjs";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NecessityChartService } from '../../../services/asset/necessity-chart/necessity-chart.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { OrgUnitService } from '../../../../pages/services/asset/hr/org-unit.service';
import { SearchItemDetailComponent } from '../../item/search-item-detail/search-item-detail.component';
import { PrintNecessityChartComponent } from '../print-necessity-chart/print-necessity-chart/print-necessity-chart.component';


@Component({
	selector: 'kt-create-necessity-chart',
	templateUrl: './create-necessity-chart.component.html',
	styleUrls: ['./create-necessity-chart.component.scss']
})
export class CreateNecessityChartComponent implements OnInit {
	closeResult: string;
	modalOptions: NgbModalOptions;

	id: Subject<number>;
	hideDetail: boolean = true;
	detailsModel: FormArray;
	chartForm: FormGroup;
	result: Subject<any>;
	public fiscalyearquarter = [];
	public orgunit = [];
	public fiscalyear = [];
	public unit = [];
	public Editor = ClassicEditor;
	btnDisabled: boolean = true;
	formTitle: string;

	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private necessityChartService: NecessityChartService,
		private necessityChartDetailService: NecessityChartDetailService,
		private lookListService: LookListService,
		private orgUnitService: OrgUnitService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService,
		private processTrackingService: ProcessTrackingService
	) {

		this.id = new BehaviorSubject(0);
		this.result = new Subject<any>();
		this.formTitle = "ثبت چارت صرفیه ";
		this.result = new Subject<any>();
		this.initializeForm();

	}

	ngOnInit() {
		// load look
		this.getfiscalyearquarterList();
		this.getorgunitList();
		this.getfiscalyearList();
		this.getUnitList();
		this.findData();
		this.detailsModel.clear();
	}

	// form initialization
	initializeForm() {
		this.chartForm = this.fb.group({
			id: [''],
			code: [''],
			orgUnitId: ['', Validators.required],
			fiscalYearId: ['', Validators.required],

			detailsModel: this.fb.array([this.initializeDetailForm()]),
		});
		this.detailsModel = this.chartForm.get('detailsModel') as FormArray;
	}

	initializeDetailForm(): FormGroup {
		return this.fb.group({
			id: [''],
			necessityChartId: [''],
			fiscalYearQuarterId: ['', Validators.required],
			itemDetailId: ['', Validators.required],
			itemDetailText: ['', Validators.required],
			requestedQuantity: ['', Validators.required],
			unitId: ['', Validators.required],
			description: [''],
			baseQuantity: ['']
		});
	}

	// look list
	getfiscalyearquarterList() {
		this.lookListService.getFiscalYearQuarterList().subscribe((res) => {
			this.fiscalyearquarter = res;
		})
	}

	getorgunitList() {
		this.orgUnitService.getList({}).subscribe((res) => {
			this.orgunit = res.data;
		})
	}

	getfiscalyearList() {
		this.lookListService.getFiscalYearList().subscribe((res) => {
			this.fiscalyear = res;
		})
	}

	getUnitList() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unit = res;
		})
	}

	//utility
	cancelClick() {
		this.result.next(-1);
	}

	addIDetailtem() {
		this.detailsModel.push(this.initializeDetailForm());
	}


	isControlHasError(controlName, type) {
		const control = this.chartForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.detailsModel.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	// operations
	searchItemDetail(index) {
		const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				this.detailsModel.at(index).patchValue({
					itemDetailId: result.id,
					itemDetailText: result.detail
				});
			}
		})
	}
	printNecessityChart() {
		const modalRef = this.modalService.open(PrintNecessityChartComponent, { size: 'xl' });
		let id = (this.chartForm.get('id').value)
		modalRef.componentInstance.id.next(id);
	}

	submitChart() {
		const controls = this.chartForm.controls;
		/** check form */
		if (this.chartForm.invalid) {
			Object.keys(controls).forEach(controlName => {
				controls[controlName].markAsTouched()
			}
			);
			return;
		}
		this.necessityChartService.save(this.chartForm.value).subscribe({
			next: data => {
				if (data.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.processTracking(data.data.id, data.data.stageId);

					this.chartForm.patchValue({
						id: data.data.id,
						code: data.data.code,
						orgUnitId: data.data.orgUnitId,
						fiscalYearQuarterId: data.data.fiscalYearQuarterId,
						fiscalYearId: data.data.fiscalYearId,
					});
					this.hideDetail = false;
					this.btnDisabled = false;
					this.cdf.markForCheck();
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});

	}
	submitChartDetail(index) {
		const controls = this.detailsModel.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		let record = (this.chartForm.get('detailsModel').value)[index];
		record.necessityChartId = this.chartForm.get('id').value;

		this.necessityChartDetailService.save(record).subscribe({
			next: data => {
				if (data.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");

					this.detailsModel.at(index).patchValue({
						id: data.data.id,
						necessityChartId: data.data.necessityChartId,
						itemDetailId: data.data.itemDetailId,
						itemDetailText: data.data.itemDetailText,
						requestedQuantity: data.data.requestedQuantity,
						baseQuantity: data.data.baseQuantity,
						unitId: data.data.unitId,
						description: data.data.description
					});
					this.btnDisabled = false;
					this.cdf.markForCheck();
				}
			},
			error: er => {
				this.notify.error(er);
				this.cdf.markForCheck();
			}
		});
	}

	removeDetailItem(index) {
		this.notify.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				let record = (this.chartForm.get('detailsModel').value)[index];
				if (record.id == "" || record.id == 0) {
					this.detailsModel.removeAt(index);
					this.cdf.markForCheck();

				} else {
					this.necessityChartDetailService.delete({ id: record.id }).subscribe({
						next: val => {
							if (val.successful) {
								this.notify.success("معلومات موفقانه حذف گردید!");
								this.detailsModel.removeAt(index);
								this.cdf.markForCheck();

							}

						},
						error: err => {
							this.notify.error(err);
						}
					})
				}
			}
		});
	}

	findData() {
		// this code is used for update data
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش چارت صرفیه';
				this.necessityChartService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.processTracking(val.data.id, val.data.stageId)
							this.chartForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								orgUnitId: val.data.orgUnitId,
								fiscalYearQuarterId: val.data.fiscalYearQuarterId,
								fiscalYearId: val.data.fiscalYearId,
							});
							this.detailsModel.clear();
							val.data.detailModelList.map((item) => {
								let formArray = this.initializeDetailForm();
								formArray.patchValue(item);
								this.detailsModel.push(formArray);
							})

							this.hideDetail = false;
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});

	}

	newRecord() {
		this.processTrackingService.clear();
		this.hideDetail = true;
		this.chartForm.patchValue({
			id: '',
			code: '',
			orgUnitId: '',
			fiscalYearQuarterId: '',
			fiscalYearId: '',
		});
		this.detailsModel.clear();
	}
	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.NecessityChart);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}

}
