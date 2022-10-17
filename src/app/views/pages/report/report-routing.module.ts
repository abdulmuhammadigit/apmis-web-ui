import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesAllocatedItemsComponent } from './asset/employees-allocated-items/employees-allocated-items.component';
import { ItemDistributedReportComponent } from './asset/item-distributed-report/item-distributed-report.component';
import { ItemReportComponent } from './asset/item-report/item-report.component';
import { NecessitychartQuarterReportComponent } from './asset/necessitychart-quarter-report/necessitychart-quarter-report.component';
import { ReportComponent } from './report.component';
import { ItemReceiptReportComponent } from './asset/item-receipt-report/item-receipt-report.component';
import { NecessityChartReportComponent } from './asset/necessity-chart-report/necessity-chart-report.component';
import { ItemStatusReportComponent } from './asset/item-status-report/item-status-report.component';


import { EmployeeAllocatedItemDetailsComponent } from './asset/employee-allocated-item-details/employee-allocated-item-details.component';
const routes: Routes = [
	{
		path: '', component: ReportComponent,
		children: [
			{
				path: 'item-report', component: ItemReportComponent,
			},
			{
				path: 'employees-allocated-items', component: EmployeesAllocatedItemsComponent,
			},
			{
				path: 'item-receipt-report', component: ItemReceiptReportComponent,
			},
			{
				path: 'item-distributed-report', component: ItemDistributedReportComponent,
			},

			{
				path: 'necessity-chart-report', component: NecessityChartReportComponent,

			},
			{

				path: 'employee-allocated-item-details', component: EmployeeAllocatedItemDetailsComponent,
			},
			{
				path: 'necessitychart-quarter-report', component: NecessitychartQuarterReportComponent,
			}
			,

			{
				path: 'item-status-report', component: ItemStatusReportComponent,
			}

		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReportRoutingModule { }
