import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';

@Component({
	selector: 'kt-search-item-request-detail',
	templateUrl: './search-item-request-detail.component.html',
	styleUrls: ['./search-item-request-detail.component.scss']
})
export class SearchItemRequestDetailComponent implements OnInit {

	RequestList: Array<any>;
	RequestForm: FormGroup;
	result: any;
	suggested: boolean = false;

	@Output() itemRequestEvent = new EventEmitter<any>();

	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;


	constructor(
		private fb: FormBuilder,
		public itemRequestService: ItemRequestService,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService,
		public activeModal: NgbActiveModal,
	) { }

	ngOnInit() {

		this.RequestList = [];
		this.RequestForm = this.fb.group({
			suggested: this.suggested,
			code: ['']
		})

	}

	searchRequestForm() {
		if (this.RequestForm.valid) {
			var data = this.RequestForm.value;
			data.distributionSearch = true;
			this.itemRequestService.search(this.RequestForm.value)
				.subscribe({
					next: response => {
						if (response.successful) {
							if (response.data.length < 1) {
								this.notify.error("معلومات دریافت نگردید!");
							}
							this.RequestList = response.data;
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

	selectItemRequest(item) {
		this.itemRequestEvent.emit(item);
		this.result = ({ itemRequestCode: item.code, itemRequestId: item.id });
		this.activeModal.close();
	}

}
