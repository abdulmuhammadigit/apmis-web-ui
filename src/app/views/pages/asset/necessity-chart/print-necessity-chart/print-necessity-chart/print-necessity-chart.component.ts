import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../../core/_base/layout/services/notification.service';
import { NecessityChartService } from '../../../../services/asset/necessity-chart/necessity-chart.service'

@Component({
	selector: 'kt-print-necessity-chart',
	templateUrl: './print-necessity-chart.component.html',
	styleUrls: ['./print-necessity-chart.component.scss']
})
export class PrintNecessityChartComponent implements OnInit {

	id: Subject<number>;
	detailModelList = [];
	public code;
	public data;
	public fiscalYear;
	public orgUnitText;
	constructor(
		public activeModel: NgbActiveModal,
		private modalService: NgbModal,
		private necessityChartService: NecessityChartService,
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
				this.necessityChartService.print({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.code = val.data.code;
							this.fiscalYear = val.data.fiscalYear;
							this.orgUnitText = val.data.orgUnitText;
							this.detailModelList = val.data.detailPrintModelList;
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
