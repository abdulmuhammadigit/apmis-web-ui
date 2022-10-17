import { PermissionManagementComponent } from './user-management/permission-management/permission-management.component';
import { ListUsersComponent } from './user-management/list-users/list-users.component';
import { ConfigurationComponent } from './configuration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchFiscalYearComponent } from './fiscal-year/search-fiscal-year/search-fiscal-year.component';
import { SearchEmployeeListComponent } from './hr/employee/search-employee-list/search-employee-list.component';
import { SearchOrganizationComponent } from './hr/organization/search-organization/search-organization.component';
import { SearchStockKeeperComponent } from './hr/stock-keeper/search-stock-keeper/search-stock-keeper.component';
import { ListRolesComponent } from './user-management/list-roles/list-roles.component';

const routes: Routes = [
	{
		path: '', component: ConfigurationComponent,
		children: [

			{
				path: 'search-fiscal-year', component: SearchFiscalYearComponent,
			},
			{ path: 'user-management', component: ListUsersComponent },
			{ path: 'role-permissions', component: PermissionManagementComponent },
			{ path: 'role-management', component: ListRolesComponent },
			{ path: 'search-employee-list', component: SearchEmployeeListComponent },
			{ path: 'search-orgunit', component: SearchOrganizationComponent },
			{ path: 'search-stock-keeper', component: SearchStockKeeperComponent },
		]
	},

];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
