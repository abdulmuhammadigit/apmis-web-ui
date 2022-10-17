import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { CreateWorkFlowComponent } from './../create-work-flow/create-work-flow.component';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { WorkFlowService } from './../../../services/process-tracking/work-flow.service';
import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
	selector: 'kt-search-work-flow',
	templateUrl: './search-work-flow.component.html',
	styleUrls: ['./search-work-flow.component.scss']
})
export class SearchWorkFlowComponent implements OnInit {

	workFlowSearchForm: FormGroup;
	workFlowSearchResult: Array<any>;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective

	constructor(
		private formBuilder: FormBuilder,
		private creator: ComponentBase<CreateWorkFlowComponent>,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private workFlowService: WorkFlowService
	) {
		this.workFlowSearchForm = this.formBuilder.group({
			name: ['']
		})
		this.workFlowSearchResult = [];
	}

	ngOnInit() {
	}

	search() {
		this.workFlowService.search(this.workFlowSearchForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.workFlowSearchResult = val.data;
					if (val.data.length < 1) {
						this.notification.error("No Data Exists!");
					}
					this.changeDetector.markForCheck();
				}
			}, error: err => {
				this.notification.error(err);
			}
		})
	}

	create() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateWorkFlowComponent, this.host);
		this.changeDetector.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			if (nex == 1) {
				this.search();
			}
			comp.destroy()
		});
	}

	edit(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateWorkFlowComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.search();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

}
