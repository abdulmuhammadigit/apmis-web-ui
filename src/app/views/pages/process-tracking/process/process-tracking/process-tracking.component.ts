import { ProcessTrackingModalComponent } from './../process-tracking-modal/process-tracking-modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-process-tracking',
	templateUrl: './process-tracking.component.html',
	styleUrls: ['./process-tracking.component.scss']
})
export class ProcessTrackingComponent implements OnInit {
	closeResult: string;
	constructor(private modalService: NgbModal) { }

	ngOnInit() {
	}

	showProcessTrackingModal() {
		const modalRef = this.modalService.open(ProcessTrackingModalComponent, { size: 'xl' });
	}
}
