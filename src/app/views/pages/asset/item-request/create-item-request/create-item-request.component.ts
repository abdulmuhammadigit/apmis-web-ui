import { UploadFileService } from './../../../services/document/upload-file.service';
import { ProcessEntity, SectionConstants } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { ItemRequestDetailService } from './../../../services/asset/item-request/item-request-detail.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, of, Subject } from "rxjs";
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { SearchItemDetailComponent } from '../../item/search-item-detail/search-item-detail.component';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { PrintItemRequestComponent } from '../print-item-request/print-item-request.component';
import { SearchEmployeeComponent } from '../../../configuration/hr/employee/search-employee/search-employee.component';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { ItemRequestDetailsComponent } from './item-request-details/item-request-details.component';
import { IsdModalComponent } from '../../../../../core/_base/layout/components/isd-modal/isd-modal.component';
import { ModalConfig } from '../../../../../core/_config/modal.config';

@Component({
	selector: 'kt-create-item-request',
	templateUrl: './create-item-request.component.html',
	styleUrls: ['./create-item-request.component.scss']
})
export class CreateItemRequestComponent implements OnInit {

	closeResult: string;
	modalOptions: NgbModalOptions;
	data;

	id: Subject<number>;
	_selectedObject: Subject<any>;

	hideDetail: boolean = false;
	result: Subject<any>;
	requestForm: FormGroup;
	detailsModel: FormArray;
	formTitle: string;
	miladiNgModel: string;
	shamsiNgModel: string;
	public Editor = ClassicEditor;
	public employeeDetailsList = [];
	unitType: any[];
	btnDisabled: boolean = true;
	ColumnMode = ColumnMode;
	SelectionType = SelectionType;

	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;
	@ViewChild('addModal') private addModalComponent: IsdModalComponent;


	itemDetailsForm: FormGroup;
	editing = {};

	columns = [
		{ prop: 'number', name: 'شماره' },
		{ prop: 'itemDetailText', name: 'تفصیلات جنس' },
		{ prop: 'notExistItem', name: 'موجودیت در دیپو', type: "check" },
		{ prop: 'quantityText', name: 'مقدار' }
	];

	rows = [];

	addModalConfig: ModalConfig

	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private itemRequestService: ItemRequestService,
		private itemRequestDetailService: ItemRequestDetailService,
		private lookListService: LookListService,
		private cdf: ChangeDetectorRef,
		public dateService: DatePickerService,
		private notify: NotificationService,
		private processTrackingService: ProcessTrackingService,
		private formBuilder: FormBuilder,
		private uploadService: UploadFileService) {

		this._selectedObject = new BehaviorSubject({});
		this.result = new Subject<any>();

		this.formTitle = "ایجاد فورم درخواست";
		this.initializeForm();
	}
	// calendar section
	setShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let shamsiDate = this.dateService.toShamsiDate(date);
			if (this.requestForm.get('shamsiDate').value != shamsiDate)
				this.requestForm.get('shamsiDate').setValue(shamsiDate);
		}
	}
	getRowHeight(row) {
		console.log('ROW', row);
		if (!row) {
			return 50;
		}
		if (row.height === undefined) {
			return 50;
		}
		return row.height;
	}
	setGregorianDate(shamsiDate: any) {
		let gDate: String = shamsiDate + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let date = this.dateService.toGregorianDate(shamsiDate);
			if (this.requestForm.get('date').value != date)
				this.requestForm.get('date').setValue(date);
		}
	}

	ngOnInit() {
		this.itemDetailsForm = this.formBuilder.group({
			id: [''],
			itemRequestId: [''],
			itemDetailId: ['', Validators.required],
			itemDetailText: ['', Validators.required],
			unitId: ['', Validators.required],
			quantity: ['', Validators.required],
			description: '',
			notExistItem: [{ value: '' }],
			isRequestControlPage: false
		});

		this.addModalConfig = {
			modalTitle: 'اجناس شامل درخواست را انتخاب نمائید',
			size: 'xl'
		};

		this.getUnitType();
		this.LoadData();

		this.detailsModel.clear();
		this.processTrackingService.clear();
	}

	dpOpen(s) {
		if (s == 'shamsi')
			this.shamsiDate.showCalendars();
		else
			this.date.showCalendars();
	}

	//form initialization
	initializeForm() {
		this.requestForm = this.fb.group({
			id: [''],
			code: [''],
			suggested: [false],
			employeeText: ['', Validators.required],
			employeeId: ['', Validators.required],
			department: ['', Validators.required],
			description: [''],
			date: [jMoment(new Date()).format('YYYY-MM-DD'), Validators.required],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD'), Validators.required],
			detailsModel: this.fb.array([this.createDetailItem()])
		});
		this.detailsModel = this.requestForm.get('detailsModel') as FormArray;
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
		this.detailsModel.push(this.createDetailItem());
	}


	getUnitType() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unitType = res;
			this.cdf.detectChanges();
		})
	}
	//utility
	cancelClick() {
		this.result.next(-1);
	}
	ngAfterViewInit() {
		this.dateService.initCalendar();
	}

	isControlHasError(controlName, type) {
		const control = this.requestForm.controls[controlName];
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
	//operations
	searchItemDetail(index: number) {

		// const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'lg' });
		// 	modalRef.componentInstance.searchType = 2;
		// 	modalRef.result.then((result) => {
		// 		if (result) {
		// 			this.detailsModel.at(index).patchValue({
		// 				itemDetailId: result.id,
		// 				itemDetailText: result.detail
		// 			});
		// 		}
		// 	})
	}
	searchEmployee() {
		const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				this.requestForm.patchValue({
					employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
					employeeId: result.id,
				});
			}
		});
	}
	printItemRequest() {
		const modalRef = this.modalService.open(PrintItemRequestComponent, { size: 'lg' });
		let id = (this.requestForm.get('id').value)
		modalRef.componentInstance.id.next(id);
	}
	submit() {
		const controls = this.requestForm.controls;
		/** check form */
		if (this.requestForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.itemRequestService.save(this.requestForm.value).subscribe({
			next: data => {
				if (data.successful) {
					this.processTracking(data.data.id, data.data.stageId)
					this.uploadFile(data.data.id)
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.requestForm.patchValue({
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
		const controls = this.detailsModel.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		let record = (this.requestForm.get('detailsModel').value)[index];
		record.itemRequestId = this.requestForm.get('id').value;
		this.itemRequestDetailService.save(record).subscribe({
			next: data => {
				if (data.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");

					this.detailsModel.at(index).patchValue({
						id: data.data.id,
						itemReqestId: data.data.itemRequestId,
						itemDetailId: data.data.itemDetailId,
						itemDetailText: data.data.itemDetailText,
						unitId: data.data.unitId,
						quantity: data.data.quantity,
						description: data.data.description,
						notExistItem: data.data.notExistItem
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

	LoadData() {
		// this code is used for update data
		this._selectedObject.subscribe(next => {
			if (Object.keys(next).length) {
				this.formTitle = 'تغییر فورم درخواستی';
				this.itemRequestService.findById({ id: next.id }).subscribe({
					next: val => {
						if (val.successful) {

							this.processTracking(val.data.id, val.data.stageId)
							this.uploadFile(val.data.id)

							this.data = val;
							this.requestForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								documentNumber: val.data.documentNumber,
								date: val.data.date,
								employeeId: val.data.employeeId,
								employeeText: val.data.employeeText,
								description: val.data.description,
								department: val.data.department
							});
							this.detailsModel.clear();

							let counter = 1;
							let templist = this.data.data.detailModelList;
							templist.forEach(element => {
								element.number = counter;
								counter++;
							});

							this.rows = templist;
							// val.data.detailModelList.map((item) => {
							// 	let formArray = this.createDetailItem();
							// 	formArray.patchValue(item);
							// 	this.detailsModel.push(formArray);
							// });

							this.cdf.detectChanges();
							this.cdf.markForCheck();
							this.hideDetail = false;
						}
					},
					error: err => {
						console.log(err);
					}
				})
			}
		});
	}

	removeDetailItem(index) {
		this.notify.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				let record = (this.requestForm.get('detailsModel').value)[index];
				if (record.id == "" || record.id == 0) {
					this.detailsModel.removeAt(index);
					this.cdf.markForCheck();
				} else {
					this.itemRequestDetailService.delete({ id: record.id }).subscribe({
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
		})

	}
	newRecord() {
		this.hideDetail = true;
		this.processTrackingService.clear();
		this.requestForm.reset();
		this.detailsModel.clear();
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


	itemDelete(event) {

	}

	async openAddItemModal() {
		return await this.addModalComponent.open()
	}

	itemAdd(event) {
		console.log(this.openAddItemModal());

		//const modalRef = this.modalService.open(ItemRequestDetailsComponent, { size: 'xl' });
		//modalRef.result.then((result) => {
		// if (result) {
		// 	this.requestForm.patchValue({
		// 		employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
		// 		employeeId: result.id,
		// 	});
		// }
		//});
	}
}



