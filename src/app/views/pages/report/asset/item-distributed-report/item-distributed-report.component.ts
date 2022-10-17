import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemService } from '../../../services/asset/item/item.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemDetailService } from '../../../services/asset/item/item-detail.service';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { OrgUnitService } from '../../../services/asset/hr/org-unit.service';
import { ReportListService } from '../../../services/asset/report/report-list.service';

@Component({
  selector: 'kt-item-distributed-report',
  templateUrl: './item-distributed-report.component.html',
  styleUrls: ['./item-distributed-report.component.scss']
})
export class ItemDistributedReportComponent implements OnInit {

  itemSearchForm: FormGroup;
  categoryList: Array<any>
  itemList: Array<any>
  itemDetailList: Array<any>
  itemSearchList: Array<any> = [];
  result: any;
  orgunit = [];
  isShown: boolean = false;

  chartOption: any;

  chartItems;
  options: any;
  updateOptions: any;

  xAxis = {
    type: 'category',
    boundaryGap: true,
    offset: 14.5,
    data: [],
    axisLabel: {
      inside: false,
      fontFamily: "Arial",
      textStyle: {
        color: ' #17202a ',
        fontSize: 20
      },
    },
    axisTick: {
      alignWithLabel: true
    },
    axisLine: {
      symbol: "arrow"
    }

  };

  yAxis = {
    type: 'value',
    boundaryGap: true,
    position: "lift",
    offset: 0,
    axisLine: {
      show: true,
      symbol: "arrow"
    },
    axisLabel: {
      textStyle: {
        color: '#17202a',
        fontSize: 20
      },
    },

  };

  series = [{
    data: [],
    type: 'bar',
    barWidth: "10%",
  }];


  @ViewChild('startDateShamsi', { static: false }) startShamsiDate: DatePickerComponent;
  @ViewChild('startDate', { static: false }) startDate: DatePickerComponent;

  @ViewChild('endDateShamsi', { static: false }) endShamsiDate: DatePickerComponent;
  @ViewChild('endDate', { static: false }) endDate: DatePickerComponent;


  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private lookListService: LookListService,
    private itemDetailService: ItemDetailService,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    public dateService: DatePickerService,
    private orgunitService: OrgUnitService,
    private reportListService: ReportListService
  ) {
    this.options = {
      xAxis: this.xAxis,
      yAxis: this.yAxis,
      series: this.series
    };
  }

  ngOnInit() {
    this.getorganizationname();
    this.itemSearchList = [];
    this.itemSearchForm = this.formBuilder.group({
      consumable: ['', Validators.required],
      startDate: ['', Validators.required],
      startDateShamsi: ['', Validators.required],
      endDate: ['', Validators.required],
      endDateShamsi: ['', Validators.required],

    })

    this.lookListService.getCategoryList().subscribe(val => {
      this.categoryList = val;
    });

  }

  loadItem(category) {
    this.itemService.getList({ categoryId: category.id }).subscribe(val => {
      this.itemList = val.data;
      this.itemSearchForm.controls['itemId'].enable();
    });
  }


  loadItemDetail(item) {
    this.itemDetailService.getList({ itemId: item.id }).subscribe(val => {
      this.itemDetailList = val.data;
      this.itemSearchForm.controls['detailId'].enable();

    });
  }

  searchItem() {
    const controls = this.itemSearchForm.controls;
    /** check form */
    if (this.itemSearchForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.reportListService.getItemDistributedList(this.itemSearchForm.value)
      .subscribe({
        next: d => {
          if (d.successful) {
            this.isShown = !this.isShown;
            this.itemSearchList = d.data;
            let y = [];
            let x = [];
            this.itemSearchList.forEach(item => {

              x.push(item.orgUnitName);
              y.push(item.count);
            })
            this.series[0].data = y;
            this.xAxis.data = x;

            this.updateOptions = {
              xAxis: this.xAxis,
              yAxis: this.yAxis,
              series: this.series
            };
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

  // utility
  isControlHasError(controlName, type) {
    const control = this.itemSearchForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

  // calendar section
  setStartShamsiDate(date: any) {
    let gDate: String = date + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let startShamsiDate = this.dateService.toShamsiDate(date);
      if (this.itemSearchForm.get('startDateShamsi').value != startShamsiDate)
        this.itemSearchForm.get('startDateShamsi').setValue(startShamsiDate);

    }
  }

  setEndShamsiDate(date: any) {
    let gDate: String = date + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let endShamsiDate = this.dateService.toShamsiDate(date);
      if (this.itemSearchForm.get('endDateShamsi').value != endShamsiDate)
        this.itemSearchForm.get('endDateShamsi').setValue(endShamsiDate);
    }
  }

  setStartGregorianDate(shamsiDate: any) {
    let gDate: String = shamsiDate + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let startDate = this.dateService.toGregorianDate(shamsiDate);
      if (this.itemSearchForm.get('startDate').value != startDate)
        this.itemSearchForm.get('startDate').setValue(startDate);

    }
  }

  setEndGregorianDate(shamsiDate: any) {
    let gDate: String = shamsiDate + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let endDate = this.dateService.toGregorianDate(shamsiDate);
      if (this.itemSearchForm.get('endDate').value != endDate)
        this.itemSearchForm.get('endDate').setValue(endDate);
    }
  }
  ngAfterViewInit() {
    this.dateService.initCalendar();
  }

  getorganizationname() {
    this.orgunitService.getList({}).subscribe((res) => {
      this.orgunit = res.data;
    })

  }

}
