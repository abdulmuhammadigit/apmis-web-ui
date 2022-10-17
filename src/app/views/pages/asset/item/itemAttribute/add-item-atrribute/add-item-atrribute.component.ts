import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { AttributeService } from '../../../../services/asset/item/attribute.service';
import { ItemAttributeService } from '../../../../services/asset//item/item-attribute.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
	selector: 'kt-add-item-atrribute',
	templateUrl: './add-item-atrribute.component.html',
	styleUrls: ['./add-item-atrribute.component.scss']
})
export class AddItemAtrributeComponent implements OnInit {
	attributeCreateForm: FormGroup;
	public attributeList: Array<any>;
	curItemId: number;
	itemId: Subject<number> = new Subject<number>();
	@Input() public curCategoryId;
	result: Subject<any>;
	constructor(
		private attributeService: AttributeService,
		private ItemAttribute: ItemAttributeService,
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private notify: NotificationService,
		private changeDetector: ChangeDetectorRef
	) {
		this.itemId.subscribe(next => {
			this.curItemId = next;

		});
	}

	ngOnInit() {
		this.attributeCreateForm = this.formBuilder.group({
			itemId: this.curItemId,
			attributeList: ['', Validators.required]
		})


		const categoryId = ({ categoryId: this.curCategoryId })
		this.attributeService.getList(categoryId).subscribe(val => {
			this.attributeList = val.data;
		});

	}
	saveItemAtrribute() {

		const controls = this.attributeCreateForm.controls;
		/** check form */
		if (this.attributeCreateForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.ItemAttribute.save(this.attributeCreateForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.changeDetector.markForCheck();
					this.activeModal.close();

				}

			},
			error: er => {
				this.notify.error(er);
				this.changeDetector.markForCheck();
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
