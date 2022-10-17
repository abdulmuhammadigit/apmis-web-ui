import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {BehaviorSubject, Subject} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePickerComponent} from 'ng2-jalali-date-picker';
import {LookListService} from '../../../../services/asset/look/look-list.service';
import {DatePickerService} from '../../../../services/datepicker/date-picker.service';
import {NotificationService} from '../../../../../../core/_base/layout/services/notification.service';
import {ProcessTrackingService} from '../../../../services/process-tracking/process-tracking.service';
import {UploadFileService} from '../../../../services/document/upload-file.service';
import * as jMoment from 'jalali-moment';
import {SearchItemDetailComponent} from '../../../item/search-item-detail/search-item-detail.component';
import {SearchEmployeeComponent} from '../../../../configuration/hr/employee/search-employee/search-employee.component';
import {PrintItemSuggestedComponent} from '../../../item-suggested/print-item-suggested/print-item-suggested.component';
import {ProcessEntity, SectionConstants} from '../../../../../../../environments/environment';
import {ItemTransferService} from '../../../../services/asset/stock/item-transfer.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'kt-create-item-transfer',
  templateUrl: './create-item-transfer.component.html',
  styleUrls: ['./create-item-transfer.component.scss']
})
export class CreateItemTransferComponent implements OnInit {

	title;
	itemList;

	closeResult: string;
	modalOptions: NgbModalOptions;
	data;
	id: Subject<number>;
	hideDetail = true;
	result: Subject<any>;
	createForm: FormGroup;
	itemSuggestedDetailModel: FormArray;
	formTitle: string;
  	public Editor = ClassicEditor;
	public employeeDetailsList = [];
 	btnDisabled = true;

	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;


	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private itemTransferService: ItemTransferService,
		private cdf: ChangeDetectorRef,
		public dateService: DatePickerService,
		private notify: NotificationService,
		private processTrackingService: ProcessTrackingService,
		private uploadService: UploadFileService) {
		this.id = new BehaviorSubject(0);
		this.result = new Subject<any>();
	}
	// calendar section
	setShamsiDate(date: any) {
		const gDate: string = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = this.dateService.toShamsiDate(date);
			if (this.createForm.get('shamsiDate').value != shamsiDate) {
				this.createForm.get('shamsiDate').setValue(shamsiDate);
			}
		}
	}

	setGregorianDate(shamsiDate: any) {
		const gDate: string = shamsiDate + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = this.dateService.toGregorianDate(shamsiDate);
			if (this.createForm.get('date').value != date) {
				this.createForm.get('date').setValue(date);
			}
		}
	}

	ngOnInit(): void {
		this.title = 'انتقال اجناس';
		this.processTrackingService.clear();
		this.dateService.initCalendar();

		this.createForm = this.fb.group({
			id: [''],
			documentNumber: [''],
			fromEmployeeId: [''],
			fromEmployeeText: [''],
			toEmployeeText: ['', Validators.required],
			toEmployeeId: ['', Validators.required],
			items: [],
			description: [''],
			date: [jMoment(new Date()).format('YYYY-MM-DD'), Validators.required],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD'), Validators.required],
		});
	}





	selectEmployee(val) {



		const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				this.createForm.patchValue({
					employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
					employeeId: result.id,
				});
				if (val == 1) {
					this.createForm.patchValue({
						fromEmployeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
						fromEmployeeId: result.id,
					});
				} else {
					this.createForm.patchValue({
						toEmployeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
						toEmployeeId: result.id,
					});
				}
			}
		});
	}
	printItemRequest() {
		const modalRef = this.modalService.open(PrintItemSuggestedComponent, { size: 'lg' });
		const id = (this.createForm.get('id').value);
		modalRef.componentInstance.id.next(id);
	}

	submit() {

		const controls = this.createForm.controls;
		/** check form */
		if (this.createForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.itemTransferService.save(this.createForm.value).subscribe({
			next: data => {
				if (data.successful) {

					this.processTracking(data.data.id, data.data.stageId);
					this.uploadFile(data.data.id);

					this.notify.success('معلومات موفقانه ثبت گردید!');
					this.createForm.patchValue({
						id: data.data.id,
						code: data.data.code,
						documentNumber: data.data.documentNumber,
						date: data.data.date,
						employeeId: data.data.employeeId,
						employeeText: data.data.employeeText,
						description: data.data.description,

					});
					this.cdf.markForCheck();
					this.hideDetail = false;
					this.btnDisabled = false;
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

 	newRecord() {
		this.hideDetail = true;
		this.processTrackingService.clear();
		this.createForm.reset();
		this.itemSuggestedDetailModel.clear();
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemRequest);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}

	uploadFile(recordId: number) {
		this.uploadService.setRecordId(recordId);
		this.uploadService.setSectionId(SectionConstants.ItemRequest);
	}

	isControlHasError(controlName, type) {
		const control = this.createForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
	cancelClick() {
		this.result.next(-1);
	}
}
