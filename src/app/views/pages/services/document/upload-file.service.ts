import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UploadFileService {

	private recordId: BehaviorSubject<number>;
	private sectionId: BehaviorSubject<number>;

	constructor(private http: HttpClient) {
		this.recordId = new BehaviorSubject(0);
		this.sectionId = new BehaviorSubject(0);
	}

	// set data
	setRecordId(recordId: number) {
		this.recordId.next(recordId);
	}
	setSectionId(sectionId: number) {
		this.sectionId.next(sectionId);
	}

	// get data
	getRecordId() {
		return this.recordId.getValue();
	}
	getSectionId() {
		return this.sectionId.getValue();
	}


	// utility
	clear() {
		this.recordId = new BehaviorSubject(0);
		this.sectionId = new BehaviorSubject(0);

	}
}

