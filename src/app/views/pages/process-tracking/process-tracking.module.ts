import { CoreModule } from './../../../core/core.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchWorkFlowComponent } from './work-flow/search-work-flow/search-work-flow.component';
import { CreateWorkFlowComponent } from './work-flow/create-work-flow/create-work-flow.component';
import { ProcessTrackingRoutingModule } from './process-tracking-routing.module';
import { PartialsModule } from '../../partials/partials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClassificationComponent } from './classification/create-classification/create-classification.component';
import { SearchClassificationComponent } from './classification/search-classification/search-classification.component';
import { CreateStageComponent } from './stage/create-stage/create-stage.component';
import { SearchStageComponent } from './stage/search-stage/search-stage.component';
import { CreateConnectionComponent } from './connection/create-connection/create-connection.component';
import { SearchConnectionComponent } from './connection/search-connection/search-connection.component';
import { ProcessTrackingComponent } from './process/process-tracking/process-tracking.component';
import { ProcessTrackingModalComponent } from './process/process-tracking-modal/process-tracking-modal.component';
import { ProcessTrackingMainComponent } from './process-tracking-main.component';

@NgModule({
	declarations: [
		SearchWorkFlowComponent,
		CreateWorkFlowComponent,
		CreateClassificationComponent,
		SearchClassificationComponent,
		CreateStageComponent,
		SearchStageComponent,
		CreateConnectionComponent,
		SearchConnectionComponent,
		ProcessTrackingComponent,
		ProcessTrackingModalComponent,
		ProcessTrackingMainComponent],
	entryComponents: [
		CreateWorkFlowComponent,
		CreateClassificationComponent,
		CreateStageComponent,
		CreateConnectionComponent,
		ProcessTrackingModalComponent
	],
	imports: [
		CommonModule,
		ProcessTrackingRoutingModule,
		FormsModule,
		PartialsModule,
		ReactiveFormsModule,
		CoreModule
	],
	exports: [
		ProcessTrackingComponent
	]
})
export class ProcessTrackingModule { }
