import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { AuctionService } from '../../../services/asset/auction/auction.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';

@Component({
  selector: 'kt-search-item-specification',
  templateUrl: './search-item-specification.component.html',
  styleUrls: ['./search-item-specification.component.scss']
})
export class SearchItemSpecificationComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  itemSearchForm: FormGroup;
  categoryList: Array<any>
  itemList: Array<any>
  itemSearchList: Array<any>
  @Output() itemRequestEvent = new EventEmitter<any>();
  result: any;


  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private lookListService: LookListService,
    private AuctionService: AuctionService,
    private changeDetectorRef: ChangeDetectorRef,
    public activeModal: NgbActiveModal,
    private notify: NotificationService,
  ) { }

  ngOnInit() {

    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      serialNumber: [''],
      tagNumber: [''],
      detail: ['']
    })

    this.lookListService.getCategoryList().subscribe(val => {
      this.categoryList = val;
    });

  }


  searchItem() {
    if (this.itemSearchForm.valid) {
      this.AuctionService.searchReallocatedItemSpecification(this.itemSearchForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.itemSearchList = d.data;
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

  selectItem(item) {

    this.itemRequestEvent.emit(item);
    //this.result = item.id;
    this.result = ({ itemDetail: item.itemDetail, reallocatedPrice: item.reallocatedPrice });

    this.activeModal.close();
  }

}
