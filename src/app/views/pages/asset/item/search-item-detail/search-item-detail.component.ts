import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { values } from 'lodash';
import { DataTableService } from "../../../../../core/_base/layout/services/datatable.service"

@Component({
	selector: 'kt-search-item-detail',
	templateUrl: './search-item-detail.component.html',
	styleUrls: ['./search-item-detail.component.scss']
})
export class SearchItemDetailComponent implements OnInit {

	@Output() passEntry: EventEmitter<any> = new EventEmitter();

	@Output() itemSelected = new EventEmitter<any>();

	itemSearchForm: FormGroup;
	categoryList: Array<any>
	itemList: Array<any>
	itemSearchList: Array<any>

	result: any;

	searchType: number = 1;
	searchResult: Array<any>;
	columns: Array<any>;

	grdSelectedItem: any = {};
	hasSelected: boolean = false;


	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		//private activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private lookListService: LookListService,
		private itemDetailService: ItemDetailService,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService,
		public dataService: DataTableService,
	) {


	}

	grdOnItemSelect(selected) {
		console.log(selected);
		if (selected.length > 0) {
			this.grdSelectedItem = selected[0];
			this.hasSelected = true;
		}
	}

	ngOnInit() {
		this.itemSearchList = [];
		this.itemSearchForm = this.formBuilder.group({
			searchType: this.searchType,
			categoryId: [''],
			itemId: ['']
		});

		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});
		this.columns = [{ prop: 'number', name: 'شماره' },
		{ prop: 'nameText', name: 'نام جنس' },
		{ prop: 'categoryText', name: 'کتگوری' },
		{ prop: 'unitText', name: 'واحد' },
		{ prop: 'code', name: 'کود جنس' },
		{ prop: 'consumable', name: 'نوعیت جنس' },
		{ prop: 'balance', name: 'بیلانس' },
		];
	}

	loadItem(val) {
		this.itemService.getList({ categoryId: val }).subscribe(val => {
			this.itemList = val.data;
		});
	}

	searchItem() {
		if (this.itemSearchForm.valid) {
			this.itemDetailService.search(this.itemSearchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							let list = [];
							let resultSet = d.data;

							let counter = 1;
							resultSet.forEach(element => {
								list.push({
									id: element.id,
									number: counter,
									categoryText: element.categoryText,
									nameText: element.nameText,
									unitText: element.unitText,
									code: element.code,
									consumable: element.consumable,
									balance: element.balance,
									title: element.detail
								});
								counter++;
							});
							//console.log(list);
							this.searchResult = list;
							//this.dataService._data.next(list);
							this.changeDetectorRef.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

	selectItem() {
		this.itemSelected.emit(this.grdSelectedItem);
	}
}
