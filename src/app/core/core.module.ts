// Anglar
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Layout Directives
// Services
import {
	ComponentHostDirective,
	ContentAnimateDirective,
	FirstLetterPipe,
	GetObjectPipe,
	HeaderDirective,
	JoinPipe,
	MenuDirective,
	OffcanvasDirective,
	SafePipe,
	ScrollTopDirective,
	SparklineChartDirective,
	StickyDirective,
	TabClickEventDirective,
	TimeElapsedPipe,
	ToggleDirective
} from './_base/layout';
import { AutofocusDirective } from './_base/layout/directives/autofocus.directive';
import { IsdGridviewComponent } from './_base/layout/components/isd-gridview/isd-gridview.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { IsdModalComponent } from './_base/layout/components/isd-modal/isd-modal.component';
@NgModule({
	imports: [CommonModule, NgxDatatableModule, NgbTooltipModule],
	declarations: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
		ComponentHostDirective,
		AutofocusDirective,
		IsdGridviewComponent,
		IsdModalComponent
	],
	exports: [
		// directives
		ScrollTopDirective,
		HeaderDirective,
		OffcanvasDirective,
		ToggleDirective,
		MenuDirective,
		TabClickEventDirective,
		SparklineChartDirective,
		ContentAnimateDirective,
		StickyDirective,
		ComponentHostDirective,
		// pipes
		TimeElapsedPipe,
		JoinPipe,
		GetObjectPipe,
		SafePipe,
		FirstLetterPipe,
		AutofocusDirective,
		IsdGridviewComponent,
		IsdModalComponent
	],
	providers: []
})
export class CoreModule {
}
