import { ItemDistributionDetailService } from './../../../services/asset/item-distribution/item-distribution-detail.service';
import { ProcessEntity } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ItemReallocationService } from '../../../services/asset/item-reallocation/item-reallocation.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as jMoment from 'jalali-moment';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { ItemReallocationDetailService } from '../../../../../views/pages/services/asset/item-reallocation/item-reallocation-detail.service';
import { LookListService } from '../../../../../views/pages/services/asset/look/look-list.service';
import { PrintItemReallocationComponent } from '../print-item-reallocation/print-item-reallocation.component';
import { ItemReallocateSpecificationComponent } from '../../item-receipt/item-reallocate-specification/item-reallocate-specification.component';
import { EmployeeService } from '../../../services/asset/hr/employee.service';

@Component({
	selector: 'kt-create-item-reallocation',
	templateUrl: './create-item-reallocation.component.html',
	styleUrls: ['./create-item-reallocation.component.scss']
})
export class CreateItemReallocationComponent implements OnInit {

	result: Subject<any>;
	createForm: FormGroup;
	formTitle: string;
	closeResult: string;
	modelOption: NgbModalOptions;
	id: Subject<number>;
	hideDetail = false;
	btnDisabled = true;
	itemDetailId: any;
	employeeId: any;
	employeeList: any = [];
	itemRequestDetailId: any;
	itemReallocationId: any;
	itemDistributionId: any;
	itemDistributionDetailId: any;
	itemSpecificationId: Array<any>;

 	public ItemReallocationDetailModel: FormArray;

	public employeeDetailsList = [];
	public itemDetailIdList = [];
	public statusList = [];
	public Editor = ClassicEditor;

	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	public dateConfigShamsi;
	public dateConfigGregorian;
	@ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
	@ViewChild('date', { static: false }) date: DatePickerComponent;



	setShamsiDate(date: any) {
		const gDate: String = date + '';
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const shamsiDate = jMoment(date, 'YYYY-MM-DD').format('jYYYY-jMM-jDD');
			if (this.createForm.get('shamsiDate').value != shamsiDate) {
				this.createForm.get('shamsiDate').setValue(shamsiDate);
			}
		}
	}

	setDate(shamsiDate: string) {
		const sDate: String = shamsiDate + '';
		if (sDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			const date = jMoment(shamsiDate, 'jYYYY-jMM-jDD').format('YYYY-MM-DD');
			if (this.createForm.get('date').value != date) {
				this.createForm.get('date').setValue(date);
			}
		}
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

	constructor(
		private fb: FormBuilder,
		private modalService: NgbModal,
		private notify: NotificationService,
		private dpService: DatePickerService,
		private changeDetector: ChangeDetectorRef,
		private lookListService: LookListService,
		private employeeService: EmployeeService,
		private processTrackingService: ProcessTrackingService,
		private itemReallocationService: ItemReallocationService,
		private itemDistributionDetailService: ItemDistributionDetailService,
		private itemReallocationDetailService: ItemReallocationDetailService,
	) {
		this.initializeForm();

		this.id = new BehaviorSubject(0);
		this.result = new Subject<any>();

		this.dateConfigGregorian = dpService.dateConfigGregorian;
		this.dateConfigShamsi = dpService.dateConfigShamsi;
	}

	async ngOnInit() {
		this.formTitle = 'فورم اعاده تحویلخانه';
		this.findData();
		this.getStatusList();

		this.ItemReallocationDetailModel.clear();
		const employeeResult = await this.employeeService.search({ byOrgUnit: true }).toPromise();
		if (employeeResult.successful) {
			this.employeeList = employeeResult.data;
		}
	}

	initializeForm() {
		this.createForm = this.fb.group({
			id: [''],
			code: [{ value: '', disabled: true }],
			documentNumber: [''],
			description: [''],
			date: [jMoment(new Date()).format('YYYY-MM-DD'), Validators.required],
			shamsiDate: [jMoment(new Date()).format('jYYYY-jMM-jDD'), Validators.required],
			employeeText: ['', Validators.required],
			employeeId: ['', Validators.required],

			ItemReallocationDetailModel: this.fb.array([this.initializeDetailForm()]),
		});
		this.ItemReallocationDetailModel = this.createForm.get('ItemReallocationDetailModel') as FormArray;
	}

	initializeDetailForm(): FormGroup {
		return this.fb.group({
			id: [''],
			itemDistributionId: '',
			itemDistributionDetailId: '',
			itemRequestDetailId: '',
			itemDetailId: '',
			itemDetailText: '',
			quantity: '',
			unitId: '',
			unitText: '',
			remain: '',
			requestedQuantity: '',
			distributed: [],
			reallocationQuantity: ['', Validators.required],
			description: '',
			statusId: '',
			itemReallocationDetailId: ''
		});
	}


	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش فورم';

				this.itemReallocationService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							console.log(val.data);
							this.processTracking(val.data.id, val.data.stageId);
							this.createForm.patchValue({
								id: val.data.id,
								code: val.data.code,
								documentNumber: val.data.documentNumber,
								date: val.data.date,
								employeeId: val.data.employeeId,
								employeeText: val.data.employeeText,
								description: val.data.description
							});
							this.ItemReallocationDetailModel.clear();

							val.data.itemReallocationDetailModels.map((item) => {
								const formArray = this.initializeDetailForm();
								formArray.patchValue(item);
								this.ItemReallocationDetailModel.push(formArray);
							});
							this.changeDetector.markForCheck();
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

	create() {
		// const controls = this.createForm.controls;
		// /** check form */
		// if (this.createForm.invalid) {
		// 	Object.keys(controls).forEach(controlName =>
		// 		controls[controlName].markAsTouched()
		// 	);
		// 	return;
		// }

		this.itemReallocationService.save(this.createForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.processTracking(val.data.id, val.data.stageId);
					this.notify.success('معلومات موفقانه ثبت گردید!');

					console.log(val.data);
					this.itemReallocationId = val.data.id;

					this.createForm.patchValue({
						id: val.data.id,
						code: val.data.code,
						documentNumber: val.data.documentNumber,
						date: val.data.date,
						employeeId: val.data.employeeId,
						employeeText: val.data.employeeText,
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
	submitDetail(index) {

		const controls = this.ItemReallocationDetailModel.controls[index] as FormGroup;

		/** check form */
		if (controls.invalid) {
			Object.keys(controls.controls).forEach(controlName =>
				controls.controls[controlName].markAsTouched()
			);
			return;
		}

		const data = this.createForm.get('ItemReallocationDetailModel').value[index];
		data.itemReallocationId = this.createForm.get('id').value;

		this.itemReallocationDetailService.save(data).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success('معلومات موفقانه ثبت گردید!');
					this.ItemReallocationDetailModel.at(index).patchValue(val.data);
					this.changeDetector.markForCheck();
					this.btnDisabled = false;
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

	isControlHasError(controlName, type) {
		const control = this.createForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.ItemReallocationDetailModel.controls[index] as FormGroup;
		const control = controls.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	// look section
	getStatusList() {
		this.lookListService.getStatusList({}).subscribe((res) => {
			this.statusList = res.data;
			this.changeDetector.detectChanges();
		});
	}
	selectItem(item: any) {

	}
	searchDistributedItem(index) {

		const modalRef = this.modalService.open(ItemReallocateSpecificationComponent, { size: 'xl' });
		const data = this.createForm.get('ItemReallocationDetailModel').value[index];
		modalRef.componentInstance.itemDistributionId = data.itemDistributionDetailId;
		modalRef.componentInstance.itemReallocationDetailId = data.id;
		modalRef.result.then((result) => {
			if (result) {
			}
		},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});

		modalRef.componentInstance.itemDistributionDetailId.next(data.itemDistributionDetailId);
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
	employeeChanged($event) {
		console.log($event.value);
	}

	removeItem(index: number) {
		const record = (this.createForm.get('ItemReallocationDetailModel').value)[index];
		if (record.id == '' || record.id == 0) {
			this.ItemReallocationDetailModel.removeAt(index);
			this.changeDetector.markForCheck();
		} else {
			this.itemDistributionDetailService.delete({ id: record.id }).subscribe({
				next: val => {
					if (val.successful) {
						this.notify.success('معلومات موفقانه حذف گردید!');
						this.ItemReallocationDetailModel.removeAt(index);
						this.changeDetector.markForCheck();
					}

				},
				error: err => {
					this.notify.error(err);
				}
			});
		}
	}
	newRecord() {
		this.processTrackingService.clear();
		this.formTitle = 'فورم اعاده تحویلخانه',
			this.createForm.patchValue({
				id: '',
				code: '',
				date: '',
				dateShamsi: '',
				employeeId: '',
				employeeText: '',
				description: ''
			});
		this.ItemReallocationDetailModel.clear();
	}

	print() {
		const modalRef = this.modalService.open(PrintItemReallocationComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
			}
		}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
		const id = (this.createForm.get('id').value);
		modalRef.componentInstance.id.next(id);
	}

	processTracking(recordId: number, currentStageId: number) {
		this.processTrackingService.setRecordId(recordId);
		this.processTrackingService.setClassificationId(null);
		this.processTrackingService.setEntity(ProcessEntity.ItemReallocation);
		this.processTrackingService.setCurrentStageId(currentStageId);
	}
}
