import { BusinessRuleService } from './../../../services/process-tracking/business-rule.service';
import { StageService } from './../../../services/process-tracking/stage.service';
import { ConnectionService } from './../../../services/process-tracking/connection.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
	selector: 'kt-create-connection',
	templateUrl: './create-connection.component.html',
	styleUrls: ['./create-connection.component.scss']
})
export class CreateConnectionComponent implements OnInit {
	id: Subject<number>;
	connectionCreateForm: FormGroup;
	result: Subject<any>;
	formTitle: string;
	stageList: Array<any>;
	businessRuleList: Array<any>;
	constructor(
		private formBuilder: FormBuilder,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private connectionService: ConnectionService,
		private stageService: StageService,
		private businessRuleService: BusinessRuleService
	) {
		this.id = new BehaviorSubject(0);
		this.formTitle = "ایجاد اتصال";
		this.result = new Subject<any>();
		this.connectionCreateForm = this.formBuilder.group({
			id: [0],
			stageId: ['', Validators.required],
			toStageId: ['', Validators.required],
			businessRuleId: ['', Validators.required]
		})
	}

	ngOnInit() {
		this.getStageList();
		this.getBusinessRuleList();
		this.find();
	}

	// look section
	getStageList() {
		this.stageService.getList({ activeOnly: true }).subscribe({
			next: val => {
				if (val.successful) {
					this.stageList = val.data
				}
				this.changeDetector.markForCheck();
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	getBusinessRuleList() {
		this.businessRuleService.getList({}).subscribe({
			next: val => {
				if (val.successful) {
					this.businessRuleList = val.data
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
		const control = this.connectionCreateForm.controls[controlName];
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

		const controls = this.connectionCreateForm.controls;
		/** check form */
		if (this.connectionCreateForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.connectionService.save(this.connectionCreateForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notification.success("Sucess");
					this.connectionCreateForm.reset();
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
				this.connectionService.findById(next).subscribe({
					next: val => {
						if (val.successful) {
							this.connectionCreateForm.patchValue(val.data);
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
