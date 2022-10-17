import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ItemReallocationService } from '../../../services/asset/item-reallocation/item-reallocation.service';
import { CreateItemReallocationComponent } from '../create-item-reallocation/create-item-reallocation.component';
import { ItemExaminationComponent } from '../item-check/item-examination/item-examination.component';
import { ItemPricingComponent } from '../item-check/item-pricing/item-pricing.component';
import { AuthService } from '../../../../../core/auth';

@Component({
	selector: 'kt-search-item-reallocation',
	templateUrl: './search-item-reallocation.component.html',
	styleUrls: ['./search-item-reallocation.component.scss']
})
export class SearchItemReallocationComponent implements OnInit {

	itemReallocationSearchForm: FormGroup;
	itemReallocationSearchList: Array<any>;
	closeResult: string;
	itemReallocationId: any;
	sItem: boolean;
	cItem: boolean;
	pItem: boolean;
	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;


	listForm: FormGroup;
	recordList;

	constructor(
		private itemReallocationService: ItemReallocationService,
		private modalService: NgbModal,
		private changeDetectorRef: ChangeDetectorRef,
		private creator: ComponentBase<CreateItemReallocationComponent>,
		private notify: NotificationService,
		private fb: FormBuilder,
		private authService: AuthService) { }

	ngOnInit() {

		this.recordList = [];
		this.listForm = this.fb.group({
			itemReallocationId: [''],
			code: [''],
		});
		this.sItem = this.authService.checkEntityPermission('ItemReallocation', 'SAVE');
		this.cItem = this.authService.checkEntityPermission('ItemReallocation', 'CONTROL');
		this.pItem = this.authService.checkEntityPermission('ItemReallocation', 'PRICING');



		this.itemReallocationSearchList = [];
		this.itemReallocationSearchForm = this.fb.group({
			code: [''],
			documentNumber: ['']
		});
	}

	search() {
		const controls = this.listForm.controls;

		/** check form */
		if (this.listForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		this.itemReallocationService.search(this.listForm.value).subscribe({
			next: v => {
				if (v.successful) {
					this.recordList = v.data;
					if (v.data.length < 1) {
						this.notify.success('معلومات دریافت نگردید!');
					}
					this.changeDetectorRef.markForCheck();
				}
			},
			error: err => {
				this.notify.error(err);
			}
		});
	}

	createReallocationItemForm() {
		this.onOperation = true;
		this.changeDetectorRef.markForCheck();
		const comp = this.creator.Construct(CreateItemReallocationComponent, this.host);
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
	}

	editItemReallocationForm(id) {

		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemReallocationComponent, this.host);
		comp.instance.result.subscribe(next => {
			if (next == 1) {
				this.search();
			}
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);
		console.log(comp.instance.id.next(id));

	}
	examinerBoard(id) {
		const modalRef = this.modalService.open(ItemExaminationComponent, { size: 'xl' });
		modalRef.result.then((result) => {
			if (result) {
			}
		},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
		modalRef.componentInstance.id.next(id);
	}



	itempPricing(id) {
		const modalRef = this.modalService.open(ItemPricingComponent, { size: 'xl' });
		modalRef.result.then((result) => {
			if (result) {
			}
		},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			});
		modalRef.componentInstance.id.next(id);
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
