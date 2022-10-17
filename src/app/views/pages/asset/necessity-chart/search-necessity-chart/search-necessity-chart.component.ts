import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComponentBase } from "../../../../../core/_base/layout/components/component-base";
import { CreateNecessityChartComponent } from '../create-necessity-chart/create-necessity-chart.component';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { NecessityChartService } from '../../../services/asset/necessity-chart/necessity-chart.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { OrgUnitService } from '../../../services/asset/hr/org-unit.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { CreateCommissionDecisionComponent } from '../commission-decision/create-commission-decision.component';

@Component({
	selector: 'kt-search-necessity-chart',
	templateUrl: './search-necessity-chart.component.html',
	styleUrls: ['./search-necessity-chart.component.scss']
})
export class SearchNecessityChartComponent implements OnInit {
	closeResult: string;
	modalOptions: NgbModalOptions;
	itemSearchList: Array<any>;
	id: Subject<number>;
	editable: boolean;
	searchNecessityChartForm: FormGroup;
	orgunit = [];
	temp = [];
	fiscalyear = [];
	chartSearchList: Array<any>;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private necessityChartService: NecessityChartService,
		private lookListService: LookListService,
		private orgUnitService: OrgUnitService,
		private creator: ComponentBase<CreateNecessityChartComponent>,
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

	messages = { 'emptyMessage': 'دیتا برای نمایش موجود نیست' };
	columns = [{ prop: 'number', name: 'شماره' }, { prop: 'code', name: 'کُد' }, { prop: 'orgUnit', name: 'ریاست مربوطه' }, { prop: 'fiscalYear', name: 'سال مالی' }];

	createChart() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateNecessityChartComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}
	editChart(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateNecessityChartComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchNecessityChart();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}
	commissionDecision(index) {

		let modalRef = this.modalService.open(CreateCommissionDecisionComponent, { size: 'xl' });
		modalRef.componentInstance.id.next(index);

	}

	searchNecessityChart() {
		this.necessityChartService.search(this.searchNecessityChartForm.value)
			.subscribe({
				next: val => {
					if (val.successful) {
						this.itemSearchList = [];
						let items = val.data;
						let counter = 1;
						items.forEach(element => {
							this.itemSearchList.push({
								number: counter,
								code: element.code,
								orgUnit: element.orgUnitText,
								categoryText: element.categoryText,
								unitText: element.unitText,
								fiscalYear: element.fiscalYearText
							});
							counter++;
						});
						this.temp = this.itemSearchList;
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
