import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ItemDistributionService } from '../../../services/asset/item-distribution/item-distribution.service';
@Component({
  selector: 'kt-print-item-distribute',
  templateUrl: './print-item-distribute.component.html',
  styleUrls: ['./print-item-distribute.component.scss']
})
export class PrintItemDistributeComponent implements OnInit {


  itemDistributionForm: FormGroup;
  printModelList: Array<any>;
  total;
  id: Subject<number>;
  code;
  documentNumber;
  date;
  itemRequestId;
  description;
  itemRequestCode;
  itemRequestShamsiDate;
  itemRequestOrgUnitText;
  employeeName;
  employeeFatherName;
  stockKeeperName;
  stockKeeperLastName;
  stockKeeperFatherName;

  constructor(
    public activeModal: NgbActiveModal,
    private ItemDistributionService: ItemDistributionService,
    private notify: NotificationService,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,

  ) {
    this.id = new BehaviorSubject(0);
    this.total = 0;
  }

  ngOnInit() {

    this.findData();
    this.printModelList = [];
  }



  findData() {

    this.id.subscribe(next => {
      if (next != 0) {
        this.ItemDistributionService.printItemDistribution(next).subscribe({
          next: val => {
            if (val.successful) {

              this.code = val.data.code;
              this.documentNumber = val.data.documentNumber;
              this.date = val.data.date;
              this.itemRequestId = val.data.itemRequestId;
              this.description = val.data.description;
              this.itemRequestCode = val.data.itemRequestCode;
              this.itemRequestShamsiDate = val.data.itemRequestShamsiDate;
              this.itemRequestOrgUnitText = val.data.itemRequestOrgUnitText;
              this.employeeName = val.data.employeeName;
              this.employeeFatherName = val.data.employeeFatherName;
              this.stockKeeperName = val.data.stockKeeperName;
              this.stockKeeperLastName = val.data.stockKeeperLastName;
              this.stockKeeperFatherName = val.data.stockKeeperFatherName;
              this.employeeName = val.data.employeeName;

              this.printModelList = val.data.printModelList;
              for (let item of this.printModelList) {
                this.total += (item.price * item.quantity);
              }

              this.description = val.data.description;
              this.changeDetectorRef.markForCheck();

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