import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, of, Subject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AttributeService } from '../../../services/asset/item/attribute.service';
import { LookListService } from '../../../services/asset/look/look-list.service';

@Component({
	selector: 'kt-create-attribute',
	templateUrl: './create-attribute.component.html',
	styleUrls: ['./create-attribute.component.scss']
})
export class CreateAttributeComponent implements OnInit {
	id: Subject<number>;
	editable: boolean;
	attributeCreateForm: FormGroup;
	result: Subject<any>;
	formTitle: string;
	categoryList: Array<any>;
	attributeDataTypeList: Array<any>;


	constructor(
		private formBuilder: FormBuilder,
		private attributeService: AttributeService,
		private lookListService: LookListService,
		private changeDetector: ChangeDetectorRef,
		private notify: NotificationService
	) {

		this.id = new BehaviorSubject(0);
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "ثبت و راجستر مشخصه های اجناس";
		this.attributeCreateForm = this.formBuilder.group({
			id: [0],
			categoryId: ['', Validators.required],
			name: ['', Validators.required],
			dataTypeId: ['', Validators.required]
		})
	}

	ngOnInit() {

		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
			this.changeDetector.markForCheck();
		});

		this.lookListService.getAttributeDataTypeList().subscribe(val => {
			this.attributeDataTypeList = val;
			this.changeDetector.markForCheck();
		});

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'ویرایش مشخصه های اجناس';
				this.attributeService.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.attributeCreateForm.setValue({
								id: val.data.id,
								categoryId: val.data.categoryId,
								name: val.data.name,
								dataTypeId: val.data.dataTypeId
							});
							this.changeDetector.markForCheck();
							this.editable = true;
						}
					}
					,
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

	saveForm() {

		const controls = this.attributeCreateForm.controls;
		/** check form */
		if (this.attributeCreateForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}


		this.attributeService.save(this.attributeCreateForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");

					this.attributeCreateForm.setValue({
						id: 0,
						categoryId: '',
						name: '',
						dataTypeId: ''
					});
					this.changeDetector.markForCheck();
					if (this.editable) {
						this.result.next(1);
					}
				}
			},
			error: err => {
				this.notify.error(err);
			}
		});
	}

	// utility
	isControlHasError(controlName, type) {
		const control = this.attributeCreateForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
}
