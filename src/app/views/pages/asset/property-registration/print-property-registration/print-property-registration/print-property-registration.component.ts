import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../../../../../../core/_base/layout/services/notification.service';
import { PropertyService } from '../../../../services/asset/property/property.service';

@Component({
  selector: 'kt-print-property-registration',
  templateUrl: './print-property-registration.component.html',
  styleUrls: ['./print-property-registration.component.scss']
})
export class PrintPropertyRegistrationComponent implements OnInit {

  id: Subject<number>;
  detail;
  employeeId;
  itemDistributedSpecificationId;
  itemCode;
  itemRecieptCode;
  distributionDate;
  itemPrice;
  tagNumber;
  employee;
  serialNumber;
  expirationDate;
  employeeCode;
  constructor(
    public activeModel: NgbActiveModal,
    public modalService: NgbModal,
    private propertyservice: PropertyService,
    private cdf: ChangeDetectorRef,
    private notify: NotificationService

  ) {
    this.id = new BehaviorSubject(this.employeeId);
  }

  ngOnInit() {
    this.findData();
  }

  findData() {
    this.id.subscribe(next => {
      if (next != 0) {
        this.propertyservice.findById({ employeeId: this.employeeId, itemDistributedSpecificationId: this.itemDistributedSpecificationId }).subscribe({
          next: val => {
            if (val.successful) {
              if (val.data.length > 0) {
                var data = val.data[0];
                this.detail = data.detail;
                this.itemCode = data.itemCode;
                this.itemRecieptCode = data.itemRecieptCode;
                this.distributionDate = data.distributionDate;
                this.itemPrice = data.itemPrice;
                this.tagNumber = data.tagNumber;
                this.employee = data.employee;
                this.serialNumber = data.serialNumber;
                this.expirationDate = data.expirationDate;
                this.employeeCode = data.employeeCode;
              }
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
