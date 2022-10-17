import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { ReportListService } from '../../../services/asset/report/report-list.service';

@Component({
  selector: 'kt-item-status-report',
  templateUrl: './item-status-report.component.html',
  styleUrls: ['./item-status-report.component.scss']
})
export class ItemStatusReportComponent implements OnInit {


  itemSearchForm: FormGroup;
  categoryList: Array<any>
  itemList: Array<any>
  itemDetailList: Array<any>
  itemSearchList: Array<any> = [];
  public fiscalyear = [];
  status = [];

  constructor(
    private formBuilder: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    private reportListService: ReportListService,
    private lookListService: LookListService,
  ) {

  }

  ngOnInit() {
    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      fiscalYearId: ['', Validators.required],
      statusId: ['', Validators.required]
    })
    this.getfiscalyearList();
    this.getStatus();

  }


  getfiscalyearList() {
    this.lookListService.getFiscalYearList().subscribe((res) => {
      this.fiscalyear = res;
    })
  }
  getStatus() {
    this.lookListService.getStatusList({}).subscribe((res) => {
      this.status = res.data;
    })
  }

  //operations
  searchItem() {
    const controls = this.itemSearchForm.controls;
    /** check form */
    if (this.itemSearchForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    if (this.itemSearchForm.valid) {
      this.reportListService.getItemQuantityList(this.itemSearchForm.value)
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


  isControlHasError(controlName, type) {
    const control = this.itemSearchForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

}
