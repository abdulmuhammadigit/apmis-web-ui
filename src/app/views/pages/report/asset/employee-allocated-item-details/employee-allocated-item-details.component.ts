import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { SearchEmployeeComponent } from '../../../configuration/hr/employee/search-employee/search-employee.component';
import { ReportListService } from '../../../services/asset/report/report-list.service';

@Component({
  selector: 'kt-employee-allocated-item-details',
  templateUrl: './employee-allocated-item-details.component.html',
  styleUrls: ['./employee-allocated-item-details.component.scss']
})
export class EmployeeAllocatedItemDetailsComponent implements OnInit {

  employeeId: any;
  employeeText: any;
  itemSearchForm: FormGroup;
  itemSearchList: Array<any> = [];
  result: any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    private reportListService: ReportListService
  ) { }

  ngOnInit() {
    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      employeeId: [''],
      employeeText: [''],

    })
  }

  searchEmployee() {
    const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      const data = ({ employeeId: result.id });
      if (result) {
        this.itemSearchForm.patchValue({
          employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
          employeeId: result.id,
        });

      }
    });
  }


  searchItem() {
    if (this.itemSearchForm.valid) {
      let id = this.itemSearchForm.get('employeeId').value;
      this.reportListService.getEmployeesItemDetailsList({ employeeId: id })
        .subscribe({
          next: d => {
            if (d.successful) {
              this.itemSearchList = d.data;
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
