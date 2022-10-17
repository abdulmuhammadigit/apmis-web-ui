import { UploadFileService } from './../../../services/document/upload-file.service';
import { ProcessEntity, SectionConstants } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { DatePickerService } from './../../../services/datepicker/date-picker.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from "rxjs";
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { DatePickerComponent } from 'ng2-jalali-date-picker';

@Component({
	selector: 'kt-control-item-receipt',
	templateUrl: './control-item-receipt.component.html',
	styleUrls: ['./control-item-receipt.component.scss']
})
export class ControlItemReceiptComponent implements OnInit {

	public Editor = ClassicEditor;
	closeResult: string;
	modalOptions: NgbModalOptions;

	id: Subject<number>;
	editable: boolean;
	//consumable: boolean;
	result: Subject<any>;
	public itemReceiptModelDetails: FormArray;
	public itemForm: FormGroup;
	formTitle: string;
	public stockKeepersList = [];
	public itemReceiptTypesList = [];
	public unitsList = [];
	btnDisabled: boolean = true;
	@ViewChild('receiveDateShamsi', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('receiveDate', { static: false }) date: DatePickerComponent;
	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private itemReceiptService: ItemReceiptService,
		public dateService: DatePickerService,
		private cdf: ChangeDetectorRef,
		private processTrackingService: ProcessTrackingService,
		private uploadService: UploadFileService) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.initializaForm();

	}

	ngOnInit() {

		this.findData();
		this.itemReceiptModelDetails.clear();
	}

	// form initialization

	initializaForm() {
		this.itemForm = this.fb.group({
			id: 0,
			code: [{ value: '', disabled: true }],
			itemReceiptTypeId: [{ value: '', disabled: true }],
			receiveDate: [{ value: '', disabled: true }],
			receiveDateShamsi: [{ value: '', disabled: true }],
			billNumber: [{ value: '', disabled: true }],
			stockKeeperId: [{ value: '', disabled: true }],
			description: [{ value: '', disabled: true }],
			itemReceiptModelDetails: this.fb.array([this.initializaFormArray()]),
		});
		this.itemReceiptModelDetails = this.itemForm.get('itemReceiptModelDetails') as FormArray;
	}

	initializaFormArray(): FormGroup {
		return this.fb.group({
			id: [''],
			itemDetailId: [{ value: '', disabled: true }],
			itemDetailText: [{ value: '', disabled: true }],
			quantity: [{ value: '', disabled: true }],
			unitId: [{ value: '', disabled: true }],
			description: [{ value: '', disabled: true }],
			price: [{ value: '', disabled: true }],
			sum: [{ value: '', disabled: true }],
			consumable: [{ value: '', disabled: true }],
		});

	}



	// calendar section
	setShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let shamsiDate = this.dateService.toShamsiDate(date);
			if (this.itemForm.get('receiveDateShamsi').value != shamsiDate)
				this.itemForm.get('receiveDateShamsi').setValue(shamsiDate);
		}
	}

	setGregorianDate(shamsiDate: any) {
		let gDate: String = shamsiDate + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let date = this.dateService.toGregorianDate(shamsiDate);
			if (this.itemForm.get('receiveDate').value != date)
				this.itemForm.get('receiveDate').setValue(date);
		}
	}
	ngAfterViewInit() {
		this.dateService.initCalendar();
	}


	cancelClick() {
		this.result.next(-1);
	}

	isControlHasError(controlName, type) {
		const control = this.itemForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.itemReceiptModelDetails.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	specificationRegistrable(id, consumable) {
		if (id != 0 && consumable == 'false') {
			return false;
		}
		return true;
	}


	findData() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'بررسی راپور رسید';
				this.itemReceiptService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.processTracking(val.data.id, val.data.stageId);
							this.uploadFile(val.data.id);

							this.itemForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								itemReceiptTypeId: val.data.itemReceiptTypeId,
								receiveDate: val.data.receiveDate,
								billNumber: val.data.billNumber,
								stockKeeperId: val.data.stockKeeperId,
								section: val.data.section,
								description: val.data.description
							});


							this.itemReceiptModelDetails.clear();
							val.data.itemDetailList.map((item) => {

								let formArray = this.initializaFormArray();
								item.sum = (item.price * item.quantity);
								formArray.patchValue(item);
								this.itemReceiptModelDetails.push(formArray);

							})
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


	newRecord() {
		this.itemForm.patchValue({
			id: '',
			code: '',
			itemReceiptTypeId: '',
			receiveDate: '',
			receiveDateShamsi: '',
			billNumber: '',
			stockKeeperId: '',
			description: '',
		});
		this.itemReceiptModelDetails.clear();
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemReceipt);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}

	uploadFile(recordId: number) {
		this.uploadService.setRecordId(recordId);
		this.uploadService.setSectionId(SectionConstants.ItemReceipt);
	}
}
