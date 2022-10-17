import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ComponentBase } from "../../../../../core/_base/layout/components/component-base";
import { CreateAttributeComponent } from "../create-attribute/create-attribute.component";
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { AttributeService } from '../../../services/asset/item/attribute.service';
import { LookListService } from '../../../services/asset/look/look-list.service';

@Component({
	selector: 'kt-search-attribute',
	templateUrl: './search-attribute.component.html',
	styleUrls: ['./search-attribute.component.scss']
})
export class SearchAttributeComponent implements OnInit {
	itemSearchList: Array<any>;
	attributeSearchForm: FormGroup;
	attributeSearchList: Array<any>
	categoryList: Array<any>
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;
	temp = [];

	constructor(
		private formBuilder: FormBuilder,
		private attributeService: AttributeService,
		private lookListService: LookListService,
		private creator: ComponentBase<CreateAttributeComponent>,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService
	) {
	}

	ngOnInit() {
		this.attributeSearchList = [];

		this.attributeSearchForm = this.formBuilder.group({
			categoryId: [''],
			name: ['']
		})

		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});
	}

	messages = { 'emptyMessage': 'دیتا برای نمایش موجود نیست' };
	columns = [{ prop: 'number', name: 'شماره' }, { prop: 'name', name: 'نام مشخصه' }, { prop: 'category', name: 'کتگوری اجناس' }, { prop: 'dataType', name: 'نوع معلومات' }];


	searchAttribute() {
		if (this.attributeSearchForm.valid) {
			this.attributeService.search(this.attributeSearchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.itemSearchList = [];
							let items = d.data;
							let counter = 1;
							items.forEach(element => {
								this.itemSearchList.push({
									number: counter,
									name: element.name,
									category: element.categoryText,
									dataType: element.dataTypeText
								});
								counter++;
							});
							this.temp = this.itemSearchList;
							this.changeDetectorRef.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

	createAttribute() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateAttributeComponent, this.host);
		this.changeDetectorRef.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	editAttribute(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateAttributeComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchAttribute();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}
}
