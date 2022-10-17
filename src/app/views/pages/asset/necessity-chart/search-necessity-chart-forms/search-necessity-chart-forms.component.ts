import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComponentBase } from "../../../../../core/_base/layout/components/component-base";
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { NecessityChartService } from '../../../services/asset/necessity-chart/necessity-chart.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { OrgUnitService } from '../../../services/asset/hr/org-unit.service';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AllocatedItemsComponent } from '../allocated-items/allocated-items.component';

@Component({
	selector: 'kt-search-necessity-chart-forms',
	templateUrl: './search-necessity-chart-forms.component.html',
	styleUrls: ['./search-necessity-chart-forms.component.scss']
})
export class SearchNecessityChartFormsComponent implements OnInit {

	closeResult: string;
	modalOptions: NgbModalOptions;

	id: Subject<number>;
	editable: boolean;
	searchNecessityChartForm: FormGroup;
	orgunit = [];
	fiscalyear = [];
	chartSearchList: Array<any>;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private fb: FormBuilder,
		private necessityChartService: NecessityChartService,
		private lookListService: LookListService,
		private orgUnitService: OrgUnitService,
		private creator: ComponentBase<AllocatedItemsComponent>,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) { }

	ngOnInit() {
		this.chartSearchList = [];

		this.searchNecessityChartForm = this.fb.group({
			code: '',
			orgUnitId: '',
			fiscalYearId: ''
		})

		this.orgUnitService.getList({}).subscribe((res) => {
			this.orgunit = res.data;
		})

		this.lookListService.getFiscalYearList().subscribe((res) => {
			this.fiscalyear = res;
		})
	}
	createChart() {
		this.onOperation = true;
		const comp = this.creator.Construct(AllocatedItemsComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}
	editChart(index) {
		this.onOperation = true;
		const comp = this.creator.Construct(AllocatedItemsComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(index);
	}

	searchNecessityChart() {
		var data = this.searchNecessityChartForm.value;
		data.allocatedSearch = true;
		this.necessityChartService.search(data)
			.subscribe({
				next: val => {
					if (val.successful) {
						if (val.data.length < 1) {
							this.notify.error("معلومات دریافت نگردید!");
						}
						this.chartSearchList = val.data;
						this.cdf.markForCheck();
					}
				},
				error: err => {
					this.notify.error(err);
				}
			});
	}

	submittedItems(index) {
		this.necessityChartService.findCommissionDecision({ id: index })
			.subscribe({
				next: val => {
					if (val.successful) {
						if (val.data.length < 1) {
							this.notify.error("معلومات دریافت نگردید!");
						}
						this.chartSearchList = val.data;
						this.cdf.markForCheck();
					}
				},
				error: err => {
					this.notify.error(err);
				}
			});

	}

}
