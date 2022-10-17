import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'kt-print-item-receipt',
	templateUrl: './print-item-receipt.component.html',
	styleUrls: ['./print-item-receipt.component.scss']
})
export class PrintItemReceiptComponent implements OnInit {
	itemReceiptsList: Array<any>;
	id: Subject<number>;
	date;
	code;
	billNumber;
	stockKeeperFullName;
	description;
	total;

	constructor(
		public activeModal: NgbActiveModal,
		private itemReceiptService: ItemReceiptService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService,
	) {
		this.id = new BehaviorSubject(0);
		this.total = 0;
	}

	ngOnInit() {
		this.itemReceiptsList = [];
		this.findData();

	}


	findData() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.itemReceiptService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.code = val.data.code;
							this.date = val.data.receiveDate;
							this.billNumber = val.data.billNumber;
							this.stockKeeperFullName = val.data.stockKeeperName + " " + val.data.stockKeeperLastname + " فرزند " + val.data.stockKeeperFatherName;
							this.itemReceiptsList = val.data.itemDetailList;
							for (let item of this.itemReceiptsList) {
								this.total += (item.price * item.quantity);
							}

							this.description = val.data.description;
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
