import { ApproveItemDistributionComponent } from './item-distribute/approve-item-distribution/approve-item-distribution.component';
import { SearchItemReallocationComponent } from './item-reallocation/search-item-reallocation/search-item-reallocation.component';
import { SearchAttributeComponent } from './item/search-attribute/search-attribute.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AssetComponent } from './asset.component';
import { SearchItemReceiptComponent } from './item-receipt/search-item-receipt/search-item-receipt.component';
import { SearchFsFiveComponent } from './item-distribute/search-fs-five/search-fs-five.component';
import { SearchItemRequestComponent } from './item-request/search-item-request/search-item-request.component';
import { SearchNecessityChartComponent } from './necessity-chart/search-necessity-chart/search-necessity-chart.component';
import { SearchItemComponent } from './item/search-item/search-item.component';
import { SearchAuctionComponent } from './auction/search-auction/search-auction.component';
import { SearchSaveTicketComponent } from './save-ticket/search-save-ticket/search-save-ticket.component';
import { PropertyRegistrationComponent } from './property-registration/property-registration.component';
import { SearchNecessityChartFormsComponent } from './necessity-chart/search-necessity-chart-forms/search-necessity-chart-forms.component';
import { SearchItemSuggestedComponent } from './item-suggested/search-item-suggested/search-item-suggested.component';
import { ModuleGuard } from '../../../core/auth';
import {SearchItemTransferComponent} from "./stock/item-transfer/search-item-transfer/search-item-transfer.component";


const routes: Routes = [
	{
		path: '', component: AssetComponent,
		children: [
			{ path: 'search-item-receipt', canActivate: [ModuleGuard], component: SearchItemReceiptComponent },
			{ path: 'search-item', canActivate: [ModuleGuard], component: SearchItemComponent },
			{ path: 'search-attribute', canActivate: [ModuleGuard], component: SearchAttributeComponent },
			{ path: 'search-chart', canActivate: [ModuleGuard], component: SearchNecessityChartComponent },
			{ path: 'search-request-form', canActivate: [ModuleGuard], component: SearchItemRequestComponent },
			{ path: 'search-fs-five', canActivate: [ModuleGuard], component: SearchFsFiveComponent },
			{ path: 'search-item-reallocation', canActivate: [ModuleGuard], component: SearchItemReallocationComponent },
			{ path: 'search-auction', canActivate: [ModuleGuard], component: SearchAuctionComponent },
			{ path: 'search-save-ticket', canActivate: [ModuleGuard], component: SearchSaveTicketComponent },
			{ path: 'property-registration', canActivate: [ModuleGuard], component: PropertyRegistrationComponent },
			{ path: 'search-necessity-chart-forms', canActivate: [ModuleGuard], component: SearchNecessityChartFormsComponent },
			{ path: 'approve-item-distribution', canActivate: [ModuleGuard], component: ApproveItemDistributionComponent },
			{ path: 'search-item-suggested', canActivate: [ModuleGuard], component: SearchItemSuggestedComponent },
			{ path: 'search-item-transfer', canActivate: [ModuleGuard], component: SearchItemTransferComponent },
		]
	},

]

@NgModule({
	imports: [RouterModule.forChild(routes)],
	providers: [ModuleGuard],
	exports: [RouterModule]
})
export class AssetRoutingModule { }
