import { ProcessEntity } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemDistributionService } from '../../../services/asset/item-distribution/item-distribution.service';
import { ItemDistributionDetailService } from '../../../services/asset/item-distribution/item-distribution-detail.service';
import { SearchItemRequestDetailComponent } from '../../item-request/search-item-request-detail/search-item-request-detail.component';
import { ItemRequestDetailService } from '../../../services/asset/item-request/item-request-detail.service';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { PrintItemDistributeComponent } from '../print-item-distribute/print-item-distribute.component';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { SaveItemDistributionDetailComponent } from '../save-item-distribution-detail/save-item-distribution-detail.component';


@Component({
	selector: 'kt-create-fs-five',
	templateUrl: './create-fs-five.component.html',
	styleUrls: ['./create-fs-five.component.scss']
})
export class CreateFsFiveComponent implements OnInit {

	notDistributed: boolean;
	closeResult: string;
	modelOption: NgbModalOptions;
	id: Subject<number>;
	hideDetail = true;
	result: Subject<any>;
	formTitle: string;
	btnDisabled = true;
	itemRequestId: any;
	itemRequestCode: any;
	itemRequestDetailId: any;
	itemDistributionId: any;
	itemDistributionDetailId: any;
	itemSpecificationId: Array<any>;
	public itemDistributionForm: FormGroup;
	public itemDistributionDetailModelList: FormArray;

	public Editor = ClassicEditor;
	public dateConfigShamsi;
	public dateConfigGregorian;
	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(private http: HttpClient,
				   private fb: FormBuilder,
		           private itemDistributionServie: ItemDistributionService,
		           private ItemDistributionDetailService: ItemDistributionDetailService,
		           private itemRequestDetailService: ItemRequestDetailService,
		           private changeDetector: ChangeDetectorRef,
		           public dateService: DatePickerService,
		           private notify: NotificationService,
		           private modalService: NgbModal,
		           private processTrackingService: ProcessTrackingService) {
		this.id = new BehaviorSubject(0);
		this.result = new Subject<any>();
		this.formTitle = 'تکت توزیع تحویلخانه ';
		this.initializaForm();

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
		this.findData();
		this.itemDistributionDetailModelList.clear();
		this.processTrackingService.clear();
	}

	// forms initialization
	initializaForm() {
		this.itemDistributionForm = this.fb.group({
			id: 0,
			code: [''],
			date: ['', Validators.required],
			dateShamsi: ['', Validators.required],
			itemRequestId: ['', Validators.required],
			itemRequestCode: ['', Validators.required],
			description: [''],
			itemDistributionDetailModelList: this.fb.array([this.initializeDetailForm()])
		});

		this.itemDistributionDetailModelList = this.itemDistributionForm.get('itemDistributionDetailModelList') as FormArray;
	}

	initializeDetailForm(): FormGroup {
		return this.fb.group({
			id: [],
			itemDetailId: ['', Validators.required],
			quantity: ['', Validators.required],
			remain: '',
			itemDetailText: '',
			requestedQuantity: '',
			unitId: '',
			unitText: '',
			consumable: '',
			itemRequestDetailId: ['', Validators.required],
			itemReceiptDetail: [''],
			itemReceiptDetailId: [''],
			itemReceiptDetails: [''],
			status: ''
		});
	}
	setShamsiDate(date: any) {
		const gDate: String = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = this.dateService.toShamsiDate(date);
			if (this.itemDistributionForm.get('dateShamsi').value != shamsiDate) {
				this.itemDistributionForm.get('dateShamsi').setValue(shamsiDate);
			}
		}
	}

	setGregorianDate(shamsiDate: any) {
		const gDate: String = shamsiDate + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = this.dateService.toGregorianDate(shamsiDate);
			if (this.itemDistributionForm.get('date').value != date) {
				this.itemDistributionForm.get('date').setValue(date);
			}
		}
	}

	// utility
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
		const control = this.itemDistributionForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.itemDistributionDetailModelList.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


	// operations

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش فورم';

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
							this.itemDistributionId = val.data.id;
							this.itemDistributionDetailModelList.clear();
							val.data.itemDistributionDetailModels.map((item) => {
								const formArray = this.initializeDetailForm();
								item.status = ((item.distributed) ? 'توزیع شده' : 'در حال توزیع');
								formArray.patchValue(item);
								// formArray.setValue({ itemDetailText: item.itemDetailText })
								this.itemDistributionDetailModelList.push(formArray);
								// console.log(this.itemDistributionDetailModelList.controls);
							});
							this.changeDetector.markForCheck();
							this.changeDetector.detectChanges();
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
	selectItemRequest() {
		const modalRef = this.modalService.open(SearchItemRequestDetailComponent, { size: 'lg' });
		modalRef.componentInstance.itemRequestEvent.subscribe(value => {
			this.itemRequestId = value.id;
			this.itemRequestCode = value.code;
			this.itemDistributionForm.patchValue({
				itemRequestId: value.id,
				itemRequestCode: value.code
			});
		});
	}
	selectItem() {
		if (this.itemDistributionForm.controls.itemRequestId.value) {
			const modalRef = this.modalService.open(SaveItemDistributionDetailComponent, { size: 'xl' });
			modalRef.componentInstance.itemRequestId = this.itemDistributionForm.controls.itemRequestId.value;
			modalRef.componentInstance.itemDistributionId = this.itemDistributionForm.controls.id.value;

			modalRef.result.then((result) => {
				this.findData();
			});
		}
	}

	submit() {
		const controls = this.itemDistributionForm.controls;
		/** check form */
		if (this.itemDistributionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.itemDistributionServie.save(this.itemDistributionForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.processTracking(val.data.id, val.data.stageId);

					this.notify.success('معلومات موفقانه ثبت گردید!');
					this.itemDistributionId = val.data.id;
					this.itemDistributionForm.patchValue({
						id: val.data.id,
						code: val.data.code,
						// documentNumber: val.data.documentNumber,
						date: val.data.date,
						itemRequestId: val.data.itemRequestId,
						itemRequestCode: val.data.itemRequestCode,
						description: val.data.description
					});
					this.hideDetail = false;
					this.btnDisabled = false;
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}
	removeItem(index: number) {
		this.notify.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				const record = (this.itemDistributionForm.get('itemDistributionDetailModelList').value)[index];
				if (record.id == '' || record.id == 0) {
					this.itemDistributionDetailModelList.removeAt(index);
					this.changeDetector.markForCheck();
				} else {
					this.ItemDistributionDetailService.delete({ id: record.id }).subscribe({
						next: val => {
							if (val.successful) {
								this.notify.success('معلومات موفقانه حذف گردید!');
								this.itemDistributionDetailModelList.removeAt(index);
								this.changeDetector.markForCheck();
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
		this.formTitle = 'تکت توزیع تحویلخانه';
		this.hideDetail = true;
		this.itemDistributionForm.patchValue({
			id: '',
			code: '',
			date: '',
			dateShamsi: '',
			itemRequestId: '',
			itemRequestCode: '',
			description: ''
		});
		this.itemDistributionDetailModelList.clear();
	}
	printForm() {

		const modalRef = this.modalService.open(PrintItemDistributeComponent, { size: 'lg' });
		modalRef.componentInstance.itemDistributedId = this.itemDistributionId;
		modalRef.result.then((result) => {
		},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});

		const id = (this.itemDistributionForm.get('id').value);
		modalRef.componentInstance.id.next(id);
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemDistribution);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}


}
