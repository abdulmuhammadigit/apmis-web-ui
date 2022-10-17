import { BusinessRuleService } from './../../../services/process-tracking/business-rule.service';
import { StageService } from './../../../services/process-tracking/stage.service';
import { ConnectionService } from './../../../services/process-tracking/connection.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { CreateConnectionComponent } from './../create-connection/create-connection.component';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'kt-search-connection',
	templateUrl: './search-connection.component.html',
	styleUrls: ['./search-connection.component.scss']
})
export class SearchConnectionComponent implements OnInit {

	connectionSearchForm: FormGroup;
	connectionSearchResult: Array<any>;
	onOperation = false;
	stageList: Array<any>;
	businessRuleList: Array<any>;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective

	constructor(
		private formBuilder: FormBuilder,
		private creator: ComponentBase<CreateConnectionComponent>,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private connectionService: ConnectionService,
		private stageService: StageService,
		private businessRuleService: BusinessRuleService
	) {
		this.connectionSearchForm = this.formBuilder.group({
			stageId: [''],
			toStageId: [''],
			businessRuleId: ['']
		})
		this.connectionSearchResult = [];
	}

	ngOnInit() {
		this.getStageList();
		this.getBusinessRuleList();
	}

	// look section
	getStageList() {
		this.stageService.getList({}).subscribe({
			next: val => {
				if (val.successful) {
					this.stageList = val.data
				}
				this.changeDetector.markForCheck();
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	getBusinessRuleList() {
		this.businessRuleService.getList({}).subscribe({
			next: val => {
				if (val.successful) {
					this.businessRuleList = val.data
				}
				this.changeDetector.markForCheck();
			},
			error: err => {
				this.notification.error(err);
			}
		})
	}

	search() {
		this.connectionService.search(this.connectionSearchForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.connectionSearchResult = val.data;
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
		const comp = this.creator.Construct(CreateConnectionComponent, this.host);
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
		const comp = this.creator.Construct(CreateConnectionComponent, this.host);
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
