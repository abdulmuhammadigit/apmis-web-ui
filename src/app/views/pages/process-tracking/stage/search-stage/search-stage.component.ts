import { CreateStageComponent } from './../../stage/create-stage/create-stage.component';
import { StageService } from './../../../services/process-tracking/stage.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'kt-search-stage',
	templateUrl: './search-stage.component.html',
	styleUrls: ['./search-stage.component.scss']
})
export class SearchStageComponent implements OnInit {

	stageSearchForm: FormGroup;
	stageSearchResult: Array<any>;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective

	constructor(
		private formBuilder: FormBuilder,
		private creator: ComponentBase<CreateStageComponent>,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private stageService: StageService
	) {
		this.stageSearchForm = this.formBuilder.group({
			name: ['']
		})
		this.stageSearchResult = [];
	}

	ngOnInit() {
	}

	search() {
		this.stageService.search(this.stageSearchForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.stageSearchResult = val.data;
					if (val.data.length < 1) {
						this.notification.error("No Data Exist!");
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
		const comp = this.creator.Construct(CreateStageComponent, this.host);
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
		const comp = this.creator.Construct(CreateStageComponent, this.host);
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
