import { ComponentHostDirective } from './../../../../../core/_base/layout/directives/component-host.directive';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ClassificationService } from './../../../services/process-tracking/classification.service';
import { CreateClassificationComponent } from './../create-classification/create-classification.component';
import { ComponentBase } from './../../../../../core/_base/layout/components/component-base';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	selector: 'kt-search-classification',
	templateUrl: './search-classification.component.html',
	styleUrls: ['./search-classification.component.scss']
})
export class SearchClassificationComponent implements OnInit {

	classificationSearchForm: FormGroup;
	classificationSearchResult: Array<any>;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective

	constructor(
		private formBuilder: FormBuilder,
		private creator: ComponentBase<CreateClassificationComponent>,
		private notification: NotificationService,
		private changeDetector: ChangeDetectorRef,
		private classificationService: ClassificationService
	) {
		this.classificationSearchForm = this.formBuilder.group({
			name: ['']
		})
		this.classificationSearchResult = [];
	}

	ngOnInit() {
	}

	search() {
		this.classificationService.search(this.classificationSearchForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.classificationSearchResult = val.data;
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
		const comp = this.creator.Construct(CreateClassificationComponent, this.host);
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
		const comp = this.creator.Construct(CreateClassificationComponent, this.host);
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
