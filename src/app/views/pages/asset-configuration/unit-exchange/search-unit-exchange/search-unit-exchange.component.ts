import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { CreateUnitExchangeComponent } from '../create-unit-exchange/create-unit-exchange.component';
import { UnitExchangeService } from '../../../services/configuration/unit-exchange/unit-exchange.service';
import { LookListService } from '../../../services/asset/look/look-list.service';


@Component({
	selector: 'kt-search-unit-exchange',
	templateUrl: './search-unit-exchange.component.html',
	styleUrls: ['./search-unit-exchange.component.scss']
})
export class SearchUnitExchangeComponent implements OnInit {

	unitExchangeSearchForm: FormGroup;
	unitExchangeSearchList: Array<any>
	onOperation: boolean = false;
	public unitList = [];


	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private formBuilder: FormBuilder,
		private unitExchangeService: UnitExchangeService,
		private lookListService: LookListService,
		private changeDetectorRef: ChangeDetectorRef,
		private creator: ComponentBase<CreateUnitExchangeComponent>,
		private notify: NotificationService,
	) { }

	ngOnInit() {
		this.getUnitList();
		this.unitExchangeSearchForm = this.formBuilder.group({
			toUnitId: [''],
		})


	}

	// utility
	isControlHasError(controlName, type) {
		const control = this.unitExchangeSearchForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


	getUnitList() {
		this.lookListService.getUnitList().subscribe((res) => {
			this.unitList = res;
			this.changeDetectorRef.detectChanges();
		})
	}
	searchUnitExchange() {
		if (this.unitExchangeSearchForm.valid) {
			this.unitExchangeService.search(this.unitExchangeSearchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.unitExchangeSearchList = d.data;
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

	createUnitExchange() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateUnitExchangeComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}


	editUnitExchange(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateUnitExchangeComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchUnitExchange();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}
}
