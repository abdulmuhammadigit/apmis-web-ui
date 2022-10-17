import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditRoutingModule } from './audit-routing.module';
import { AuditComponent } from './audit.component';
import { CoreModule } from './../../../../app/core/core.module';
import { BaseModule } from '../../base/base.module';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterModule } from '@angular/router';
import { SnapshotsComponent } from './snapshots/snapshots.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
	declarations: [
		AuditComponent,
		SnapshotsComponent
	],
	entryComponents: [
	],
	imports: [
		CommonModule,
		CoreModule,
		AuditRoutingModule,
		BaseModule,
		NgbTooltipModule,
		PartialsModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxJsonViewerModule
	]
})
export class AuditModule {
}
