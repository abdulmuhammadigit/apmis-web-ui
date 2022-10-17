import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from './../../../../services/asset/hr/employee.service';
import { ComponentHostDirective } from '../../../../../../core/_base/layout';

@Component({
  selector: 'kt-search-employee-item-active',
  templateUrl: './search-employee-item-active.component.html',
  styleUrls: ['./search-employee-item-active.component.scss']
})
export class SearchEmployeeItemActiveComponent implements OnInit {

  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  searchEmployeeForm: FormGroup;
  employeeSearchList: Array<any>;

  onOperation: boolean = false;
  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;


  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private cdf: ChangeDetectorRef,
    public activeModel: NgbActiveModal,
    private notify: NotificationService,
    public modalService: NgbModal
  ) { }

  ngOnInit() {
    this.employeeSearchList = [];

    this.searchEmployeeForm = this.fb.group({
      id: [''],
      code: [''],
      name: [''],
      lastName: [''],
      fatherName: ['']
    })
  }

  selectEmployee(emp) {
    this.activeModel.close(emp);
  }

  searchEmployee() {
    if (this.searchEmployeeForm.valid) {
      this.service.searchemployeeitemactive(this.searchEmployeeForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.employeeSearchList = d.data;
              if (d.data.length < 1) {
                this.notify.error("معلومات دریافت نگردید!");
              }
              this.cdf.markForCheck();
            }
          },
          error: err => {
            this.notify.error(err);
          }
        });
    }
  }
}
