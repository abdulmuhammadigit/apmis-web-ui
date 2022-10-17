import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, of, Subject } from "rxjs";
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LookListService } from '../../../services/asset/look/look-list.service';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { AuctionService } from '../../../services/asset/auction/auction.service';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { PrintAuctionComponent } from '../print-auction/print-auction/print-auction.component';
import { SearchItemSpecificationComponent } from '../../item/search-item-specification/search-item-specification.component';

@Component({
	selector: 'kt-create-auction',
	templateUrl: './create-auction.component.html',
	styleUrls: ['./create-auction.component.scss']
})
export class CreateAuctionComponent implements OnInit {
	closeResult: string;
	modalOptions: NgbModalOptions;

	id: Subject<number>;
	editable: boolean;
	result: Subject<any>;
	auctionForm: FormGroup;
	miladiNgModel: string;
	shamsiNgModel: string;
	formTitle: string;
	public fiscalyear = [];
	status = [];
	public auctionFormList = [];

	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;


	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private lookListService: LookListService,
		private auctionService: AuctionService,
		private cdf: ChangeDetectorRef,
		public dateService: DatePickerService,
		private notify: NotificationService,
		private processTrackingService: ProcessTrackingService) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "ثبت فورم لیلام ";
		this.initializeForm();
	}



	initializeForm() {
		this.auctionForm = this.fb.group({
			id: [''],
			itemSpecificationId: [''],
			itemDetailId: ['', Validators.required],
			itemDetailText: ['', Validators.required],
			price: ['', Validators.required],
			date: [jMoment(new Date()).format('YYYY-MM-DD'), Validators.required],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD'), Validators.required],
			quantity: ['', Validators.required],
			fiscalYearId: ['', Validators.required],
			statusId: ['']

		});
	}

	setShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let shamsiDate = this.dateService.toShamsiDate(date);
			if (this.auctionForm.get('shamsiDate').value != shamsiDate)
				this.auctionForm.get('shamsiDate').setValue(shamsiDate);
		}
	}

	setGregorianDate(shamsiDate: any) {
		let gDate: String = shamsiDate + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let date = this.dateService.toGregorianDate(shamsiDate);
			if (this.auctionForm.get('date').value != date)
				this.auctionForm.get('date').setValue(date);
		}
	}
	getfiscalyearList() {
		this.lookListService.getFiscalYearList().subscribe((res) => {
			this.fiscalyear = res;
		})
	}
	getStatus() {
		this.lookListService.getStatusList({}).subscribe((res) => {
			this.status = res.data;
		})
	}

	ngOnInit() {
		this.findData();
		this.getfiscalyearList();
		this.getStatus();

	}

	ngAfterViewInit() {
		this.dateService.initCalendar();
	}

	newAuction() {
		this.auctionForm.reset();
	}


	//utility
	cancelClick() {
		this.result.next(-1);
	}

	searchItemDetail() {
		const modalRef = this.modalService.open(SearchItemSpecificationComponent, { size: 'lg' });
		modalRef.componentInstance.itemRequestEvent.subscribe(value => {
			// console.log(value)
			this.auctionForm.patchValue({
				itemDetailId: value.id,
				itemDetailText: value.itemDetail,
				price: value.reallocatedPrice,
				itemSpecificationId: value.itemSpecificationId

			});

		})
	}

	isControlHasError(controlName, type) {
		const control = this.auctionForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	printAuctionForm() {
		const modalRef = this.modalService.open(PrintAuctionComponent, { size: 'xl' });
		let id = (this.auctionForm.get('id').value)
		modalRef.componentInstance.id.next(id);
	}



	submit() {

		const controls = this.auctionForm.controls;
		/** check form */
		if (this.auctionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.auctionService.save(this.auctionForm.value).subscribe({

			next: data => {
				if (data.successful) {
					// console.log("form", this.auctionForm.value)
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.auctionForm.patchValue({
						id: data.data.id,
						itemDetailId: data.data.itemDetailId,
						itemSpecificationId: data.data.itemSpecificationId,
						quantity: data.data.quantity,
						statusId: data.data.statusId,
						date: data.data.date,
						price: data.data.price,
						fiscalYearId: data.data.fiscalYearId
					});

					this.cdf.markForCheck();
					this.editable = true;
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
				this.formTitle = 'ویرایش لیلام';
				this.auctionService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.auctionForm.patchValue({
								id: val.data.id,
								itemDetailId: val.data.itemDetailId,
								itemDetailText: val.data.itemDetailText,
								itemSpecificationId: val.data.itemSpecificationId,
								price: val.data.price,
								quantity: val.data.quantity,
								date: val.data.date,
								fiscalYearId: val.data.fiscalYearId,
								statusId: val.data.statusId,
							});
							this.cdf.detectChanges();
							this.cdf.markForCheck();
							this.editable = true;
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});

	}


}
