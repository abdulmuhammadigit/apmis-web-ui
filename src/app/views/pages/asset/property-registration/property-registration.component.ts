import { PrintPropertyRegistrationComponent } from './print-property-registration/print-property-registration/print-property-registration.component';
import { NotificationService } from './../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CreateItemComponent } from '../item/create-item/create-item.component';
import { ComponentBase } from '../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from "../../../../core/_base/layout/directives/component-host.directive";
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployeeComponent } from '../../configuration/hr/employee/search-employee/search-employee.component';
import { ReportListService } from '../../services/asset/report/report-list.service';


@Component({
  selector: 'kt-property-registration',
  templateUrl: './property-registration.component.html',
  styleUrls: ['./property-registration.component.scss']
})
export class PropertyRegistrationComponent implements OnInit {

  searchForm: FormGroup;
  searchList: Array<any> = [];
  closeResult: string;
  employeeId: any;
  employeeText: any;
  result: any;

  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private creator: ComponentBase<CreateItemComponent>,
    private notify: NotificationService,
    private modalService: NgbModal,
    private reportListService: ReportListService


  ) { }

  ngOnInit() {
    this.searchList = [];
    this.searchForm = this.formBuilder.group({
      employeeId: [''],
      employeeText: [''],
    })
  }

  search() {
    if (this.searchForm.valid) {
      let id = this.searchForm.get('employeeId').value;
      this.reportListService.getEmployeesItemList({ employeeId: id })
        .subscribe({
          next: d => {
            if (d.successful) {

              this.searchList = d.data;
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
  searchEmployee() {
    const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      const data = ({ employeeId: result.id });
      if (result) {
        this.searchForm.patchValue({
          employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
          employeeId: result.id,
        });

      }
    });
  }

  print(itemDistributedSpecificationId) {
    const modalRef = this.modalService.open(PrintPropertyRegistrationComponent, { size: 'lg' });
    let id = (this.searchForm.get('employeeId').value)
    modalRef.componentInstance.id.next(id);
    modalRef.componentInstance.employeeId = id;
    modalRef.componentInstance.itemDistributedSpecificationId = itemDistributedSpecificationId;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  isControlHasError(controlName, type) {
    const control = this.searchForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }
}
