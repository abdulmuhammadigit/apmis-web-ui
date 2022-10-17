import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadFileModalComponent } from '../upload-file-modal/upload-file-modal.component';

@Component({
	selector: 'kt-upload-file',
	templateUrl: './upload-file.component.html',
	styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
	closeResult: string;
	constructor(public modalService: NgbModal) { }

	ngOnInit() {
	}

	showUploadFileModal() {
		const modalRef = this.modalService.open(UploadFileModalComponent, { size: 'xl' });
	}

}
