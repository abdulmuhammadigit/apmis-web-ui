import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemReceiptService } from '../../../services/asset/item-receipt/item-receipt.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';


@Component({
  selector: 'kt-search-item-receipt-detail',
  templateUrl: './search-item-receipt-detail.component.html',
  styleUrls: ['./search-item-receipt-detail.component.scss']
})
export class SearchItemReceiptDetailComponent implements OnInit {
  itemReceiptsList: Array<any>;
  public itemReceiptType = [];
  searchForm: FormGroup;
  onOperation: boolean = false;
  result: any;


  constructor(private fb: FormBuilder,
    private service: ItemReceiptService,
    private cdr: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private notify: NotificationService) { }

  ngOnInit() {
    this.itemReceiptsList = [];
    this.searchForm = this.fb.group({
      code: [''],
      documentNumber: [''],
      billNumber: ['']
    });
  }

  select(itemReceipt) {
    this.activeModal.close(itemReceipt);
  }

  searchItemReceipt() {

    if (this.searchForm.valid) {
      this.service.search(this.searchForm.value)
        .subscribe({

          next: d => {
            if (d.successful) {
              this.itemReceiptsList = d.data;
              if (d.data.length < 1) {
                this.notify.error("معلومات دریافت نگردید!");
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
