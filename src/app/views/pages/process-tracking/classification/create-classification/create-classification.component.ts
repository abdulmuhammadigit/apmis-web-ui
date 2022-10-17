import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { EntityService } from '../../../services/process-tracking/entity.service';
import { ClassificationService } from '../../../services/process-tracking/classification.service';

@Component({
	selector: 'kt-create-classification',
	templateUrl: './create-classification.component.html',
	styleUrls: ['./create-classification.component.scss']
})
export class CreateClassificationComponent implements OnInit {
	id: Subject<number>;
	createClassificationForm: FormGroup;
	result: Subject<any>;
	formTitle: string;
	entityList: Array<any>;
	classificationList: Array<any>;
	workFlowList: Array<any>;
	constructor(
		private formBuilder: FormBuilder,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private entityService: EntityService,
		private classificationService: ClassificationService
	) {
		this.id = new BehaviorSubject(0);
		this.formTitle = "Create Classification";
		this.result = new Subject<any>();
		this.createClassificationForm = this.formBuilder.group({
			id: [0],
			name: ['', Validators.required],
			entityId: ['', Validators.required]
		})
	}

	ngOnInit() {
		this.getEntityList();
		this.find();
	}

	// look section
	getEntityList() {
		this.entityService.getList({}).subscribe({
			next: val => {
				if (val.successful) {
					this.entityList = val.data
				}
				this.changeDetector.markForCheck();
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	//utility section
	isControlHasError(controlName, type) {
		const control = this.createClassificationForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	back() {
		this.result.next(-1);
	}

	// operation section
	save() {

		const controls = this.createClassificationForm.controls;
		/** check form */
		if (this.createClassificationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.classificationService.save(this.createClassificationForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notification.success("Sucess");
					this.createClassificationForm.reset();
					this.result.next(1);
				}
			},
			error: err => {
				this.notification.error(err);
			}
		})

	}

	find() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = 'Edit Classification';
				this.classificationService.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.createClassificationForm.patchValue(val.data);
							this.changeDetector.markForCheck();
						}
					}
					,
					error: err => {
						this.notification.error(err);
					}
				})
			}
		});

	}
}
