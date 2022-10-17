import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { ProcessEntity } from './../../../../../../environments/environment';
import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Subject, BehaviorSubject } from 'rxjs';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ItemDistributionService } from '../../../services/asset/item-distribution/item-distribution.service';
import { ItemRequestDetailService } from '../../../services/asset/item-request/item-request-detail.service';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { SearchItemReceiptSpecificationComponent } from '../../item-receipt/search-item-receipt-specification/search-item-receipt-specification.component';
import { PrintItemDistributeComponent } from '../print-item-distribute/print-item-distribute.component';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';

@Component({
	selector: 'kt-approve-item-distribution',
	templateUrl: './approve-item-distribution.component.html',
	styleUrls: ['./approve-item-distribution.component.scss']
})
export class ApproveItemDistributionComponent implements OnInit {
	hideDetail = true;
	notDistributed: boolean;
	closeResult: string;
	modelOption: NgbModalOptions;
	id: Subject<number>;
	editable: boolean;
	result: Subject<any>;
	formTitle: string;
	thing: any;
	itemId: any;
	btnDisabled = true;
	itemDetailId: any;
	itemRequestId: any;
	itemRequestCode: any;
	itemRequestDetailId: any;
	itemDistributionId: any;
	itemSpecificationId: Array<any>;
	public itemDistributionForm: FormGroup;
	public itemDistributionDetailModelList: FormArray;
	public itemDetailIdList = [];
	public Editor = ClassicEditor;
	public dateConfigShamsi;
	public dateConfigGregorian;
	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	setShamsiDate(date: any) {
		const gDate: String = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = jMoment(date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
			if (this.itemDistributionForm.get('shamsiDate').value != shamsiDate) {
				this.itemDistributionForm.get('shamsiDate').setValue(shamsiDate);
			}
		}
	}

	setdate(shamsiDate: any) {
		const sDate: String = shamsiDate + '';
		if (sDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = jMoment(shamsiDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			if (this.itemDistributionForm.get('date').value != date) {
				this.itemDistributionForm.get('date').setValue(date);
			}
		}
	}


	constructor(private fb: FormBuilder,
		           private itemDistributionServie: ItemDistributionService,
		           private itemRequestDetailService: ItemRequestDetailService,
		           private changeDetector: ChangeDetectorRef,
		           private modalService: NgbModal,
		           private processTrackingService: ProcessTrackingService,
		           private notify: NotificationService,
	) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = 'تکت توزیع تحویلخانه';
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
	}

	initializaForm() {

		this.itemDistributionForm = this.fb.group({
			id: 0,
			code: [''],
			documentNumber: [''],
			// date: [''],
			itemRequestId: [''],
			itemRequestCode: [''],
			description: [''],
			date: [jMoment(new Date()).format('YYYY-MM-DD')],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD')],

			itemDistributionDetailModelList: this.fb.array([this.initializeDetailForm()]),

		});

		this.itemDistributionDetailModelList = this.itemDistributionForm.get('itemDistributionDetailModelList') as FormArray;

	}

	initializeDetailForm(): FormGroup {
		return this.fb.group({
			id: [],
			itemDetailId: '',
			itemDetailText: '',
			detail: '',
			quantity: '',
			remain: '',
			requestedQuantity: '',
			unitId: '',
			unitText: '',
			itemRequestDetailId: '',
			status: ''
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemDistribution);
		this.processTrackingService.setCurrentStageId(currentStageId);
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
								this.itemDistributionDetailModelList.push(formArray);
							});
							this.changeDetector.markForCheck();
							this.changeDetector.detectChanges();
							this.hideDetail = false;

							const data: any = {};
							data.notDistributed = true;
							data.itemRequestId = val.data.itemRequestId;
							this.itemRequestDetailService.findById(data).subscribe({
								next: val => {
									if (val.successful) {
										val.data.map((item) => {
											const formArray = this.initializeDetailForm();
											item.quantity = item.remain;
											item.itemRequestDetailId = item.id;
											item.id = 0;
											item.status = 'درخواست شده';
											formArray.patchValue(item);
											this.itemDistributionDetailModelList.push(formArray);
										});

										this.changeDetector.markForCheck();
									}
								},
								error: err => {
									this.notify.error(err);
								}
							});
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
			}
		});

	}

	selectItemReceiptSpecification() {
		const id = this.itemDistributionForm.get('id').value;
		const modalRef = this.modalService.open(SearchItemReceiptSpecificationComponent, { size: 'xl' });
		modalRef.componentInstance.itemDistributedId = this.itemDistributionId;
		modalRef.result.then((result) => {
		},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});

		// this.onOperation = true;
		// const comp = this.creator.Construct(ApproveItemDistributionComponent, this.host);
		// comp.instance.result.subscribe(nex => {
		//   this.onOperation = false;
		//   comp.destroy()
		// });
		// comp.instance.id.next(id);
	}

	// printForm() {

	// 	const modalRef = this.modalService.open(PrintItemDistributeComponent, { size: 'lg' });
	// 	modalRef.componentInstance.itemDistributedId = this.itemDistributionId;
	// 	modalRef.result.then((result) => {
	// 	},
	// 		(reason) => {
	// 			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 		});

	// 	let id = (this.itemDistributionForm.get("id").value)
	// 	console.log(id)
	// 	modalRef.componentInstance.id.next(id);
	// }

}
