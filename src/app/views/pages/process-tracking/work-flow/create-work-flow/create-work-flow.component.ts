import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ClassificationService } from './../../../services/process-tracking/classification.service';
import { EntityService } from './../../../services/process-tracking/entity.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import { WorkFlowService } from '../../../services/process-tracking/work-flow.service';

@Component({
	selector: 'kt-create-work-flow',
	templateUrl: './create-work-flow.component.html',
	styleUrls: ['./create-work-flow.component.scss']
})
export class CreateWorkFlowComponent implements OnInit {
	id: Subject<number>;
	workFlowCreateForm: FormGroup;
	result: Subject<any>;
	formTitle: string;
	entityList: Array<any>;
	classificationList: Array<any>;
	workFlowList: Array<any>;
	constructor(
		private formBuilder: FormBuilder,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private workFlowService: WorkFlowService,
		private entityService: EntityService,
		private classificationService: ClassificationService
	) {
		this.id = new BehaviorSubject(0);
		this.formTitle = "ایجاد مرحله کار";
		this.result = new Subject<any>();
		this.workFlowCreateForm = this.formBuilder.group({
			id: [0],
			name: ['', Validators.required],
			entityId: ['', Validators.required],
			classificationId: [''],
			parentId: ['']
		})
	}

	ngOnInit() {
		this.getEntityList();
		this.getWorkFlowList();
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

	getClassificationList(value: string) {
		const data = ({ entityId: value });
		this.classificationService.getList(data).subscribe({
			next: val => {
				if (val.successful) {
					this.classificationList = val.data
				}
				this.changeDetector.markForCheck();
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	getWorkFlowList() {
		this.workFlowService.getList({}).subscribe({
			next: val => {
				if (val.successful) {
					this.workFlowList = val.data
				}
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	//utility section
	isControlHasError(controlName, type) {
		const control = this.workFlowCreateForm.controls[controlName];
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

		const controls = this.workFlowCreateForm.controls;
		/** check form */
		if (this.workFlowCreateForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.workFlowService.save(this.workFlowCreateForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notification.success("Sucess");
					this.workFlowCreateForm.reset();
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
				this.formTitle = 'Edit Work Flow';
				this.workFlowService.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.getClassificationList(val.data.entityId);
							this.workFlowCreateForm.patchValue(val.data);
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
