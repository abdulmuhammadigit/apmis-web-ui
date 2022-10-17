import { ItemAttributeValueComponent } from './../item-attribute-value/item-attribute-value/item-attribute-value.component';
import { ItemAttributeComponent } from './../itemAttribute/item-attribute/item-attribute.component';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { Validators } from '@angular/forms';



@Component({
	selector: 'kt-create-item',
	templateUrl: './create-item.component.html',
	styleUrls: ['./create-item.component.scss']
})
export class CreateItemComponent implements OnInit {

	curCategoryId: any;
	itemId: any;
	itemName: any;
	id: Subject<number>;
	editable: boolean;
	result: Subject<any>;
	public itemForm: FormGroup;
	formTitle: string;
	public unitsList = [];
	public categoryList = [];
	@ViewChildren(ItemAttributeComponent)
	itemAttributeComponent: QueryList<ItemAttributeComponent>;

	@ViewChildren(ItemAttributeValueComponent)
	itemAttributeValueComponent: QueryList<ItemAttributeValueComponent>

	hideTab$: Observable<boolean> = of(true);

	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private lookListService: LookListService,
		private itemService: ItemService,
		private changeDetector: ChangeDetectorRef) {
		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.formTitle = "ثبت و راجستر اجناس در سیستم";
		this.result = new Subject<any>();
		this.initializaForm();

	}

	ngOnInit() {
		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});
		this.lookListService.getUnitList().subscribe(val => {
			this.unitsList = val;
		});
		this.id.subscribe(next => {
			this.itemId = next;
			if (next != 0) {
				this.formTitle = 'ویرایش  جنس';
				this.itemService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							// console.log(val.data.consumable);
							this.hideTab$ = of(false);
							this.curCategoryId = val.data.categoryId;
							this.itemName = val.data.name;

							this.itemForm.patchValue({
								id: val.data.id,
								categoryId: val.data.categoryId,
								name: val.data.name,
								unitId: val.data.unitId,
								consumable: val.data.consumable
							});
							this.changeDetector.markForCheck();
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




	initializaForm() {
		this.itemForm = this.fb.group({
			id: [''],
			categoryId: ['', Validators.required],
			consumable: ['', Validators.required],
			name: ['', Validators.required],
			unitId: ['', Validators.required],

		});

	}
	cancelClick() {
		this.result.next(-1);
	}

	submit() {

		const controls = this.itemForm.controls;
		/** check form */
		if (this.itemForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.itemService.save(this.itemForm.value).subscribe({
			next: val => {
				if (val.successful) {

					this.notify.success("معلومات موفقانه ثبت گردید!");

					this.itemForm.setValue({
						id: val.data.id,
						categoryId: val.data.categoryId,
						consumable: val.data.consumable,
						name: val.data.name,
						unitId: val.data.unitId
					});

					this.hideTab$ = of(false);
					this.curCategoryId = val.data.categoryId;
					this.itemId = val.data.id;
					this.itemName = val.data.name;

					this.changeDetector.markForCheck();
					if (this.editable) {
						this.result.next(1);
					}
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

	// utility
	isControlHasError(controlName, type) {
		const control = this.itemForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	newRecord() {
		this.id = new BehaviorSubject(0);
		this.itemId = 0;
		this.itemName = "";
		this.editable = false;
		this.itemForm.reset();
		this.hideTab$ = of(true);
		this.itemAttributeComponent.forEach(c => c.loadItemAttributes(0));
		this.itemAttributeValueComponent.forEach(c => c.loadItemAttributeValues(0));
		this.changeDetector.markForCheck();
	}
}
