import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../../../../../core/_base/layout/services/notification.service';
import {ItemTransferService} from '../../../../services/asset/stock/item-transfer.service';

@Component({
  selector: 'kt-print-item-transfer',
  templateUrl: './print-item-transfer.component.html',
  styleUrls: ['./print-item-transfer.component.scss']
})
export class PrintItemTransferComponent implements OnInit {
	id: Subject<number>;
	date;
	code;
	description;
	orgUnitText;
	department;
	employeeText;
	suggestedDetailModel: Array<any>;

	constructor(
		public activeModel: NgbActiveModal,
		public modalService: NgbModal,
		private itemTransferService: ItemTransferService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) {
		this.id = new BehaviorSubject(0);
	}

	ngOnInit(): void {
		this.getFormData();
		this.suggestedDetailModel = [];
	}
	getFormData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.itemTransferService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.date = val.data.date;
							this.code = val.data.code;
							this.orgUnitText = val.data.orgUnitText;
							this.department = val.data.department;
							this.description = val.data.description;
							this.employeeText = val.data.employeeText, this.suggestedDetailModel = val.data.suggestedDetailModel;
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
			}
		});

	}
}
