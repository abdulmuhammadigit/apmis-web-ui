import { ItemReceiptDetailService } from './../../../services/asset/item-receipt/item-receipt-detail.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { CreateItemComponent } from '../../item/create-item/create-item.component';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from '../../../../../core/_base/layout/directives/component-host.directive';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { SearchItemReceiptDetailComponent } from '../../item-receipt/search-item-receipt-detail/search-item-receipt-detail.component';


@Component({
	selector: 'kt-search-save-ticket',
	templateUrl: './search-save-ticket.component.html',
	styleUrls: ['./search-save-ticket.component.scss']
})
export class SearchSaveTicketComponent implements OnInit {

	searchForm: FormGroup;
	searchList: Array<any>;
	onOperation = false;
	itemId: any;
	closeResult: string;
	itemDetailList: Array<any>;


	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private formBuilder: FormBuilder,
		private itemService: ItemService,
		private changeDetectorRef: ChangeDetectorRef,
		private creator: ComponentBase<CreateItemComponent>,
		private notify: NotificationService,
		private modalService: NgbModal,
		private itemReceiptDetailService: ItemReceiptDetailService
	) {
		this.itemDetailList = [];
	}

	ngOnInit() {

		this.searchList = [];
		this.searchForm = this.formBuilder.group({
			itemReceiptId: [''],
			itemDetailId: [''],
			itemReceiptCode: ['']
		});

	}

	searchItemDetail(itemReceiptId: number) {
		this.itemReceiptDetailService.findItemDetailByItemReceipt(itemReceiptId).subscribe({
			next: val => {
				this.itemDetailList = val.data;
				this.changeDetectorRef.markForCheck();
			}
		});

	}

	selectItemReceipt() {
		const modalRef = this.modalService.open(SearchItemReceiptDetailComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				// const data = ({ itemReceiptId: result.id });
				this.searchForm.patchValue({
					itemReceiptId: result.id,
					itemReceiptCode: result.code
				});
				this.searchItemDetail(result.id);
				this.searchList = result.data;
			}
		}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);


	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


	isControlHasError(controlName, type) {
		const control = this.searchForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}
}
