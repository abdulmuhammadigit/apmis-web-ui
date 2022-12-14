import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
// import { ReportListService } from '../../../services/asset/report/report-list.service';
import { OrgUnitService } from '../../../services/asset/hr/org-unit.service';
import { any } from 'codelyzer/util/function';


@Component({
  selector: 'kt-necessitychart-quarter-report',
  templateUrl: './necessitychart-quarter-report.component.html',
  styleUrls: ['./necessitychart-quarter-report.component.scss']
})
export class NecessitychartQuarterReportComponent implements OnInit {

  itemSearchForm: FormGroup;
  itemSearchList: Array<any> = [];
  itemDetailList: Array<any>
  procurement: Array<any> = [];

  public orgunit = [];
  public fiscalyear = [];
  public fiscalyearquarter = [];


  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private lookListService: LookListService,
    private orgUnitService: OrgUnitService,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    // private reportListService: ReportListService,
    private itemDetailService: ItemDetailService,
  ) {

  }



  ngOnInit() {
    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      orgUnitId: ['', Validators.required],
      fiscalYearId: ['', Validators.required]

    })

    this.getorgunitList();
    this.getfiscalyearList();
    this.getfiscalyearquarterList();

  }



  //look
  getorgunitList() {
    this.orgUnitService.getList({}).subscribe((res) => {
      this.orgunit = res.data;
    })
  }

  getfiscalyearList() {
    this.lookListService.getFiscalYearList().subscribe((res) => {
      this.fiscalyear = res;
    })
  }
  getfiscalyearquarterList() {
    this.lookListService.getFiscalYearQuarterList().subscribe((res) => {
      this.fiscalyearquarter = res;
    })
  }



  //operations
  searchItem() {
    const controls = this.itemSearchForm.controls;
    /** check form */
    // if (this.itemSearchForm.invalid) {
    //   Object.keys(controls).forEach(controlName =>
    //     controls[controlName].markAsTouched()
    //   );
    //   return;
  }

  //   if (this.itemSearchForm.valid) {
  //     this.reportListService.getNecessityChartList(this.itemSearchForm.value)
  //       .subscribe({
  //         next: d => {
  //           if (d.successful) {
  //             this.itemSearchList = d.data;
  //             this.itemSearchList.forEach(e => {
  //               console.log("e", e.commissionDecisionQuantity - e.remain);
  //               // this.procurement.push(e.commissionDecisionQuantity - e.remain);

  //             });


  //             this.changeDetectorRef.detectChanges()
  //             if (d.data.length < 1) {
  //               this.notify.error("?????????????? ???????????? ????????????!");
  //             }

  //             this.changeDetectorRef.markForCheck();
  //           }
  //         },
  //         error: err => {
  //           this.notify.error(err);
  //         }
  //       });
  //   }
  // }


  isControlHasError(controlName, type) {
    const control = this.itemSearchForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }


}
