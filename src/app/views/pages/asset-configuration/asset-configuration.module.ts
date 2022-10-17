import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetConfigurationRoutingModule } from './asset-configuration-routing.module';
import { AssetConfigurationComponent } from './asset-configuration.component';
import { CreateDonorComponent } from './donor/create-donor/create-donor.component';
import { CreateCategoryComponent } from './category/create-category/create-category.component';
import { SearchDonorComponent } from './donor/search-donor/search-donor.component';
import { SearchCategoryComponent } from './category/search-category/search-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartialsModule } from '../../partials/partials.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PortletModule } from '../../partials/content/general/portlet/portlet.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { NgxPrintModule } from 'ngx-print';
import { CreateUnitComponent } from './unit/create-unit/create-unit.component';
import { SearchUnitComponent } from './unit/search-unit/search-unit.component';
import { CreateUnitExchangeComponent } from './unit-exchange/create-unit-exchange/create-unit-exchange.component';
import { SearchUnitExchangeComponent } from './unit-exchange/search-unit-exchange/search-unit-exchange.component';
import { CoreModule } from '../../../core/core.module';


@NgModule({
	declarations: [
		AssetConfigurationComponent,
		CreateDonorComponent,
		SearchDonorComponent,
		CreateCategoryComponent,
		SearchCategoryComponent,
		CreateUnitComponent,
		SearchUnitComponent,
		CreateUnitExchangeComponent,
		SearchUnitExchangeComponent],
	entryComponents: [
		CreateDonorComponent,
		CreateCategoryComponent,
		CreateUnitComponent,
		CreateUnitExchangeComponent
	],
	imports: [
		CommonModule,
		AssetConfigurationRoutingModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		NgbNavModule,
		PortletModule,
		ReactiveFormsModule,
		NgSelectModule,
		DpDatePickerModule,
		NgxPrintModule
	]
})
export class AssetConfigurationModule { }
