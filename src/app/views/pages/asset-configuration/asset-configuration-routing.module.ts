import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetConfigurationComponent } from './asset-configuration.component';
import { SearchCategoryComponent } from './category/search-category/search-category.component';
import { SearchDonorComponent } from './donor/search-donor/search-donor.component';
import { SearchUnitExchangeComponent } from './unit-exchange/search-unit-exchange/search-unit-exchange.component';
import { SearchUnitComponent } from './unit/search-unit/search-unit.component';

const routes: Routes = [{
	path: '', component: AssetConfigurationComponent,
	children: [
		{ path: 'search-donor', component: SearchDonorComponent },
		{ path: 'search-category', component: SearchCategoryComponent },
		{
			path: 'search-unit', component: SearchUnitComponent,
		},
		{
			path: 'search-unit-exchange', component: SearchUnitExchangeComponent,
		}
	]
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AssetConfigurationRoutingModule { }
