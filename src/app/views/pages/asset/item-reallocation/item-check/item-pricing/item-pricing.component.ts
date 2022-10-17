import { ProcessEntity } from './../../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../../services/process-tracking/process-tracking.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemReallocationDetailService } from '../../../../services/asset/item-reallocation/item-reallocation-detail.service';
import { NotificationService } from '../../../../../../core/_base/layout/services/notification.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
	selector: 'kt-item-pricing',
	templateUrl: './item-pricing.component.html',
	styleUrls: ['./item-pricing.component.scss']
})
export class ItemPricingComponent implements OnInit {

	id: Subject<number>;
	result: any;
	editable: boolean;
	public itemPricingForm: FormGroup;
	public ItemReallocationBoardModel: FormArray;
	formTitle: string;
	public itemStatusList = [];
	itemReallocationId: any;
	public statusList = [];



	initializaForm() {
		this.itemPricingForm = this.formBuilder.group({
			itemReallocationId: [''],

			ItemReallocationBoardModel: this.formBuilder.array([]),
		});
		this.ItemReallocationBoardModel = this.itemPricingForm.get('ItemReallocationBoardModel') as FormArray;
	}
	createItem(): FormGroup {
		return this.formBuilder.group({
			id: [''],
			itemReallocationDetailId: '',
			item: '',
			itemDetail: '',
			itemSpecificationId: '',
			serialNumber: '',
			tagNumber: '',
			location: '',
			expirationDate: '',
			depreciationDay: '',
			itemReceiptDetailId: '',
			price: '',
			mainPrice: ['']
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private LookListService: LookListService,
		private itemReallocationDetailService: ItemReallocationDetailService,
		private changeDetectorRef: ChangeDetectorRef,
		public activeModal: NgbActiveModal,
		private notify: NotificationService,
		private processTrackingService: ProcessTrackingService
	) {
		this.id = new BehaviorSubject(0);
		this.formTitle = " نظر هیت قیمت گذاری جنس ";
		this.initializaForm();
	}

	ngOnInit() {
		this.findData();
		this.getStatusList();
	}

	getStatusList() {
		this.LookListService.getStatusList({}).subscribe((res) => {
			this.statusList = res.data;
			this.changeDetectorRef.detectChanges();
		})
	}


	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.itemReallocationDetailService.findById({ itemReallocationId: next }).subscribe({
					next: val => {
						if (val.successful) {
							if (val.data.length > 0) {
								this.processTracking(val.data[0].itemReallocationId, val.data[0].stageId)
							}
							val.data.map((item) => {
								let formArray = this.createItem();
								formArray.patchValue(item);
								this.ItemReallocationBoardModel.push(formArray);
							})
							this.changeDetectorRef.markForCheck();

						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});

	}

	submit(index) {
		let data = this.itemPricingForm.get('ItemReallocationBoardModel').value[index];
		let record: any = {};
		record.id = data.id;
		record.itemReallocationDetailId = data.itemReallocationDetailId;
		const formArray = this.ItemReallocationBoardModel.controls[index];
		record.price = formArray.get('price').value;

		this.itemReallocationDetailService.saveItemPrice(record).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.ItemReallocationBoardModel.at(index).patchValue(val.data);
					this.changeDetectorRef.markForCheck();
				}
			},
			error: er => {
				this.notify.error(er);
				this.changeDetectorRef.markForCheck();
			}
		});
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemReallocation);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}


}
