import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { CreateItemReceiptComponent } from '../create-item-receipt/create-item-receipt.component';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ComponentHostDirective } from '../../../../../core/_base/layout/directives/component-host.directive';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { ControlItemReceiptComponent } from '../control-item-receipt/control-item-receipt.component';
import { ViewItemReceiptComponent } from '../view-item-receipt-for-cart/view-item-receipt.component';
import { AuthService } from '../../../../../core/auth';
@Component({
	selector: 'kt-search-item-receipt',
	templateUrl: './search-item-receipt.component.html',
	styleUrls: ['./search-item-receipt.component.scss']
})
export class SearchItemReceiptComponent implements OnInit {
	itemReceiptsList: Array<any>;
	sItemReciept: boolean;
	cItemReciept: boolean;
	public itemReceiptType = [];
	searchForm: FormGroup;
	onOperation = false;

	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(private fb: FormBuilder,
		           private service: ItemReceiptService,
		           private cdr: ChangeDetectorRef,
		           private creator: ComponentBase<CreateItemReceiptComponent>,
		           private notify: NotificationService, private authService: AuthService) { }

	ngOnInit() {
		this.itemReceiptsList = [];
		this.searchForm = this.fb.group({
			code: [''],
			billNumber: ['']
		});
		this.sItemReciept = this.authService.checkEntityPermission('ItemReceipt', 'SAVE');
		this.cItemReciept = this.authService.checkEntityPermission('ItemReceipt', 'CONTROL');
	}

	editItemReceipt(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemReceiptComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchItemReceipt();
			}
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);

	}

	controlItemReceipt(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(ControlItemReceiptComponent, this.host);

		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchItemReceipt();
			}
			this.onOperation = false;
			comp.destroy();
		});

		comp.instance.id.next(id);
	}

	viewItemReceipt(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(ViewItemReceiptComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchItemReceipt();
			}
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);
	}

	createItemReceipt() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemReceiptComponent, this.host);
		this.cdr.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
	}

	searchItemReceipt() {
		if (this.searchForm.valid) {
			this.service.search(this.searchForm.value)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.itemReceiptsList = d.data;
							if (d.data.length < 1) {
								this.notify.error('معلومات دریافت نگردید!');
							}
							this.cdr.detectChanges();
							this.cdr.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}
}
