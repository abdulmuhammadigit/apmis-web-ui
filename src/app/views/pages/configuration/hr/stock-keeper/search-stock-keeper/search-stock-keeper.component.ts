import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { ComponentBase } from "../../../../../../core/_base/layout/components/component-base";
import { ComponentHostDirective } from '../../../../../../core/_base/layout/directives/component-host.directive';
import { StockKeeperService } from './../../../../services/asset/hr/stock-keeper.service';
import { CreateStockKeeperComponent } from '../create-stock-keeper/create-stock-keeper.component';
@Component({
	selector: 'kt-search-stock-keeper',
	templateUrl: './search-stock-keeper.component.html',
	styleUrls: ['./search-stock-keeper.component.scss']
})
export class SearchStockKeeperComponent implements OnInit {

	id: Subject<number>;
	editable: boolean;
	searchStockKeeperForm: FormGroup;
	stockKeeperSearchList: Array<any>;
	keeperType = [];
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private fb: FormBuilder,
		private stockkeeperService: StockKeeperService,
		private lookListService: LookListService,
		private creator: ComponentBase<CreateStockKeeperComponent>,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) { }

	ngOnInit() {
		this.stockKeeperTypeList();

		this.stockKeeperSearchList = [];

		this.searchStockKeeperForm = this.fb.group({
			stockKeeperTypeId: ''
		})
	}

	stockKeeperTypeList() {

		this.lookListService.getStockKeeperTypeList().subscribe((res) => {
			this.keeperType = res;
		})

	}
	createstockkeeper() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateStockKeeperComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	editStockKeeper(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateStockKeeperComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchStockKeeper();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

	searchStockKeeper() {
		if (this.searchStockKeeperForm.valid) {
			this.stockkeeperService.search(this.searchStockKeeperForm.value)
				.subscribe({
					next: val => {
						if (val.data.length < 1) {
							this.notify.error("معلومات دریافت نگردید");
						}
						this.stockKeeperSearchList = val.data;
						this.cdf.markForCheck();
					},
					error: err => {
						console.log(err);
					}
				});
		}
	}

}
