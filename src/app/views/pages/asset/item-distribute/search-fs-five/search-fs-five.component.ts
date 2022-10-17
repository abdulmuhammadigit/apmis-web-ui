import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { CreateFsFiveComponent } from '../create-fs-five/create-fs-five.component';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ItemDistributionService } from '../../../services/asset/item-distribution/item-distribution.service';
import { ControlItemDistributionComponent } from '../control-item-distribution/control-item-distribution.component';
import { ApproveItemDistributionComponent } from '../approve-item-distribution/approve-item-distribution.component';
import { AuthService } from '../../../../../core/auth';


@Component({
	selector: 'kt-search-fs-five',
	templateUrl: './search-fs-five.component.html',
	styleUrls: ['./search-fs-five.component.scss']
})
export class SearchFsFiveComponent implements OnInit {
	itemDistributionId: any;
	itemDistributedSearchForm: FormGroup;
	itemDistributedSearchList: Array<any>;
	sItem: boolean;
	cItem: boolean;
	aItem: boolean;
	onOperation = false;

	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private itemDistributionService: ItemDistributionService,
		private itemDistributionServie: ItemDistributionService,
		private notify: NotificationService,
		private changeDetectorRef: ChangeDetectorRef,
		private creator: ComponentBase<CreateFsFiveComponent>,
		private fb: FormBuilder,
		private authService: AuthService
	) { }

	ngOnInit() {
		this.itemDistributedSearchList = [];
		this.itemDistributedSearchForm = this.fb.group({
			code: [''],
			documentNumber: ['']
		});
		this.sItem = this.authService.checkEntityPermission('ItemDistribution', 'SAVE');
		this.cItem = this.authService.checkEntityPermission('ItemDistribution', 'CONTROL');
		this.aItem = this.authService.checkEntityPermission('ItemDistribution', 'APPROVE');
	}

	searchItemDistribution() {
		this.itemDistributionService.search(this.itemDistributedSearchForm.value)
			.subscribe({
				next: d => {
					if (d.successful) {
						this.itemDistributedSearchList = d.data;
						if (d.data.length < 1) {
							this.notify.error('معلومات دریافت نگردید!');
						}
						this.changeDetectorRef.markForCheck();
					}
				},
				error: err => {
					this.notify.error(err);
				}
			});
	}


	createItemDistributionForm() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateFsFiveComponent, this.host);
		this.changeDetectorRef.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
	}

	editItemDistributionForm(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateFsFiveComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);
	}

	controlItemDistribution(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(ControlItemDistributionComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);
	}

	approveItemDistribution(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(ApproveItemDistributionComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);

	}

}
