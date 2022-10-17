import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';

import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAttributeService } from '../../../../services/asset//item/item-attribute.service';
import { AddItemAtrributeComponent } from '../add-item-atrribute/add-item-atrribute.component';



@Component({
	selector: 'kt-item-attribute',
	templateUrl: './item-attribute.component.html',
	styleUrls: ['./item-attribute.component.scss'],

})
export class ItemAttributeComponent implements OnInit {
	curitemId: number = -1;
	allAttributes: Array<any>
	closeResult: string;

	@Input() curCategoryId;
	@Input() itemId;

	constructor(
		private ItemAttribute: ItemAttributeService,
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService
	) {

	}

	ngOnInit() {
		this.loadItemAttributes(this.itemId);
	}

	loadItemAttributes(id: number) {
		this.ItemAttribute.search({ itemId: id })
			.subscribe({
				next: d => {
					if (d.successful) {
						this.allAttributes = d.data;
						this.changeDetectorRef.markForCheck();
					}
				},
				error: err => {
					this.notify.error(err);
				}
			});
	}

	delete(id: number) {

	}

	addNewAttributes() {
		const modal = this.modalService.open(AddItemAtrributeComponent, {
			size: 'xl',
			windowClass: 'custom-class'
			// centered: true,
			// scrollable: true
		});
		this.changeDetectorRef.markForCheck();
		modal.componentInstance.itemId.next(this.itemId);
		modal.componentInstance.curCategoryId = this.curCategoryId;
		modal.result.then((result) => {
			this.loadItemAttributes(this.itemId);
			this.closeResult = `Closed with: ${result}`;
		}
			, (reason) => {
				this.loadItemAttributes(this.itemId);
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

}
