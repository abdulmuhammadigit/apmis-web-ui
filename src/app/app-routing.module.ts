import { AuditModule } from './views/pages/audit/audit.module';
// Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { BaseComponent } from './views/theme/base/base.component';
import { ErrorPageComponent } from './views/theme/content/error-page/error-page.component';
// Auth
import { AuthGuard } from './core/auth';

const routes: Routes = [
	{ path: 'auth', loadChildren: () => import('app/views/pages/auth/auth.module').then(m => m.AuthModule) },
	{
		path: '',
		component: BaseComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('app/views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
			},

			{
				path: 'asset',
				loadChildren: () => import('app/views/pages/asset/asset.module').then(m => m.AssetModule)
			},
			{
				path: 'process-tracking',
				loadChildren: () => import('app/views/pages/process-tracking/process-tracking.module').then(m => m.ProcessTrackingModule)
			},
			{
				path: 'configuration',
				loadChildren: () => import('app/views/pages/configuration/configuration.module').then(m => m.ConfigurationModule)
			},
			{
				path: 'audit',
				loadChildren: () => import('app/views/pages/audit/audit.module').then(m => m.AuditModule)
			},
			{
				path: 'report',
				loadChildren: () => import('app/views/pages/report/report.module').then(m => m.ReportModule)
			},
			{
				path: 'setting',
				loadChildren: () => import('app/views/pages/setting/setting.module').then(m => m.SettingModule),
			},
			{
				path: 'asset-configuration',
				loadChildren: () => import('app/views/pages/asset-configuration/asset-configuration.module').then(m => m.AssetConfigurationModule),
			},
			{
				path: 'error/403',
				component: ErrorPageComponent,
				data: {
					'type': 'error-v6',
					'code': 403,
					'title': '403... Access forbidden',
					'desc': 'Looks like you don\'t have permission to access for requested page.<br> Please, contact administrator'
				}
			},
			{ path: 'error/:type', component: ErrorPageComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
			{ path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
		]
	},
	{ path: '**', redirectTo: 'error/403', pathMatch: 'full' },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true })
	],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
