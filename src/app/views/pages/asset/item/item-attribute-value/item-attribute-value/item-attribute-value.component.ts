import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, Input, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemAttributeValueService } from '../../../../services/asset//item/item-attribute-value.service';
import { AddItemAtrributeValueComponent } from '../add-item-atrribute-value/add-item-atrribute-value.component';


@Component({
	selector: 'kt-item-attribute-value',
	templateUrl: './item-attribute-value.component.html',
	styleUrls: ['./item-attribute-value.component.scss']
})
export class ItemAttributeValueComponent implements OnInit {

	// curitemId: number = -1;
	allAttributeValues: Array<any>
	closeResult: string;
	@Input() itemName;
	@Input() itemId;



	constructor(
		private ItemAttributeValue: ItemAttributeValueService,
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService
	) {

	}


	ngOnInit() {
		this.loadItemAttributeValues(this.itemId);
	}


	loadItemAttributeValues(itemId: number) {
		// console.log(itemId);
		this.ItemAttributeValue.search(itemId)
			.subscribe({
				next: d => {
					if (d.successful) {
						this.allAttributeValues = d.data;

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
	editAttributeValue(id) {
		const modal = this.modalService.open(AddItemAtrributeValueComponent, {
			size: 'xl',
			windowClass: 'custom-class'
			// centered: true,
			// scrollable: true
		});
		this.changeDetectorRef.markForCheck();
		modal.componentInstance.itemId = this.itemId;
		modal.componentInstance.itemName = this.itemName;


		modal.result.then((result) => {
			this.loadItemAttributeValues(this.itemId);
			this.closeResult = `Closed with: ${result}`;
		}
			, (reason) => {
				this.loadItemAttributeValues(this.itemId);
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			}
		);
		modal.componentInstance.id.next(id);


	}

	addNewAttributeValue() {
		const modal = this.modalService.open(AddItemAtrributeValueComponent, {
			size: 'xl',
			windowClass: 'custom-class'
			// centered: true,
			// scrollable: true
		});
		this.changeDetectorRef.markForCheck();
		modal.componentInstance.itemId = this.itemId;
		modal.componentInstance.itemName = this.itemName;


		modal.result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
			this.loadItemAttributeValues(this.itemId);
		}
			, (reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
				this.loadItemAttributeValues(this.itemId);
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
