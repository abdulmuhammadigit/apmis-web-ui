import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemDistributedService } from './../../../services/asset/item-distribution/item-distributed.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';

@Component({
	selector: 'kt-search-item-receipt-specification',
	templateUrl: './search-item-receipt-specification.component.html',
	styleUrls: ['./search-item-receipt-specification.component.scss']
})
export class SearchItemReceiptSpecificationComponent implements OnInit {

	@Input() public itemDistributedId;
	@Output() itemSpecificationEvent = new EventEmitter<any>();
	btnDisabled: boolean = false;

	itemReceiptSpecificationSearchForm: FormGroup;
	itemReceiptSpecificationList: Array<any>;
	public specificationIdList = [];


	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;
	result: any;


	constructor(
		private formBuilder: FormBuilder,
		private ItemDistributedService: ItemDistributedService,
		private itemReceiptService: ItemReceiptService,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal
	) {
		this.initializaForm();
	}

	ngOnInit() {
		this.ItemReceiptSpecification();
	}

	initializaForm() {
		this.itemReceiptSpecificationSearchForm = this.formBuilder.group({
			itemDistributionId: ['']
		});
	}

	ItemReceiptSpecification() {
		const itemDistributionId = ({ itemDistributionId: this.itemDistributedId })
		if (this.itemReceiptSpecificationSearchForm.valid) {
			this.ItemDistributedService.search(itemDistributionId)
				.subscribe({
					next: d => {
						if (d.successful) {
							this.itemReceiptSpecificationList = d.data;
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

	checkbox($event, id, itemSpecificationId) {

		if ($event.target.checked === true) {
			this.specificationIdList.push(id, itemSpecificationId);
			this.itemSpecificationEvent.emit(this.specificationIdList);
			this.result = this.specificationIdList;
		}
		else {
			this.specificationIdList = this.specificationIdList.filter(item => item != id, SId => SId != itemSpecificationId);

		}

	}

	selectItemSpecifiction() {
		// this.itemSpecificationEvent.emit(this.specificationIdList);
		// this.result = this.specificationIdList;
		this.activeModal.close(this.btnDisabled = false);

	}

}
