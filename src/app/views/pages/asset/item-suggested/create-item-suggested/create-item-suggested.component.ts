import { UploadFileService } from './../../../services/document/upload-file.service';
import { ProcessEntity, SectionConstants } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { ItemSuggestedDetailService } from './../../../services/asset/item-suggested/item-suggested-detail.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ItemSuggestedService } from '../../../services/asset/item-suggested/item-suggested.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { SearchItemDetailComponent } from '../../item/search-item-detail/search-item-detail.component';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { SearchEmployeeComponent } from '../../../configuration/hr/employee/search-employee/search-employee.component';
import { PrintItemSuggestedComponent } from '../print-item-suggested/print-item-suggested.component';



@Component({
  selector: 'kt-create-item-suggested',
  templateUrl: './create-item-suggested.component.html',
  styleUrls: ['./create-item-suggested.component.scss']
})
export class CreateItemSuggestedComponent implements OnInit {

  closeResult: string;
  modalOptions: NgbModalOptions;
  data;

  id: Subject<number>;
  hideDetail = true;
  result: Subject<any>;
  suggestedForm: FormGroup;
  itemSuggestedDetailModel: FormArray;
  formTitle: string;
  miladiNgModel: string;
  shamsiNgModel: string;
  public Editor = ClassicEditor;
  public employeeDetailsList = [];
  unitType: any[];
  btnDisabled = true;

  @ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
  @ViewChild('date', { static: false }) date: DatePickerComponent;


  constructor(
	private modalService: NgbModal,
	private fb: FormBuilder,
	private ItemSuggestedService: ItemSuggestedService,
	private ItemSuggestedDetailService: ItemSuggestedDetailService,
	private lookListService: LookListService,
	private cdf: ChangeDetectorRef,
	public dateService: DatePickerService,
	private notify: NotificationService,
	private processTrackingService: ProcessTrackingService,
	private uploadService: UploadFileService) {
	this.id = new BehaviorSubject(0);
	this.result = new Subject<any>();
	this.formTitle = 'ثبت فورم پیشنهاد ';
	this.initializeForm();
  }
  // calendar section
  setShamsiDate(date: any) {
	const gDate: String = date + '';
	if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
		const shamsiDate = this.dateService.toShamsiDate(date);
		if (this.suggestedForm.get('shamsiDate').value != shamsiDate) {
		this.suggestedForm.get('shamsiDate').setValue(shamsiDate);
		}
	}
  }

  setGregorianDate(shamsiDate: any) {
	const gDate: String = shamsiDate + '';
	if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
		const date = this.dateService.toGregorianDate(shamsiDate);
		if (this.suggestedForm.get('date').value != date) {
		this.suggestedForm.get('date').setValue(date);
		}
	}
  }

  ngOnInit(): void {
	this.getUnitType();
	this.findData();
	this.itemSuggestedDetailModel.clear();
	this.processTrackingService.clear();
  }



  // form initialization
  initializeForm() {
	this.suggestedForm = this.fb.group({
		id: [''],
		code: [''],
		suggested: [true],
		employeeText: ['', Validators.required],
		employeeId: ['', Validators.required],
		department: ['', Validators.required],
		description: [''],
		date: [jMoment(new Date()).format('YYYY-MM-DD'), Validators.required],
		shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD'), Validators.required],
		itemSuggestedDetailModel: this.fb.array([this.createDetailItem()])
	});
	this.itemSuggestedDetailModel = this.suggestedForm.get('itemSuggestedDetailModel') as FormArray;
  }

  // these three funtions are used in form arrays
  createDetailItem(): FormGroup {
	return this.fb.group({
		id: [''],
		itemRequestId: [''],
		itemDetailId: ['', Validators.required],
		itemDetailText: ['', Validators.required],
		unitId: ['', Validators.required],
		quantity: ['', Validators.required],
		description: '',
		notExistItem: [{ value: '', disabled: true }],
		isRequestControlPage: false
	});
  }
  addItem() {
	this.itemSuggestedDetailModel.push(this.createDetailItem());
  }
  // look section

  getUnitType() {
	this.lookListService.getUnitList().subscribe((res) => {
		this.unitType = res;
		this.cdf.detectChanges();
	});
  }
  // utility
  cancelClick() {
	this.result.next(-1);
  }
  ngAfterViewInit() {
	this.dateService.initCalendar();
  }

  isControlHasError(controlName, type) {
	const control = this.suggestedForm.controls[controlName];
	if (!control) {
		return false;
	}
	return control.hasError(type) && (control.dirty || control.touched);
  }

  isDetailControlHasError(controlName, type, index) {
	const controls = this.itemSuggestedDetailModel.controls[index] as FormGroup;
	const control = controls.controls[controlName];
	if (!control) {
		return false;
	}
	return control.hasError(type) && (control.dirty || control.touched);
  }

  // operations

  searchItemDetail(index) {
	const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'lg' });
	modalRef.componentInstance.searchType = 3;

	modalRef.result.then((result) => {
		if (result) {
		this.itemSuggestedDetailModel.at(index).patchValue({
			itemDetailId: result.id,
			itemDetailText: result.detail
		});
		}
	});
  }
  searchEmployee() {
	const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
	modalRef.result.then((result) => {
		if (result) {
		this.suggestedForm.patchValue({
			employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
			employeeId: result.id,
		});
		}
	});
  }
  printItemRequest() {
	const modalRef = this.modalService.open(PrintItemSuggestedComponent, { size: 'lg' });
	const id = (this.suggestedForm.get('id').value);
	modalRef.componentInstance.id.next(id);
  }

  submit() {

	const controls = this.suggestedForm.controls;
	/** check form */
	if (this.suggestedForm.invalid) {
		Object.keys(controls).forEach(controlName =>
		controls[controlName].markAsTouched()
		);
		return;
	}

	this.ItemSuggestedService.save(this.suggestedForm.value).subscribe({
		next: data => {
		if (data.successful) {

			this.processTracking(data.data.id, data.data.stageId);
			this.uploadFile(data.data.id);

			this.notify.success('معلومات موفقانه ثبت گردید!');
			this.suggestedForm.patchValue({
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

  submitDetail(index) {
	// console.log("save")
	// const controls = this.itemSuggestedDetailModels.controls[index] as FormGroup;
	// /** check form */
	// if (controls.invalid) {
	//   Object.keys(controls.controls).forEach(controlName =>
	//     controls.controls[controlName].markAsTouched()
	//   );
	//   return;
	// }

	const record = (this.suggestedForm.get('itemSuggestedDetailModel').value)[index];
	record.itemRequestId = this.suggestedForm.get('id').value;
	this.ItemSuggestedDetailService.save(record).subscribe({
		next: data => {
		if (data.successful) {
			this.notify.success('معلومات موفقانه ثبت گردید!');

			this.itemSuggestedDetailModel.at(index).patchValue({
			id: data.data.id,
			itemReqestId: data.data.itemRequestId,
			itemDetailId: data.data.itemDetailId,
			itemDetailText: data.data.itemDetailText,
			unitId: data.data.unitId,
			quantity: data.data.quantity,
			description: data.data.description,
			});
			this.cdf.markForCheck();
			this.btnDisabled = false;
		}
		},
		error: er => {
		this.notify.error(er);
		}
	});
  }

  findData() {
	// this code is used for update data
	this.id.subscribe(next => {
		if (next != 0) {
		this.formTitle = 'ویرایش پیشنهاد';

		this.ItemSuggestedService.findById({ id: next }).subscribe({

			next: val => {
			if (val.successful) {
				this.processTracking(val.data.id, val.data.stageId);
				this.uploadFile(val.data.id);

				this.data = val;
				this.suggestedForm.patchValue({
				id: val.data.id,
				code: val.data.code,
				documentNumber: val.data.documentNumber,
				date: val.data.date,
				employeeId: val.data.employeeId,
				employeeText: val.data.employeeText,
				description: val.data.description,
				department: val.data.department
				});
				this.itemSuggestedDetailModel.clear();
				val.data.suggestedDetailModel.map((item) => {
				const formArray = this.createDetailItem();
				formArray.patchValue(item);
				this.itemSuggestedDetailModel.push(formArray);
				});
				this.cdf.detectChanges();
				this.cdf.markForCheck();
				this.hideDetail = false;
			}
			},
			error: err => {
			this.notify.error(err);
			}
		});
		}
	});
  }

  removeDetailItem(index) {
	this.notify.confirm({
		message: 'آیا مطمئن هستید که معلومات حذف شود?',
		ok: event => {
		const record = (this.suggestedForm.get('itemSuggestedDetailModel').value)[index];
		if (record.id == '' || record.id == 0) {
			this.itemSuggestedDetailModel.removeAt(index);
			this.cdf.markForCheck();
		} else {
			this.ItemSuggestedDetailService.delete({ id: record.id }).subscribe({
			next: val => {
				if (val.successful) {
				this.notify.success('معلومات موفقانه حذف گردید!');
				this.itemSuggestedDetailModel.removeAt(index);
				this.cdf.markForCheck();
				}
			},
			error: err => {
				this.notify.error(err);
			}
			});
		}
		}
	});

  }
  newRecord() {
	this.hideDetail = true;
	this.processTrackingService.clear();
	this.suggestedForm.reset();
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


}
