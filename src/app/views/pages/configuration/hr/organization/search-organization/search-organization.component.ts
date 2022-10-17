import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ComponentBase } from "../../../../../../core/_base/layout/components/component-base";
import { ComponentHostDirective } from '../../../../../../core/_base/layout/directives/component-host.directive';
import { OrgUnitService } from './../../../../services/asset/hr/org-unit.service';
import { CreateOrganizationComponent } from '../create-organization/create-organization.component';

@Component({
	selector: 'kt-search-organization',
	templateUrl: './search-organization.component.html',
	styleUrls: ['./search-organization.component.scss']
})
export class SearchOrganizationComponent implements OnInit {

	id: Subject<number>;
	editable: boolean;
	searchOrganizationForm: FormGroup;
	organizationSearchList: Array<any>;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private fb: FormBuilder,
		private orgunitService: OrgUnitService,
		private creator: ComponentBase<CreateOrganizationComponent>,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) { }

	ngOnInit() {

		this.organizationSearchList = [];

		this.searchOrganizationForm = this.fb.group({
			name: '',
		})
	}


	searchOrganization() {
		if (this.searchOrganizationForm.valid) {
			this.orgunitService.search(this.searchOrganizationForm.value)
				.subscribe({
					next: (e: any) => {
						this.organizationSearchList = e.data;
						this.cdf.markForCheck();
					},
					error: err => {
						console.log(err);
					}
				});
		}
	}

	createOrganization() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateOrganizationComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	editOrganization(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateOrganizationComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchOrganization();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

}
