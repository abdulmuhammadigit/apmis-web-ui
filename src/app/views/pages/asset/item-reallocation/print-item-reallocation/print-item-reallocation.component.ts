import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ItemReallocationService } from '../../../services/asset/item-reallocation/item-reallocation.service';
@Component({
	selector: 'kt-print-item-reallocation',
	templateUrl: './print-item-reallocation.component.html',
	styleUrls: ['./print-item-reallocation.component.scss']
})
export class PrintItemReallocationComponent implements OnInit {

	itemReallocatedList: Array<any>;
	id: Subject<number>;
	stockKeeperName;
	code;
	date;
	description;
	employeeText;
	itemDistributionDetailText;
	quantity;
	statusText;



	constructor(
		public activeModal: NgbActiveModal,
		private ItemReallocationService: ItemReallocationService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService,
	) {
		this.id = new BehaviorSubject(0);
	}

	ngOnInit() {
		this.itemReallocatedList = [];
		this.findData();

	}


	findData() {
		this.id.subscribe(next => {
			if (next != 0) {
				this.ItemReallocationService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.code = val.data.code;
							this.date = val.data.date;
							this.description = val.data.description;
							this.employeeText = val.data.employeeText;
							this.itemReallocatedList = val.data.itemReallocationDetailModels;

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
