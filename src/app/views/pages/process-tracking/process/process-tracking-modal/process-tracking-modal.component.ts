import { HistoryService } from './../../../services/process-tracking/history.service';
import { ConnectionService } from './../../../services/process-tracking/connection.service';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'kt-process-tracking-modal',
	templateUrl: './process-tracking-modal.component.html',
	styleUrls: ['./process-tracking-modal.component.scss']
})
export class ProcessTrackingModalComponent implements OnInit {
	public connectionForm: FormGroup;
	public connectionList: Array<any>;
	public historyList: Array<any>;
	constructor(
		public activeModal: NgbActiveModal,
		private formBuilder: FormBuilder,
		private changeDetector: ChangeDetectorRef,
		private notification: NotificationService,
		private processService: ProcessTrackingService,
		private connectionService: ConnectionService,
		private historyService: HistoryService) {
		this.connectionForm = formBuilder.group({
			toStageId: ['', Validators.required],
			description: ['']
		})
	}

	ngOnInit() {
		this.getConnectionList();
		this.getHistoryList();
	}

	getConnectionList() {

		this.connectionService.findStageConnection({ stageId: this.processService.getCurrentStageId() }).subscribe({
			next: val => {
				if (val.successful) {
					this.connectionList = val.data;
				}
				this.changeDetector.markForCheck();
			}, error: err => {
				this.notification.error(err);
			}
		})
	}

	getHistoryList() {
		const data = ({
			recordId: this.processService.getRecordId(),
			classificationId: this.processService.getClassificationId(),
			entity: this.processService.getEntity()
		});
		this.historyService.search(data).subscribe({
			next: val => {
				if (val.successful) {
					this.historyList = val.data;
				}
				this.changeDetector.markForCheck();
			}, error: err => {
				this.notification.error(err);
			}
		})
	}

	submit() {
		const controls = this.connectionForm.controls;
		/** check form */
		if (this.connectionForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		const data = this.connectionForm.value;
		data.currentStageId = this.processService.getCurrentStageId();
		data.recordId = this.processService.getRecordId();
		data.entity = this.processService.getEntity();
		data.classificationId = this.processService.getClassificationId();

		this.historyService.save(data).subscribe({
			next: val => {
				if (val.successful) {
					this.notification.success("مؤفقانه ارسال گردید!");
					this.processService.setCurrentStageId(this.connectionForm.get('toStageId').value)
					this.historyList = val.data;
					this.changeDetector.markForCheck();

				}
			}, error: err => {
				this.notification.error(err);
			}
		});
	}

	isControlHasError(controlName, type) {
		const control = this.connectionForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


}
