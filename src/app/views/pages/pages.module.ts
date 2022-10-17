import { AssetConfigurationModule } from './asset-configuration/asset-configuration.module';
import { AuditModule } from './audit/audit.module';
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Partials
import { PartialsModule } from '../partials/partials.module';
// Pages
import { CoreModule } from '../../core/core.module';
import { AssetModule } from './asset/asset.module';
import { SettingModule } from './setting/setting.module';
import { ProcessTrackingModule } from './process-tracking/process-tracking.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ReportModule } from './report/report.module';
import { UploadFileComponent } from './uploads/upload-file/upload-file.component';
import { UploadFileModalComponent } from './uploads/upload-file-modal/upload-file-modal.component';

@NgModule({
	declarations: [],
	exports: [],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		CoreModule,
		PartialsModule,
		AssetModule,
		SettingModule,
		ProcessTrackingModule,
		ConfigurationModule,
		ReportModule,
		AuditModule,
		AssetConfigurationModule
	],
	providers: []
})
export class PagesModule {
}
