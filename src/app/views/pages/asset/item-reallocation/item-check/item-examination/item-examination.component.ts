import { ProcessTrackingService } from './../../../../services/process-tracking/process-tracking.service';
import { ProcessEntity, StatusCategory, StatusObjectName } from './../../../../../../../environments/environment';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemReallocationDetailService } from '../../../../services/asset/item-reallocation/item-reallocation-detail.service';
import { NotificationService } from '../../../../../../core/_base/layout/services/notification.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
	selector: 'kt-item-examination',
	templateUrl: './item-examination.component.html',
	styleUrls: ['./item-examination.component.scss']
})
export class ItemExaminationComponent implements OnInit {
	id: Subject<number>;
	result: any;
	editable: boolean;
	public itemExaminationForm: FormGroup;
	public ItemReallocationSpecificationModel: FormArray;
	formTitle: string;
	public itemStatusList = [];
	itemReallocationId: any;
	public statusList = [];



	initializaForm() {
		this.itemExaminationForm = this.formBuilder.group({
			itemReallocationId: [''],

			ItemReallocationSpecificationModel: this.formBuilder.array([]),
		});
		this.ItemReallocationSpecificationModel = this.itemExaminationForm.get('ItemReallocationSpecificationModel') as FormArray;
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
			boardStatusId: '',
			examinerBoard: ''
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
		this.formTitle = " نظر هیت معاینه جنس ";
		this.initializaForm();
	}

	ngOnInit() {
		this.findData();
		this.getStatusList();
	}

	getStatusList() {
		this.LookListService.getStatusList({ dbObject: StatusObjectName.ItemReallocationSpecification, category: StatusCategory.ReallocationSpecification }).subscribe((res) => {
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
								this.ItemReallocationSpecificationModel.push(formArray);
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
		let data = this.itemExaminationForm.get('ItemReallocationSpecificationModel').value[index];

		let record: any = {};
		record.id = data.id;
		record.itemReallocationDetailId = data.itemReallocationDetailId;
		const formArray = this.ItemReallocationSpecificationModel.controls[index];
		record.boardStatusId = formArray.get('boardStatusId').value;
		record.examinerBoard = formArray.get('examinerBoard').value;

		this.itemReallocationDetailService.saveItemExamination(record).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.ItemReallocationSpecificationModel.at(index).patchValue(val.data);
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
