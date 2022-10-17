import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemService } from '../../../services/asset/item/item.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { ReportListService } from '../../../services/asset/report/report-list.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-search-item-remain',
  templateUrl: './search-item-remain.component.html',
  styleUrls: ['./search-item-remain.component.scss']
})
export class SearchItemRemainComponent implements OnInit {


  itemSearchForm: FormGroup;
  itemDetailList: Array<any>
  itemSearchList: Array<any> = [];
  @Input() public itemDetailId;
  itemName: any;
  itemId: any;



  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private itemDetailService: ItemDetailService,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    private reportListService: ReportListService,
    public activeModal: NgbActiveModal,
  ) {

  }

  ngOnInit() {
    this.itemSearchList = [];

    this.itemSearchForm = this.formBuilder.group({
      detailId: this.itemDetailId
    })
    this.searchItem();

  }


  loadItem(itemId) {
    this.itemService.findById({ id: itemId }).subscribe(val => {
      this.itemName = val.data.name;
    });
  }


  loadItemDetail(itemId) {
    this.itemDetailService.getList({ itemId: itemId }).subscribe(val => {
      this.itemDetailList = val.data;
    });
  }

  //operations
  searchItem() {
    if (this.itemSearchForm.valid) {
      this.reportListService.getItemQuantityList(this.itemSearchForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.itemSearchList = d.data;
              this.itemId = d.data[0].itemId;
              this.loadItemDetail(this.itemId);
              this.loadItem(this.itemId);

              this.changeDetectorRef.detectChanges()
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


}
