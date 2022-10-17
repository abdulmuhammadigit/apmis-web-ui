import { ConfigurationComponent } from './configuration.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../../core/core.module';
import { SearchFiscalYearComponent } from './fiscal-year/search-fiscal-year/search-fiscal-year.component';
import { CreateFiscalYearComponent } from './fiscal-year/create-fiscal-year/create-fiscal-year.component';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';
import { ListUsersComponent } from './user-management/list-users/list-users.component';
import { PermissionManagementComponent } from './user-management/permission-management/permission-management.component';
import { CreatePagePermissionComponent } from './user-management/create-page-permission/create-page-permission.component';
import { CreateRoleComponent } from './user-management/create-role/create-role.component';
import { ListRolesComponent } from './user-management/list-roles/list-roles.component';
import { UserRolesListComponent } from './user-management/user-roles-list/user-roles-list.component';
import { CreateUserComponent } from './user-management/create-user/create-user.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployeeComponent } from './hr/employee/search-employee/search-employee.component';
import { CreateEmployeeComponent } from './hr/employee/create-employee/create-employee.component';
import { SearchEmployeeListComponent } from './hr/employee/search-employee-list/search-employee-list.component';
import { CreateOrganizationComponent } from './hr/organization/create-organization/create-organization.component';
import { SearchOrganizationComponent } from './hr/organization/search-organization/search-organization.component';
import { CreateStockKeeperComponent } from './hr/stock-keeper/create-stock-keeper/create-stock-keeper.component';
import { SearchStockKeeperComponent } from './hr/stock-keeper/search-stock-keeper/search-stock-keeper.component';
import { SearchEmployeeItemActiveComponent } from './hr/employee/search-employee-item-active/search-employee-item-active.component';


@NgModule({
	declarations: [
		ConfigurationComponent,
		SearchFiscalYearComponent,
		CreateFiscalYearComponent,
		ListUsersComponent,
		PermissionManagementComponent,
		CreatePagePermissionComponent,
		CreateUserComponent,
		UserRolesListComponent,
		ListRolesComponent,
		CreateRoleComponent,
		SearchEmployeeComponent,
		CreateEmployeeComponent,
		SearchEmployeeListComponent,
		CreateOrganizationComponent,
		SearchOrganizationComponent,
		CreateStockKeeperComponent,
		SearchStockKeeperComponent,
		SearchEmployeeItemActiveComponent,

	],
	entryComponents: [
		CreateFiscalYearComponent,
		CreatePagePermissionComponent,
		CreateUserComponent,
		CreateRoleComponent,
		SearchEmployeeComponent,
		SearchEmployeeComponent,
		CreateEmployeeComponent,
		CreateOrganizationComponent,
		CreateStockKeeperComponent,
		SearchEmployeeItemActiveComponent

	],
	imports: [
		CommonModule,
		ConfigurationRoutingModule,
		PartialsModule,
		ReactiveFormsModule,
		CoreModule,
		DpDatePickerModule,
		NgSelectModule,
		NgbModule]
})
export class ConfigurationModule {
}
