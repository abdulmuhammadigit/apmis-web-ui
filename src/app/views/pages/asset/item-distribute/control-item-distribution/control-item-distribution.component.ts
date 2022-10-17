import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { ProcessEntity } from './../../../../../../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemDistributionService } from '../../../services/asset/item-distribution/item-distribution.service';
import { ItemDistributionDetailService } from '../../../services/asset/item-distribution/item-distribution-detail.service';
import { ItemDistributedService } from '../../../services/asset/item-distribution/item-distributed.service';;
import { ItemRequestDetailService } from '../../../services/asset/item-request/item-request-detail.service';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';

@Component({
	selector: 'kt-control-item-distribution',
	templateUrl: './control-item-distribution.component.html',
	styleUrls: ['./control-item-distribution.component.scss']
})
export class ControlItemDistributionComponent implements OnInit {

	notDistributed: boolean;
	closeResult: string;
	modelOption: NgbModalOptions;
	id: Subject<number>;
	editable: boolean;
	result: Subject<any>;
	formTitle: string;
	thing: any;
	itemId: any;
	btnDisabled: boolean = true;
	itemDetailId: any;
	itemRequestId: any;
	itemRequestCode: any;
	itemRequestDetailId: any;
	itemDistributionId: any;
	itemSpecificationId: Array<any>;
	public itemDistributionForm: FormGroup;
	public itemDistributionDetailModelList: FormArray;
	public itemDetailIdList = [];
	public Editor = ClassicEditor;
	public dateConfigShamsi
	public dateConfigGregorian;
	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	setShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let shamsiDate = jMoment(date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
			if (this.itemDistributionForm.get('shamsiDate').value != shamsiDate)
				this.itemDistributionForm.get('shamsiDate').setValue(shamsiDate);
		}
	}

	setdate(shamsiDate: any) {
		let sDate: String = shamsiDate + "";
		if (sDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let date = jMoment(shamsiDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			if (this.itemDistributionForm.get('date').value != date)
				this.itemDistributionForm.get('date').setValue(date);
		}
	}


	constructor(private fb: FormBuilder,
		private itemDistributionServie: ItemDistributionService,
		private ItemDistributionDetailService: ItemDistributionDetailService,
		private ItemDistributedService: ItemDistributedService,
		private itemRequestDetailService: ItemRequestDetailService,
		private changeDetector: ChangeDetectorRef,
		private dpService: DatePickerService,
		private processTrackingService: ProcessTrackingService,
		private modalService: NgbModal) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "تکت توزیع تحویلخانه";
		this.initializaForm();
		this.dateConfigGregorian = dpService.dateConfigGregorian;
		this.dateConfigShamsi = dpService.dateConfigShamsi;

	}

	ngAfterViewInit() {
		const el = document.querySelectorAll('.dp-picker-input');
		el.forEach(element => {
			element.classList.add('form-control');
			element.classList.add('ng-pristine');
			element.classList.add('ng-valid');
			element.classList.add('ng-touched');
			element.classList.remove('dp-picker-input');
		});
	}
	ngOnInit() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'کنترل فورم';

				this.itemDistributionServie.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.processTracking(val.data.id, val.data.stageId);
							this.itemDistributionForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								documentNumber: val.data.documentNumber,
								date: val.data.date,
								itemRequestId: val.data.itemRequestId,
								itemRequestCode: val.data.itemRequestCode,
								description: val.data.description
							});
							this.itemDistributionDetailModelList.clear();
							val.data.itemDistributionDetailModels.map((item) => {
								const tmpDict = {};
								tmpDict['id'] = new FormControl(item.id);
								tmpDict['itemDetailId'] = new FormControl(item.itemDetailId);
								tmpDict['itemDetailText'] = new FormControl(item.itemDetailText);
								tmpDict['quantity'] = new FormControl(item.quantity);
								tmpDict['remain'] = new FormControl(item.remain);
								tmpDict['requestedQuantity'] = new FormControl(item.requestedQuantity);
								tmpDict['unitId'] = new FormControl(item.unitId);
								tmpDict['unitText'] = new FormControl(item.unitText);
								tmpDict['itemRequestDetailId'] = new FormControl(item.itemRequestDetailId);
								if (item.distributed) {
									tmpDict['status'] = new FormControl("توزیع شده");
								}
								else {
									tmpDict['status'] = new FormControl("در حال توزیع");
								}
								this.itemDistributionDetailModelList.push(new FormGroup(tmpDict));
							})
							this.changeDetector.markForCheck();
							this.changeDetector.detectChanges();
							this.editable = true;

							let data: any = {};
							data.notDistributed = true;
							data.itemRequestId = val.data.itemRequestId;
							this.itemRequestDetailService.findById(data).subscribe({
								next: val => {
									if (val.successful) {
										val.data.map((item) => {
											const tmpDict = {};
											tmpDict['id'] = new FormControl(0);
											tmpDict['itemDetailId'] = new FormControl(item.itemDetailId);
											tmpDict['itemDetailText'] = new FormControl(item.itemDetailText);
											tmpDict['quantity'] = new FormControl(item.remain);
											tmpDict['remain'] = new FormControl(item.remain);
											tmpDict['requestedQuantity'] = new FormControl(item.requestedQuantity);
											tmpDict['unitId'] = new FormControl(item.unitId);
											tmpDict['unitText'] = new FormControl(item.unitText);
											tmpDict['itemRequestDetailId'] = new FormControl(item.id);
											tmpDict['status'] = new FormControl("درخواست شده");
											this.itemDistributionDetailModelList.push(new FormGroup(tmpDict));
										})

										this.changeDetector.markForCheck();
									}
								},
								error: err => {
									// this.notify.error(err);
								}
							});
						}
					},
					error: err => {
						// this.notify.error(err);
					}
				})
			}
		});
	}

	initializaForm() {

		this.itemDistributionForm = this.fb.group({
			id: 0,
			code: [''],
			documentNumber: [''],
			// date: [''],
			itemRequestId: [''],
			itemRequestCode: [''],
			description: [''],
			date: [jMoment(new Date()).format('YYYY-MM-DD')],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD')],

			itemDistributionDetailModelList: this.fb.array([this.initializeDetailForm()]),

		});

		this.itemDistributionDetailModelList = this.itemDistributionForm.get('itemDistributionDetailModelList') as FormArray;

	}

	initializeDetailForm(): FormGroup {
		return this.fb.group({
			id: [],
			itemDetailId: '',
			itemDetailText: '',
			detail: '',
			quantity: '',
			remain: '',
			requestedQuantity: '',
			unitId: '',
			unitText: '',
			itemRequestDetailId: '',
			status: ''
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemDistribution);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}

}
