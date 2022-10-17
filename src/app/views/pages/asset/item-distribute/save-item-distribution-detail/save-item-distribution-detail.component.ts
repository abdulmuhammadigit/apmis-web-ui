import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter, Input, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { ItemRequestDetailService } from '../../../services/asset/item-request/item-request-detail.service';
import { ItemDistributionDetailService } from '../../../services/asset/item-distribution/item-distribution-detail.service';

@Component({
	selector: 'kt-save-item-distribution-detail',
	templateUrl: './save-item-distribution-detail.component.html',
	styleUrls: ['./save-item-distribution-detail.component.scss']
})

export class SaveItemDistributionDetailComponent implements OnInit {

	@Output() itemSpecificationEvent = new EventEmitter<any>();
	btnDisabled = false;
	itemDetailId: number;
	itemDistributionId: number;
	itemName: string;
	itemDetailText: string;
	unitText: string;
	quantity: number;
	result: Array<any>;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;
	counter = 0;
	itemListForm: FormGroup;
	formList: FormArray;
	itemRequestId: number;
	itemRequestDetailId: number;
	itemRequstDetailList: Array<any>;
	hideDetail = false;
	consumable: boolean;
	constructor(
		private fb: FormBuilder,
		private itemDetailService: ItemDetailService,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService,
		public activeModal: NgbActiveModal,
		private itemRequestDetailService: ItemRequestDetailService,
		private itemDistributionDetailService: ItemDistributionDetailService,

	) {
		this.result = [];
	}
	ngOnInit() {
		this.initForm();
		this.counter = 0;
		this.formList.clear();
		this.findItemRequestDetails();
	}
	findItemRequestDetails() {
		const data: any = {};
		data.notDistributed = true;
		data.itemRequestId = this.itemRequestId;
		this.itemRequestDetailService.findById(data).subscribe({
			next: val => {
				if (val.successful) {
					this.itemRequstDetailList = val.data;
					this.changeDetectorRef.markForCheck();
				}
			},
			error: err => {
				this.notify.error(err);
			}
		});
	}

	moveNext(item: any) {
		this.formList.clear();
		this.hideDetail = true;
		this.consumable = item.consumable;
		this.itemDetailText = item.itemDetailText;
		this.unitText = item.unitText;
		this.quantity = item.quantity;
		this.itemRequestDetailId = item.id;
		this.itemDetailId = item.itemDetailId;

		this.itemDetailService.getStockList({ itemDetailId: item.itemDetailId }).subscribe(val => {
			val.data.map((item) => {
				const formArray = this.initItemRows();
				formArray.patchValue(item);

				this.formList.push(formArray);
			});
		});
	}
	moveBack() {
		this.hideDetail = false;
	}
	initForm() {
		this.itemListForm = this.fb.group({
			itemRequestDetailId: [''],
			formList: this.fb.array([this.initItemRows()]),
		});
		this.formList = this.itemListForm.get('formList') as FormArray;
	}
	initItemRows(): FormGroup {
		return this.fb.group({
			itemReceiptCode: [''],
			itemReceiptDetailId: [''],
			firstName: [''],
			lastName: [''],
			price: [''],
			serialNumber: [''],
			tagNumber: [''],
			location: [''],
			expirationDate: [''],
			itemSpecificationId: [0],
			distributedQuantity: [1],
			ischecked: [false],
		});
	}
	checkedState(event: any, i) {
		let abc: boolean;
		if (event.target.checked === true) {
			if (this.counter < this.quantity) {
				this.counter++;
				event.target.checked = true;
				abc = true;
			} else {
				this.notify.notice('تنها ' + this.quantity + ' ' + this.unitText + ' جنس قابل انتخاب میباشد');
				event.target.checked = false;
				abc = false;
			}
		} else {
			this.counter--;
			event.target.checked = false;
			abc = false;
		}
		this.formList.at(i).patchValue({
			ischecked: abc,
		});
	}
	submit() {
		this.result = [];
		this.formList.controls.forEach(element => {
			if (element.value.ischecked) {
				this.result.push({
					itemReceiptDetailId: element.value.itemReceiptDetailId,
					quantity: element.value.distributedQuantity,
					itemRequestDetailId: this.itemRequestDetailId,
					itemSpecificationId: element.value.itemSpecificationId,
					itemDistributionId: this.itemDistributionId,
					itemDetailId: this.itemDetailId,
				});
			}
		});

		this.itemDistributionDetailService.save({ data: this.result }).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success('معلومات موفقانه ثبت گردید!');
					this.itemSpecificationEvent.emit(this.result);
					this.activeModal.close(this.result);
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});

	}
}
