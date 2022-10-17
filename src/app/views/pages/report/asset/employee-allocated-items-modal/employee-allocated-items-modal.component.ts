import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { SearchEmployeeComponent } from '../../../configuration/hr/employee/search-employee/search-employee.component';
import { ReportListService } from '../../../services/asset/report/report-list.service';

@Component({
  selector: 'kt-employee-allocated-items-modal',
  templateUrl: './employee-allocated-items-modal.component.html',
  styleUrls: ['./employee-allocated-items-modal.component.scss']
})
export class EmployeeAllocatedItemsModalComponent implements OnInit {
  itemSearchForm: FormGroup;
  itemSearchList: Array<any> = [];
  result: any;
  @Input() public employeeId;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    private reportListService: ReportListService,
    public activeModel: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      employeeId: this.employeeId
    })

    this.searchItem();
  }


  searchItem() {
    if (this.itemSearchForm.valid) {
      let id = this.itemSearchForm.get('employeeId').value;
      this.reportListService.getEmployeesItemList({ employeeId: id })
        .subscribe({
          next: d => {
            if (d.successful) {
              this.itemSearchList = d.data;
              this.changeDetectorRef.detectChanges()
              if (d.data.length < 1) {
                this.notify.error("کارمند نامبرده ریکارد ندارد.");
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
