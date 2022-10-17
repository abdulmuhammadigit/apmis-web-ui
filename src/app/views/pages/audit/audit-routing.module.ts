import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { AuditComponent } from './audit.component';

import { SnapshotsComponent } from './snapshots/snapshots.component';


const routes: Routes = [
	{
	  path: '',
	  component: AuditComponent,
	  children: [
		{
		  path: '',
		  redirectTo: 'snapshots', pathMatch: 'full'
		},
		{
		  path: 'snapshots',
		  component: SnapshotsComponent
		},
	  ]
	}
  ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuditRoutingModule {
}
