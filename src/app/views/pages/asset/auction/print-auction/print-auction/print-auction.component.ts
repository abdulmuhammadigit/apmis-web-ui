import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuctionService } from '../../../../services/asset/auction/auction.service';
import { NotificationService } from '../../../../../../core/_base/layout/services/notification.service';

@Component({
	selector: 'kt-print-auction',
	templateUrl: './print-auction.component.html',
	styleUrls: ['./print-auction.component.scss']
})
export class PrintAuctionComponent implements OnInit {

	id: Subject<number>;
	code;
	itemDetailText;
	price;
	pricingBoard;
	finalPrice;
	date;
	quantity;
	fiscalYearText;
	statusText;
	detailAuctionList: Array<any>;

	constructor(
		public activeModel: NgbActiveModal,
		private modalService: NgbModal,
		private auctionService: AuctionService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) {
		this.id = new BehaviorSubject(0);
	}

	ngOnInit() {
		this.findData();
	}

	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.auctionService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.code = val.data.code;
							this.itemDetailText = val.data.itemDetailText;
							this.price = val.data.price;
							this.pricingBoard = val.data.pricingBoard,
								this.finalPrice = val.data.finalPrice,
								this.date = val.data.date,
								this.quantity = val.data.quantity,
								this.fiscalYearText = val.data.fiscalYearText,
								this.statusText = val.data.statusText,
								this.detailAuctionList = val.data.detailAuctionList
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
