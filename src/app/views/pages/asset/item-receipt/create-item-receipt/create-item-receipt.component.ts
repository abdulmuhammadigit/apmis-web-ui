import {DonorService} from './../../../services/asset/donor/donor.service';
import {ProcessTrackingService} from './../../../services/process-tracking/process-tracking.service';
import {ProcessEntity, SectionConstants} from './../../../../../../environments/environment';
import {DatePickerService} from './../../../services/datepicker/date-picker.service';
import {ItemReceiptDetailService} from './../../../services/asset/item-receipt/item-receipt-detail.service';
import {NotificationService} from './../../../../../core/_base/layout/services/notification.service';
import {Component, OnInit, ChangeDetectorRef, ViewChild} from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators} from '@angular/forms';
import {BehaviorSubject, of, Subject} from 'rxjs';
import {NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ItemReceiptService} from '../../../services/asset/item-receipt/item-receipt.service';
import {LookListService} from '../../../services/asset/look/look-list.service';
import {StockKeeperService} from '../../../services/asset/hr/stock-keeper.service';
import {SearchItemDetailComponent} from '../../item/search-item-detail/search-item-detail.component';
import {ItemSpecificationComponent} from '../item-specification/item-specification.component';
import {DatePickerComponent} from 'ng2-jalali-date-picker';
import {ComponentBase} from '../../../../../core/_base/layout/components/component-base';
import {PrintItemReceiptComponent} from '../print-item-receipt/print-item-receipt.component';
import {ComponentHostDirective} from '../../../../../core/_base/layout/directives/component-host.directive';
import {UploadFileService} from '../../../services/document/upload-file.service';
import {UnitService} from '../../../services/asset/look/unit.service';

@Component({
	selector: 'kt-create-m-seven',
	templateUrl: './create-item-receipt.component.html',
	styleUrls: ['./create-item-receipt.component.scss']
})
export class CreateItemReceiptComponent implements OnInit {

	public Editor = ClassicEditor;
	closeResult: string;
	modalOptions: NgbModalOptions;

	@ViewChild(ComponentHostDirective, {static: false})
	host: ComponentHostDirective;

	addItemButton: boolean;
	id: Subject<number>;
	hideDetail = true;
	result: Subject<any>;
	public itemReceiptModelDetails: FormArray;
	public itemForm: FormGroup;
	formTitle: string;
	public stockKeepersList = [];
	public itemReceiptTypesList = [];
	public unitsList = [];
	btnDisabled = true;
	public donorList = [];

	@ViewChild('receiveDateShamsi', {static: false}) shamsiDate: DatePickerComponent;
	@ViewChild('receiveDate', {static: false}) date: DatePickerComponent;

	constructor(
		private creator: ComponentBase<PrintItemReceiptComponent>,
		private modalService: NgbModal,
		private fb: FormBuilder,
		private notify: NotificationService,
		private itemReceiptService: ItemReceiptService,
		private itemReceiptDetailService: ItemReceiptDetailService,
		private lookListService: LookListService,
		private stockKeeperService: StockKeeperService,
		public dateService: DatePickerService,
		private donorService: DonorService,
		private cdf: ChangeDetectorRef,
		private processTrackingService: ProcessTrackingService,
		private uploadService: UploadFileService,
		private unitService: UnitService
	) {
		this.id = new BehaviorSubject(0);
		this.formTitle = 'ثبت راپور رسید';
		this.result = new Subject<any>();
		this.initializaForm();
	}

	ngOnInit() {
		this.addItemButton = true;
		this.getStockKeeprsList();
		this.getItemReceiptTypesList();
		this.getUnitsList();
		this.getDonorList();
		this.findData();
		this.itemReceiptModelDetails.clear();
	}

	// form initialization

	initializaForm() {
		this.itemForm = this.fb.group({
			id: 0,
			code: [{value: '', disabled: true}],
			itemReceiptTypeId: ['', Validators.required],
			receiveDate: ['', Validators.required],
			receiveDateShamsi: ['', Validators.required],
			billNumber: [''],
			stockKeeperId: ['', Validators.required],
			description: [''],
			donorId: ['', Validators.required],
			m16Number: [''],
			m3Number: ['', Validators.required],
			itemReceiptModelDetails: this.fb.array([this.initializaFormArray()]),
		});
		this.itemReceiptModelDetails = this.itemForm.get('itemReceiptModelDetails') as FormArray;
	}

	initializaFormArray(): FormGroup {
		return this.fb.group({
			id: [''],
			itemDetailId: [''],
			itemDetailText: ['', Validators.required],
			quantity: ['', Validators.required],
			unitId: ['', Validators.required],
			unitText: [''],
			description: '',
			price: ['', Validators.required],
			sum: [{value: '', disabled: true}],
			consumable: [''],
			localProduction: ['']
		});

	}

	// look section
	getStockKeeprsList() {
		this.stockKeeperService.getList({}).subscribe((res) => {
			this.stockKeepersList = res.data;
			this.cdf.detectChanges();
		});
	}

	getItemReceiptTypesList() {
		this.lookListService.getItemReceiptTypeList().subscribe((res) => {
			this.itemReceiptTypesList = res;
			this.cdf.detectChanges();
		});
	}

	getUnitsList() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unitsList = res;
			this.cdf.detectChanges();
		});
	}

	getDonorList() {
		this.donorService.getList({}).subscribe((res) => {
			this.donorList = res.data;
			this.cdf.detectChanges();
		});
	}

	// calendar section
	setShamsiDate(date: any) {
		const gDate: String = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = this.dateService.toShamsiDate(date);
			if (this.itemForm.get('receiveDateShamsi').value != shamsiDate) {
				this.itemForm.get('receiveDateShamsi').setValue(shamsiDate);
			}
		}
	}

	setGregorianDate(shamsiDate: any) {
		const gDate: String = shamsiDate + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = this.dateService.toGregorianDate(shamsiDate);
			if (this.itemForm.get('receiveDate').value != date) {
				this.itemForm.get('receiveDate').setValue(date);
			}
		}
	}

	ngAfterViewInit() {
		this.dateService.initCalendar();
	}

	// utility
	addItem() {
		this.btnDisabled = true;
		this.itemReceiptModelDetails.push(this.initializaFormArray());
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
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

	// operations
	print() {
		const modalRef = this.modalService.open(PrintItemReceiptComponent, {size: 'lg'});

		modalRef.result.then((result) => {
				if (result) {

				}
			}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
		const id = (this.itemForm.get('id').value);
		modalRef.componentInstance.id.next(id);

	}

	searchItemDetail(index) {
		const modalRef = this.modalService.open(SearchItemDetailComponent, {size: 'lg'});
 	    modalRef.result.then((result) => {
				if (result) {

					this.itemReceiptModelDetails.at(index).patchValue({
						itemDetailId: result.id,
						itemDetailText: result.detail,
						consumable: result.consumable,

					}), this.unitService.findUnitById({itemId: result.id}).subscribe({next: val => {
								this.itemReceiptModelDetails.at(index).patchValue({
									unitId: val.data.id,
									unitText: val.data.name,
 								});
							}}
						);
				}
			}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
	}

	specifyItem(index) {
		const modalRef = this.modalService.open(ItemSpecificationComponent, {size: 'xl'});
		const numOfItems = this.itemReceiptModelDetails.at(index).get('quantity').value;
		console.log(numOfItems);
		const itemReceiptDetailId = this.itemReceiptModelDetails.at(index).get('id').value;
		modalRef.componentInstance.numOfItems = numOfItems;
		modalRef.componentInstance.itemReceiptDetailId = itemReceiptDetailId;
		modalRef.result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
			}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
		modalRef.componentInstance.id.next(itemReceiptDetailId);


	}

	findData() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش راپور رسید';
				this.itemReceiptService.findById({id: next}).subscribe({
					next: val => {
						if (val.successful) {
							this.processTracking(val.data.id, val.data.stageId);
							this.uploadFile(val.data.id);
							this.itemForm.patchValue(val.data);

							this.itemReceiptModelDetails.clear();
							val.data.itemDetailList.map((item) => {

								const formArray = this.initializaFormArray();
								item.sum = (item.price * item.quantity);
								formArray.patchValue(item);
								this.itemReceiptModelDetails.push(formArray);

							});
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

	submit() {
		const controls = this.itemForm.controls;
		/** check form */
		if (this.itemForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.itemReceiptService.save(this.itemForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.processTracking(val.data.id, val.data.stageId);
					this.uploadFile(val.data.id);
					this.notify.success('معلومات موفقانه ثبت گردید!');
					this.itemForm.patchValue(val.data);
					this.cdf.markForCheck();
					this.hideDetail = false;
				}
			},
			error: err => {
				this.notify.error(err);
			}
		});
	}

	submitDetail(index) {

		const controls = this.itemReceiptModelDetails.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		const record = (this.itemForm.get('itemReceiptModelDetails').value)[index];
		record.itemReceiptId = this.itemForm.get('id').value;

		this.itemReceiptDetailService.save(record).subscribe({
			next: data => {

				if (data.successful) {
					this.notify.success('معلومات موفقانه ثبت گردید!');

					this.itemReceiptModelDetails.at(index).patchValue({
						id: data.data.id,
						itemReceiptId: data.data.itemReceiptId,
						itemDetailId: data.data.itemDetailId,
						itemDetailText: data.data.itemDetailText,
						unitId: data.data.unitId,
						quantity: data.data.quantity,
						price: data.data.price,
						sum: (data.data.price * data.data.quantity),
						description: data.data.description,
						consumable: data.data.consumable,
						localProduction: data.data.localProduction
					});
					this.cdf.markForCheck();
					this.btnDisabled = false;
				}
			},
			error: er => {
				this.notify.error(er);
				this.cdf.markForCheck();
			}
		});
	}

	removeItem(index: number) {
		this.notify.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				const record = (this.itemForm.get('itemReceiptModelDetails').value)[index];
				if (record.id == '' || record.id == 0) {
					this.itemReceiptModelDetails.removeAt(index);
					this.cdf.markForCheck();
				} else {
					this.itemReceiptDetailService.delete({id: record.id}).subscribe({
						next: val => {
							if (val.successful) {
								this.notify.success('معلومات موفقانه حذف گردید!');
								this.itemReceiptModelDetails.removeAt(index);
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
		this.processTrackingService.clear();
		this.uploadService.clear();
		this.hideDetail = true;
		this.formTitle = 'ثبت راپور رسید';
		this.itemForm.reset();
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
