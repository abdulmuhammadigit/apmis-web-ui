import { ItemService } from './../../../services/asset/item/item.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { BehaviorSubject, Subject } from 'rxjs';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { UnitExchangeService } from '../../../services/configuration/unit-exchange/unit-exchange.service';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';


@Component({
	selector: 'kt-create-unit-exchange',
	templateUrl: './create-unit-exchange.component.html',
	styleUrls: ['./create-unit-exchange.component.scss']
})
export class CreateUnitExchangeComponent implements OnInit {

	id: Subject<number>;
	result: Subject<any>;
	public unitExchangeForm: FormGroup;
	formTitle: string;
	public unitList = [];
	public itemList = [];

	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private unitExchangeService: UnitExchangeService,
		private lookListService: LookListService,
		private itemService: ItemService,
		private changeDetector: ChangeDetectorRef) {
		this.id = new BehaviorSubject(0);
		this.formTitle = " ثبت تبدیل واحد ";
		this.result = new Subject<any>();
		this.initializaForm();

	}

	ngOnInit() {

		this.getUnitList();
		this.getItemList();
		this.findData();

	}

	// form initialization

	initializaForm() {
		this.unitExchangeForm = this.fb.group({
			id: [''],
			unitId: ['', Validators.required],
			quantity: ['', Validators.required],
			toUnitId: ['', Validators.required],
			itemId: ['']
		});

	}

	//look section

	getUnitList() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unitList = res;
			this.changeDetector.detectChanges();
		})
	}

	getItemList() {
		this.itemService.getList({}).subscribe((res) => {
			this.itemList = res.data;
			this.changeDetector.detectChanges();
		})
	}

	//operation

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش  تبدیل واحد ';
				this.unitExchangeService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {

							this.unitExchangeForm.patchValue({
								id: val.data.id,
								unitId: val.data.unitId,
								quantity: val.data.quantity,
								toUnitId: val.data.toUnitId,
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


	submit() {

		const controls = this.unitExchangeForm.controls;
		/** check form */
		if (this.unitExchangeForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.unitExchangeService.save(this.unitExchangeForm.value).subscribe({
			next: val => {
				if (val.successful) {

					this.notify.success("معلومات موفقانه ثبت گردید!");

					this.unitExchangeForm.patchValue({
						id: val.data.id,
						unitId: val.data.unitId,
						quantity: val.data.quantity,
						toUnitId: val.data.toUnitId,
					});

					this.changeDetector.markForCheck();
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

	cancelClick() {
		this.result.next(-1);
	}


	newRecord() {
		this.unitExchangeForm.reset();
	}

	// utility
	isControlHasError(controlName, type) {
		const control = this.unitExchangeForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


}
