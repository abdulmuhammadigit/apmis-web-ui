import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { AuctionService } from '../../../services/asset/auction/auction.service';
import { CreateAuctionComponent } from '../create-auction/create-auction.component';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { BehaviorSubject, of, Subject } from "rxjs";
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchItemDetailComponent } from '../../item/search-item-detail/search-item-detail.component';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { BoardDecissionComponent } from '../board-decission/board-decission.component';
import { SearchItemSpecificationComponent } from '../../item/search-item-specification/search-item-specification.component';

@Component({
  selector: 'kt-search-auction',
  templateUrl: './search-auction.component.html',
  styleUrls: ['./search-auction.component.scss']
})
export class SearchAuctionComponent implements OnInit {
	closeResult: string;
	modalOptions: NgbModalOptions;
	id: Subject<number>;
	editable: boolean;

	searchAuctionForm: FormGroup;
	auctionSearchList: Array<any>;
	onOperation: boolean = false;
	fiscalyear = [];
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private fb: FormBuilder,
		private modalService: NgbModal,
		private auctionService: AuctionService,
		private cdf: ChangeDetectorRef,
		private lookListService: LookListService,
		private creator: ComponentBase<CreateAuctionComponent>,
		private notify: NotificationService
	) { }

	ngOnInit() {
		this.auctionSearchList = [];

		this.searchAuctionForm = this.fb.group({
			itemDetailId: [''],
			itemDetailText: [''],
			fiscalYearId: ['']
		})

		this.lookListService.getFiscalYearList().subscribe((res) => {
			this.fiscalyear = res;
		})
	}

	searchItemDetail() {
		const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'lg' });

		modalRef.result.then((result) => {
			if (result) {
				this.searchAuctionForm.patchValue({
					itemDetailId: result.id,
					itemDetailText: result.detail
				});
			}
		})
	}


	editAuction(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateAuctionComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchAuction();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

	createAuction() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateAuctionComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	searchAuction() {
		if (this.searchAuctionForm.valid) {
			this.auctionService.search(this.searchAuctionForm.value)
				.subscribe({
					next: response => {
						if (response.successful) {
							if (response.data.length < 1) {
								this.notify.error("معلومات دریافت نگردید!");
							}
							this.auctionSearchList = response.data;
							this.cdf.markForCheck();
						}

					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

	boardDecission(index) {

		let modalRef = this.modalService.open(BoardDecissionComponent, { size: 'xl' });
		modalRef.componentInstance.id.next(index);

	}

}
