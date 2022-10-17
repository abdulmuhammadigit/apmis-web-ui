import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { CreateItemRequestComponent } from '../create-item-request/create-item-request.component';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';
import { ControlItemRequestComponent } from '../control-item-request/control-item-request.component';
import { AuthService } from '../../../../../core/auth';
import { DataTableService } from '../../../../../core/_base/layout/services/datatable.service';


@Component({
	selector: 'kt-search-item-request',
	templateUrl: './search-item-request.component.html',
	styleUrls: ['./search-item-request.component.scss']
})
export class SearchItemRequestComponent implements OnInit {
	f9requestList: Array<any>;
	RequestForm: FormGroup;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;
	sItemReciept: boolean;
	cItemReciept: boolean;
	columns: Array<any>;
	searchResult: Array<any>;
	grdSelectedItem: any = {};



	constructor(
		private fb: FormBuilder,
		private itemRequestService: ItemRequestService,
		private cdf: ChangeDetectorRef,
		private creator: ComponentBase<CreateItemRequestComponent>,
		private notify: NotificationService,
		private authService: AuthService,
		private dataService: DataTableService
	) { }


	ngOnInit() {
		this.f9requestList = [];
		this.sItemReciept = this.authService.checkEntityPermission("ItemRequest", "SAVE");
		this.cItemReciept = this.authService.checkEntityPermission("ItemRequest", "CONTROL");

		this.RequestForm = this.fb.group({
			code: [''],
		});
		this.columns = [{ prop: 'number', name: 'شماره' }, { prop: 'code', name: 'کُد درخواست' }, {
			prop: 'employee', name:
				'درخواست کننده'
		}, { prop: 'date', name: 'تاریخ درخواست' }];
	}

	itemUpdate(event) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemRequestComponent, this.host);

		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchRequestForm();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance._selectedObject.next(this.grdSelectedItem);
	}

	itemSelected(selectedlist) {
		this.grdSelectedItem = selectedlist[0];
	}

	controlRequestForm(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(ControlItemRequestComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchRequestForm();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}
	createRequestForm() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemRequestComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}
	searchRequestForm() {
		if (this.RequestForm.valid) {
			this.itemRequestService.search(this.RequestForm.value)
				.subscribe({
					next: response => {
						if (response.successful) {
							let list = [];
							let items = response.data;
							let counter = 1;
							items.forEach(element => {
								list.push({
									id: element.id,
									number: counter,
									code: element.code,
									employee: element.employeeName + " " + element.employeeLastName,
									date: element.date
								});
								counter++;
							});
							this.searchResult = list;
							//this.dataService._data.next(list);
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}
}


