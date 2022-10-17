import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, NgModule } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
	selector: 'kt-search-item',
	templateUrl: './search-item.component.html',
	styleUrls: ['./search-item.component.scss']
})
export class SearchItemComponent implements OnInit {
	itemSearchForm: FormGroup;
	categoryList: Array<any>
	itemSearchList: Array<any>
	onOperation: boolean = false;
	itemId: any;

	temp = [];
	@ViewChild(DatatableComponent) table: DatatableComponent;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;


	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		private lookListService: LookListService,
		private changeDetectorRef: ChangeDetectorRef,
		private creator: ComponentBase<CreateItemComponent>,
		private notify: NotificationService,
	) { }

	ngOnInit() {
		this.itemSearchList = [];
		this.itemSearchForm = this.formBuilder.group({
			categoryId: [''],
			name: ['']
		})
		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});

		this.searchItem();
	}

	messages = { 'emptyMessage': 'دیتا برای نمایش موجود نیست' };
	columns = [{ prop: 'number', name: 'شماره' }, { prop: 'name', name: 'نام جنس' }, { prop: 'consumable', name: 'نوعیت جنس' }, { prop: 'categoryText', name: 'کتگوری' }, { prop: 'unitText', name: 'واحد' }];

	searchItem() {
		if (this.itemSearchForm.valid) {
			this.itemService.search(this.itemSearchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.itemSearchList = [];
							let items = d.data;
							let counter = 1;
							items.forEach(element => {
								let elType = !element.consumable ? "مصرفی" : "غیر مصرفی";
								this.itemSearchList.push({
									number: counter,
									name: element.name,
									consumable: elType,
									categoryText: element.categoryText,
									unitText: element.unitText
								});
								counter++;
							});

							this.temp = this.itemSearchList;

							if (d.data.length < 1) {
								this.notify.error("معلومات دریافت نگردید!");
							}
							this.changeDetectorRef.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

	createItem() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}


	editItem(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchItem();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

	filterTable(event) {
		const val = event.target.value.toLowerCase();
		//filter our data
		const temp = this.temp.filter(function (d) {
			return d.name.toLowerCase().indexOf(val) !== -1 || !val;
		});

		//update the rows
		this.itemSearchList = temp;
		//Whenever the filter changes, always go back to the first page
		this.table.offset = 0;
	}

	itemDelete(event) {
		alert('sd');
	}
}
