import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ItemSuggestedService } from '../../../services/asset/item-suggested/item-suggested.service';

@Component({
  selector: 'kt-print-item-suggested',
  templateUrl: './print-item-suggested.component.html',
  styleUrls: ['./print-item-suggested.component.scss']
})
export class PrintItemSuggestedComponent implements OnInit {

  id: Subject<number>;
  date;
  code;
  description;
  orgUnitText;
  department;
  employeeText;
  suggestedDetailModel: Array<any>;

  constructor(
    public activeModel: NgbActiveModal,
    public modalService: NgbModal,
    private ItemSuggestedService: ItemSuggestedService,
    private cdf: ChangeDetectorRef,
    private notify: NotificationService
  ) {
    this.id = new BehaviorSubject(0);
  }

  ngOnInit(): void {
    this.findData();
    this.suggestedDetailModel = [];
  }
  findData() {
    this.id.subscribe(next => {
      if (next != 0) {
        this.ItemSuggestedService.findById({ id: next }).subscribe({
          next: val => {
            if (val.successful) {
              this.date = val.data.date;
              this.code = val.data.code;
              this.orgUnitText = val.data.orgUnitText;
              this.department = val.data.department;
              this.description = val.data.description;
              this.employeeText = val.data.employeeText,
                this.suggestedDetailModel = val.data.suggestedDetailModel
              this.cdf.markForCheck();
            }
          },
          error: err => {
            this.notify.error(err);
          }
        })
      }
    });

  }

}
