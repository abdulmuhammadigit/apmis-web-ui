import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';

@Component({
	selector: 'kt-print-item-receipt',
	templateUrl: './print-stock-recorded-cart.component.html',
	styleUrls: ['./print-stock-recorded-cart.component.scss']
})
export class PrintStockRecordedCartComponent implements OnInit {
	itemReceipt: any;
	id: any;

	constructor(
		public activeModal: NgbActiveModal,
		public dateService: DatePickerService,
	) {
		this.id;
		this.itemReceipt;
	}
	ngOnInit() { }
	counter(i: number) {
		return new Array(i);
	}
	getShamsiDate(dated) {
		let gDate: String = dated + "";
		if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
			return this.dateService.toShamsiDate(dated);
		}
	}
}
