import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ItemReportComponent } from './asset/item-report/item-report.component';
import { ReportComponent } from './report.component';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { PartialsModule } from '../../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EmployeesAllocatedItemsComponent } from './asset/employees-allocated-items/employees-allocated-items.component';
import * as echarts from 'echarts';
import { ItemReceiptReportComponent } from './asset/item-receipt-report/item-receipt-report.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ItemDistributedReportComponent } from './asset/item-distributed-report/item-distributed-report.component';
import { NecessityChartReportComponent } from './asset/necessity-chart-report/necessity-chart-report.component';
import { ItemStatusReportComponent } from './asset/item-status-report/item-status-report.component';
import { EmployeeAllocatedItemDetailsComponent } from './asset/employee-allocated-item-details/employee-allocated-item-details.component';
import { NecessitychartQuarterReportComponent } from './asset/necessitychart-quarter-report/necessitychart-quarter-report.component';
import { EmployeeAllocatedItemsModalComponent } from './asset/employee-allocated-items-modal/employee-allocated-items-modal.component';



@NgModule({
	declarations: [
		ItemReportComponent,
		ReportComponent,
		EmployeesAllocatedItemsComponent,
		ItemReceiptReportComponent,
		ItemDistributedReportComponent,
		NecessityChartReportComponent,
		ItemStatusReportComponent,
		EmployeeAllocatedItemDetailsComponent,
		NecessitychartQuarterReportComponent,
		EmployeeAllocatedItemsModalComponent
	],
	entryComponents: [



	],
	imports: [
		CommonModule,
		ReportRoutingModule,
		PartialsModule,
		PortletModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxDatatableModule,
		DpDatePickerModule,
	]
})
export class ReportModule { }
