import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ProcessTrackingService {
	private recordId: BehaviorSubject<number>;
	private classificationId: BehaviorSubject<number>;
	private entity: BehaviorSubject<string>
	private currentStageId: BehaviorSubject<number>;
	constructor() {
		this.recordId = new BehaviorSubject(0);
		this.classificationId = new BehaviorSubject(0);
		this.entity = new BehaviorSubject("");
		this.currentStageId = new BehaviorSubject(0);
	}

	// set data
	setRecordId(recordId: number) {
		this.recordId.next(recordId);
	}

	setClassificationId(classificationId: number) {
		this.classificationId.next(classificationId);
	}

	setEntity(entity: string) {
		this.entity.next(entity);
	}

	setCurrentStageId(currentStageId: number) {
		this.currentStageId.next(currentStageId);
	}

	// get data
	getRecordId() {
		return this.recordId.getValue();
	}

	getClassificationId() {
		return this.classificationId.getValue();
	}

	getEntity() {
		return this.entity.getValue();
	}

	getCurrentStageId() {
		return this.currentStageId.getValue();
	}

	// utility

	clear() {
		this.recordId = new BehaviorSubject(0);
		this.classificationId = new BehaviorSubject(0);
		this.entity = new BehaviorSubject("");
		this.currentStageId = new BehaviorSubject(0);
	}
}
