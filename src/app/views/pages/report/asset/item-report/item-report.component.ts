import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { ReportListService } from '../../../services/asset/report/report-list.service';

@Component({
	selector: 'kt-item-report',
	templateUrl: './item-report.component.html',
	styleUrls: ['./item-report.component.scss']
})
export class ItemReportComponent implements OnInit {

	itemSearchForm: FormGroup;
	categoryList: Array<any>
	itemList: Array<any>
	itemDetailList: Array<any>
	itemSearchList: Array<any> = [];
	result: any;
	chartOption: any;

	chartItems;
	options: any;
	updateOptions: any;

	xAxis = {
		type: 'category',
		boundaryGap: true,
		offset: 14.5,
		data: [],
		axisLabel: {
			inside: false,
			fontFamily: "Arial",
			textStyle: {
				color: ' #17202a ',
				fontSize: 20
			},
		},
		axisTick: {
			alignWithLabel: true
		},
		axisLine: {
			symbol: "arrow"
		}

	};

	yAxis = {
		type: 'value',
		boundaryGap: true,
		position: "lift",
		offset: 0,
		axisLine: {
			show: true,
			symbol: "arrow"
		},
		axisLabel: {
			textStyle: {
				color: '#17202a',
				fontSize: 20
			},
		},

	};

	series = [{
		data: [],
		type: 'bar',
		barWidth: "25%",
	}];

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		private lookListService: LookListService,
		private itemDetailService: ItemDetailService,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService,
		private reportListService: ReportListService
	) {
		this.options = {
			xAxis: this.xAxis,
			yAxis: this.yAxis,
			series: this.series
		};
	}

	ngOnInit() {
		this.itemSearchList = [];
		this.itemSearchForm = this.formBuilder.group({
			categoryId: [''],
			itemId: [{ value: '', disabled: true }],
			detailId: [{ value: '', disabled: true }]
		})

		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});

	}


	loadItem(category) {
		this.itemService.getList({ categoryId: category.id }).subscribe(val => {
			this.itemList = val.data;
			this.itemSearchForm.controls['itemId'].enable();
		});
	}


	loadItemDetail(item) {
		this.itemDetailService.getList({ itemId: item.id }).subscribe(val => {
			this.itemDetailList = val.data;
			this.itemSearchForm.controls['detailId'].enable();

		});
	}
	//operations
	searchItem() {
		if (this.itemSearchForm.valid) {
			this.reportListService.getItemQuantityList(this.itemSearchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.itemSearchList = d.data;
							let y = [];
							let x = [];
							this.itemSearchList.forEach(item => {
								y.push(item.count);
								x.push(item.text);
							})
							this.series[0].data = y;
							this.xAxis.data = x;
							this.updateOptions = {
								xAxis: this.xAxis,
								yAxis: this.yAxis,
								series: this.series
							};
							this.changeDetectorRef.detectChanges();


							if (d.data.length < 1) {
								this.notify.error("معلومات دریافت نگردید!");
							}

							this.changeDetectorRef.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

}



