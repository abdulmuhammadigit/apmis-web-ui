import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';

@Component({
	selector: 'kt-print-item-request',
	templateUrl: './print-item-request.component.html',
	styleUrls: ['./print-item-request.component.scss']
})
export class PrintItemRequestComponent implements OnInit {

	id: Subject<number>;
	date;
	code;
	description;
	orgUnitText;
	department;
	employeeText;
	detailModelList: Array<any>;
	constructor(
		public activeModel: NgbActiveModal,
		public modalService: NgbModal,
		private itemRequestService: ItemRequestService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) {
		this.id = new BehaviorSubject(0);
	}


	ngOnInit() {
		this.findData();
		this.detailModelList = [];
	}

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.itemRequestService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.date = val.data.date;
							this.code = val.data.code;
							this.orgUnitText = val.data.orgUnitText;
							this.department = val.data.department;
							this.description = val.data.description;
							this.employeeText = val.data.employeeText;
							this.detailModelList = val.data.detailModelList;
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});

	}

}
