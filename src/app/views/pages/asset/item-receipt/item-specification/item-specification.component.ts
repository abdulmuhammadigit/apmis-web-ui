import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { ItemSpecificationService } from '../../../services/asset/item-receipt/item-specification.service';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';

@Component({
	selector: 'kt-item-specification',
	templateUrl: './item-specification.component.html',
	styleUrls: ['./item-specification.component.scss']
})
export class ItemSpecificationComponent implements OnInit {
	collection = [];
	@Input() public numOfItems;
	@Input() public itemReceiptDetailId;
	page: number = 1;
	actualIndex: number = 0;
	pageIndex: number = 0;
	pageSize = 5;
	public itemSpecificationModelList: FormArray;
	public itemForm: FormGroup;
	editable: boolean;
	result: Subject<any>;
	id: Subject<number>;
	formTitle: string;
	isPrintable: Boolean = false;
	tagNumber;
	@ViewChild('expirationDateShamsi', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('expirationDate', { static: false }) date: DatePickerComponent;

	constructor(
		public activeModal: NgbActiveModal,
		private itemReceiptService: ItemReceiptService,
		private itemSpecificationService: ItemSpecificationService,
		private changeDetector: ChangeDetectorRef,
		private notify: NotificationService,
		public dateService: DatePickerService,
		private fb: FormBuilder) {
		this.initializaForm();
		this.result = new Subject<any>();
		this.editable = false;
		this.id = new BehaviorSubject(0);
		this.formTitle = "ثبت مشخصات اجناس ";
		for (let i = 1; i <= 100; i++) {
			this.collection.push(`item ${i}`);
		}
	}

	ngOnInit() {

		this.findData();
		//this.itemSpecificationModelList.clear();

	}


	initializaForm() {
		this.itemForm = this.fb.group({
			itemSpecificationModelList: this.fb.array([this.createItem()]),
		});
		this.itemSpecificationModelList = this.itemForm.get('itemSpecificationModelList') as FormArray;
	}

	isControlHasError(controlName, type) {
		const control = this.itemForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.itemSpecificationModelList.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
	numOfArray(index) {
		for (let i = 0; i < index; i++) {
			this.itemSpecificationModelList.push(
				this.createItem()
			);
		}
	}

	createItem(): FormGroup {
		return this.fb.group({
			id: [''],
			itemReceiptDetailId: this.itemReceiptDetailId,
			serialNumber: ['', Validators.required],
			tagNumber: [{ value: '', disabled: true }],
			expirationDateShamsi: [''],
			expirationDate: [''],
			location: [''],
		});
	}


	save(index) {
		console.log("formarrayindex:::::", index)
		const controls = this.itemSpecificationModelList.controls[index] as FormGroup;
		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		this.itemSpecificationModelList.at(index);
		const data = this.itemSpecificationModelList.at(index).value;
		data.itemReceiptDetailId = this.itemReceiptDetailId;
		this.itemSpecificationService.save(data).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success('معلومات موفقانه ثبت گردید!');
					// this.itemSpecificationModelList.clear();

					// this.formTitle = "ویرایش مشخصات اجناس";
					this.itemSpecificationModelList.at(index).patchValue({
						id: val.data.id,
						itemReceiptDetailId: val.data.itemReceiptDetailId,
						serialNumber: val.data.serialNumber,
						tagNumber: val.data.tagNumber,
						// expirationDateShamsi:,
						expirationDate: val.data.expirationDate,
						location: val.data.location
					});

					this.changeDetector.markForCheck();

				}
			},
			error: er => {
				this.notify.error(er);
				this.changeDetector.markForCheck();
			}
		});

	}

	delete(index) {
		this.notify.confirm({
			message: 'آیا مطمئن هستید که معلومات حذف شود?',
			ok: event => {
				this.itemSpecificationModelList.at(index);
				const data = this.itemSpecificationModelList.at(index).value;
				if (data.id != null && data.id != 0) {
					this.itemSpecificationService.delete({ id: data.id })
						.subscribe({
							next: val => {
								if (val.successful) {
									this.changeDetector.detectChanges();
								}
							}
						});
				} else {
					this.itemSpecificationModelList.removeAt(index);

				}

			}
		});
	}

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.itemSpecificationService.findById({ itemReceiptDetailId: next }).subscribe({
					next: val => {
						if (val.successful && val.data != null) {
							this.itemSpecificationModelList.clear();
							const length = val.data.length;
							if (length > 0) {
								this.formTitle = 'ویرایش مشخصات اجناس';
								val.data.map((item) => {
									const formArray = this.createItem();
									formArray.patchValue(item);
									this.itemSpecificationModelList.push(formArray);
								});
								const i = this.numOfItems - length;
								this.numOfArray(i);
								this.changeDetector.markForCheck();
							} else {
								this.numOfArray(this.numOfItems);
							}
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
			}
		});

	}


	printBarcode(index) {
		this.tagNumber = this.itemSpecificationModelList.at(index).get('tagNumber').value;
		this.isPrintable = true;

	}
	print() {
		this.isPrintable = false;
	}

	cancel() {
		this.isPrintable = false;
	}

	// calendar section
	setShamsiDate(date: any, index: number) {
		let gDate: String = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = this.dateService.toShamsiDate(date);
			if (this.itemSpecificationModelList.at(index).get('expirationDateShamsi').value != shamsiDate) {
				this.itemSpecificationModelList.at(index).get('expirationDateShamsi').setValue(shamsiDate);
			}

		} else if (date != null && date != '') {
			gDate = date._i + '';
			const shamsiDate = this.dateService.toShamsiDate(date);
			if (this.itemSpecificationModelList.at(index).get('expirationDateShamsi').value != shamsiDate) {
				this.itemSpecificationModelList.at(index).get('expirationDateShamsi').setValue(shamsiDate);
			}
		}
	}

	setGregorianDate(shamsiDate: any, index: number) {
		const gDate: String = shamsiDate + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = this.dateService.toGregorianDate(shamsiDate);
			if (this.itemSpecificationModelList.at(index).get('expirationDate').value != date) {
				this.itemSpecificationModelList.at(index).get('expirationDate').setValue(date);
			}
		}
	}
	ngAfterViewInit() {
		this.dateService.initCalendar();
	}

	getActualIndex(index: number) {

		this.actualIndex = index + this.pageSize * this.pageIndex;
		return this.actualIndex;

	}

	pageChanged(event) {
		this.page = event;
		this.pageIndex = event - 1;
	}

	getFormArrayIndex(index: number) {
		return index + this.pageSize * this.pageIndex;
	}


}
