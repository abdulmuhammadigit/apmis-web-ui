import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ComponentHostDirective} from '../../../../../../core/_base/layout';
import {Subscription} from 'rxjs';
import {CreateItemTransferComponent} from '../create-item-transfer/create-item-transfer.component';
import {ComponentBase} from '../../../../../../core/_base/layout/components/component-base';
import {ItemRequestService} from '../../../../services/asset/item-request/item-request.service';
import {CreateItemSuggestedComponent} from '../../../item-suggested/create-item-suggested/create-item-suggested.component';
import {NotificationService} from '../../../../../../core/_base/layout/services/notification.service';
import {PrintItemSuggestedComponent} from '../../../item-suggested/print-item-suggested/print-item-suggested.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemTransferService} from '../../../../services/asset/stock/item-transfer.service';
import {PrintItemTransferComponent} from '../print-item-transfer/print-item-transfer.component';

@Component({
  selector: 'kt-search-item-transfer',
  templateUrl: './search-item-transfer.component.html',
  styleUrls: ['./search-item-transfer.component.scss']
})
export class SearchItemTransferComponent implements OnInit {

	title;
	subTitle;
	searchForm: FormGroup;
	recordList: Array<any>;

	onOperation = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;

	constructor(
		private fb: FormBuilder,
		private modalService: NgbModal,
		private itemTransferService: ItemTransferService,
		private cdf: ChangeDetectorRef,
		private creator: ComponentBase<CreateItemTransferComponent>,
		private notify: NotificationService
	) { }

	ngOnInit(): void {
		this.title = 'انتقال اجناس';
		this.subTitle = 'جهت جستجو اجناس انتقال شده توسط مکاتیب از گزینه های ذیل استفاده نمائید';
		this.recordList = [];
		this.searchForm = this.fb.group({
			documentNumber: [''],
			toEmployee: [''],
		});
	}
	createForm() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemTransferComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy();
		});
	}

	search() {
		if (this.searchForm.valid) {
			this.itemTransferService.search(this.searchForm.value).subscribe({
					next: response => {
						if (response.successful) {
							if (response.data.length < 1) {
								this.notify.error('معلومات دریافت نگردید!');
							}
							this.recordList = response.data;
							this.cdf.markForCheck();
						}
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}
	editRecord(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateItemTransferComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.search();
			}
			this.onOperation = false;
			comp.destroy();
		});
		comp.instance.id.next(id);
	}
	printRecord(id) {
		const modalRef = this.modalService.open(PrintItemTransferComponent, { size: 'lg' }).componentInstance.id.next(id);
 	}
}
