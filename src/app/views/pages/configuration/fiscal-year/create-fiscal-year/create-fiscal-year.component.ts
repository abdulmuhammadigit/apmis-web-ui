import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { BehaviorSubject, Subject } from 'rxjs';
import { FiscalYearService } from '../../../services/configuration/fiscal-year/fiscal-year.service';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';


@Component({
	selector: 'kt-create-fiscal-year',
	templateUrl: './create-fiscal-year.component.html',
	styleUrls: ['./create-fiscal-year.component.scss']
})
export class CreateFiscalYearComponent implements OnInit {

	id: Subject<number>;
	result: Subject<any>;
	public fiscalYearForm: FormGroup;
	formTitle: string;
	public shamsiYearList = [];

	@ViewChild('startDateShamsi', { static: false }) startShamsiDate: DatePickerComponent;
	@ViewChild('startDate', { static: false }) startDate: DatePickerComponent;

	@ViewChild('endDateShamsi', { static: false }) endShamsiDate: DatePickerComponent;
	@ViewChild('endDate', { static: false }) endDate: DatePickerComponent;

	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private fiscalYearService: FiscalYearService,
		public dateService: DatePickerService,
		private changeDetector: ChangeDetectorRef) {
		this.id = new BehaviorSubject(0);
		this.formTitle = " ثبت سال مالی";
		this.result = new Subject<any>();
		this.initializaForm();

	}

	ngOnInit() {
		this.getShamsiYear();
		this.findData();


	}
	//initialize form
	initializaForm() {
		this.fiscalYearForm = this.fb.group({
			id: [''],
			shamsiYear: ['', Validators.required],
			startDate: ['', Validators.required],
			startDateShamsi: ['', Validators.required],
			endDate: ['', Validators.required],
			endDateShamsi: ['', Validators.required],
		});

	}

	//operation

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش  سال مالی';
				this.fiscalYearService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.fiscalYearForm.patchValue({
								id: val.data.id,
								shamsiYear: val.data.shamsiYear,
								startDate: val.data.startDate,
								endDate: val.data.endDate,
								currentFiscalYear: val.data.currentFiscalYear
							});
							this.changeDetector.markForCheck();

						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	newRecord() {
		this.fiscalYearForm.reset();
	}
	submit() {

		const controls = this.fiscalYearForm.controls;
		/** check form */
		if (this.fiscalYearForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.fiscalYearService.save(this.fiscalYearForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.fiscalYearForm.patchValue({
						id: val.data.id,
						shamsiYear: val.data.shamsiYear,
						startDate: val.data.startDate,
						endDate: val.data.endDate,
						currentFiscalYear: val.data.currentFiscalYear
					});
					this.changeDetector.markForCheck();
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

	// utility

	getShamsiYear() {
		var miladiYear = new Date().getFullYear();
		var shamsiYear = miladiYear - 621;

		this.shamsiYearList.push(shamsiYear + 1);
		this.shamsiYearList.push(shamsiYear);
		for (var i = 1; i < 10; i++) {
			this.shamsiYearList.push(shamsiYear - i);
		}
	}

	isControlHasError(controlName, type) {
		const control = this.fiscalYearForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


	// calendar section
	setStartShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let startShamsiDate = this.dateService.toShamsiDate(date);
			if (this.fiscalYearForm.get('startDateShamsi').value != startShamsiDate)
				this.fiscalYearForm.get('startDateShamsi').setValue(startShamsiDate);

		}
	}

	setEndShamsiDate(date: any) {
		let gDate: String = date + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let endShamsiDate = this.dateService.toShamsiDate(date);
			if (this.fiscalYearForm.get('endDateShamsi').value != endShamsiDate)
				this.fiscalYearForm.get('endDateShamsi').setValue(endShamsiDate);
		}
	}

	setStartGregorianDate(shamsiDate: any) {
		let gDate: String = shamsiDate + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let startDate = this.dateService.toGregorianDate(shamsiDate);
			if (this.fiscalYearForm.get('startDate').value != startDate)
				this.fiscalYearForm.get('startDate').setValue(startDate);

		}
	}

	setEndGregorianDate(shamsiDate: any) {
		let gDate: String = shamsiDate + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			let endDate = this.dateService.toGregorianDate(shamsiDate);
			if (this.fiscalYearForm.get('endDate').value != endDate)
				this.fiscalYearForm.get('endDate').setValue(endDate);
		}
	}
	ngAfterViewInit() {
		this.dateService.initCalendar();
	}



}
