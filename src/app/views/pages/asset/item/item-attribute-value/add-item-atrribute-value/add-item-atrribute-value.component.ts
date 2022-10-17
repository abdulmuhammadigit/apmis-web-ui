import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { ItemAttributeValueService } from '../../../../services/asset//item/item-attribute-value.service';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { elementAt } from 'rxjs/operators';
import { Validators } from '@angular/forms';


@Component({
	selector: 'kt-add-item-atrribute-value',
	templateUrl: './add-item-atrribute-value.component.html',
	styleUrls: ['./add-item-atrribute-value.component.scss']
})
export class AddItemAtrributeValueComponent implements OnInit {

	//itemId: Subject<number> = new Subject<number>();
	@Input() itemId;
	@Input() itemName;
	numOfIAtt: any;
	public detail = [];
	itemDetail: any;
	curItemId: number;


	public itemAttributeValueList: FormArray;
	public itemAttributeValueForm: FormGroup;
	editable: boolean;
	result: Subject<any>;
	id: Subject<number>;
	formTitle: string;
	public unitsList = [];
	public attributeList = [];
	public valueList = [];
	public unitText = [];



	constructor(
		public activeModal: NgbActiveModal,
		private ItemAttributeValueService: ItemAttributeValueService,
		private changeDetector: ChangeDetectorRef,
		private notify: NotificationService,
		private lookListService: LookListService,
		private fb: FormBuilder) {

		this.result = new Subject<any>();
		this.editable = false;
		this.id = new BehaviorSubject(0);
		this.formTitle = "ثبت شرح مشخصات اجناس ";

	}

	ngOnInit() {
		this.getUnitsList();
		this.curItemId = this.itemId;
		this.initializaForm();


		this.id.subscribe(next => {
			if (next > 0) {
				this.formTitle = "ویرایش شرح مشخصات اجناس";
			}
			const data = ({ itemId: this.curItemId, itemDetailId: next });
			this.ItemAttributeValueService.findById(data).subscribe({
				next: val => {
					if (val.successful) {
						this.itemAttributeValueForm.patchValue({
							itemDetailId: next
						});
						this.itemAttributeValueList.clear();
						val.data.map((item) => {
							item.unitId = (item.unitId == 0 ? '' : item.unitId);
							let group = this.createItem();
							group.patchValue(item);

							this.itemAttributeValueList.push(group);
						})

						this.changeDetector.markForCheck();
						this.editable = true;

					}
				},
				error: err => {
					this.notify.error(err);
				}
			})
		});

	}

	initializaForm() {
		this.itemAttributeValueForm = this.fb.group({
			itemId: this.curItemId,
			itemDetailId: ['', Validators.required],
			detail: ['', Validators.required],

			itemAttributeValueList: this.fb.array([this.createItem()]),
		});
		this.itemAttributeValueList = this.itemAttributeValueForm.get('itemAttributeValueList') as FormArray;
	}



	createItem(): FormGroup {
		return this.fb.group({
			id: [],
			attributeId: [''],
			itemDeailId: [''],
			unitId: [''],
			value: ['', Validators.required],
			attributeText: [''],
			dataTypeName: [{ value: '', disabled: true }]
		});
	}



	getUnitsList() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unitsList = res;

		})
	}

	submit() {

		const controls = this.itemAttributeValueForm.controls;
		const control = controls["itemAttributeValueList"] as FormArray;
		for (let i = 0; i < control.length; i++) {
			const cont = control.controls[i] as FormGroup;
			/** check form */
			if (cont.invalid) {
				Object.keys(cont.controls).forEach(controlName =>
					cont.controls[controlName].markAsTouched()
				);
				return;
			}
		}

		this.getitemDetail();
		let data = this.itemAttributeValueForm.value;
		this.ItemAttributeValueService.save(data).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.changeDetector.markForCheck();
					if (this.editable) {
						this.result.next(1);
					}

					this.activeModal.close();
				}

			},
			error: er => {
				this.notify.error(er);
			}
		});

	}

	getNameOfUnit(unitId) {

		if (unitId != null && unitId != undefined) {
			let found = this.unitsList.find(element => element.id == unitId);
			return found;
		}
		return;

	}

	getitemDetail() {
		this.itemAttributeValueList.controls.forEach(item => {
			this.valueList.push(item.get('value').value);
			let unitId = item.get('unitId').value;
			if (unitId != "") {

				let unit = this.unitsList.find(element => element.id == unitId);
				if (unit != null && unit != undefined) {
					this.unitText.push(unit.name)
				}
			} else {
				this.unitText.push("");
			}

			this.attributeList.push(item.get('attributeText').value);
		});

		for (let i = 0; i < this.attributeList.length; i++) {
			this.detail.push("(" + this.attributeList[i] + ":" + this.valueList[i] + " " + this.unitText[i] + ")");
			this.itemDetail = this.detail.map(e => e).join('',)
		}
		this.itemDetail = this.itemName + "[" + this.itemDetail + "]";

		this.itemAttributeValueForm.patchValue({
			detail: this.itemDetail,
		});
	}

	// utility
	isControlHasError(controlName, type) {
		const control = this.itemAttributeValueForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	isDetailControlHasError(controlName, type, index) {
		const controls = this.itemAttributeValueForm.controls;
		const control = controls["itemAttributeValueList"] as FormArray;
		const cont = control.controls[index] as FormGroup;
		const cc = cont.controls[controlName];
		if (!cc.valid) {
			return true;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
}
