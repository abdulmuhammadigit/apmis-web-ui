import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../../../views/pages/services/datepicker/date-picker.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { ItemReceiptService } from '../../../../../views/pages/services/asset/report/item-receipt.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ReportListService } from './../../../services/asset/report/report-list.service';
import { values } from 'lodash';

@Component({
  selector: 'kt-item-receipt-report',
  templateUrl: './item-receipt-report.component.html',
  styleUrls: ['./item-receipt-report.component.scss']
})
export class ItemReceiptReportComponent implements OnInit {

  public Chart: any;
  public Chart1: any;
  public Chart2: any;
  public Options: any;

  public itemReceiptModelDetails: FormArray;
  public searchForm: FormGroup;
  public searchList: Array<any> = [];
  public itemReceiptTypesList: Array<any>;

  @ViewChild('receiveDateShamsi', { static: false }) shamsiDate: DatePickerComponent;
  @ViewChild('receiveDate', { static: false }) date: DatePickerComponent;

  constructor(
    private lookListService: LookListService,
    private cdf: ChangeDetectorRef,
    public dateService: DatePickerService,
    public ItemReceiptService: ItemReceiptService,
    public ReportListService: ReportListService,
    private changeDetectorRef: ChangeDetectorRef,
    private notify: NotificationService,
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit(): void {

    this.getItemReceiptTypesList();
    this.searchList = [];
    this.searchForm = this.formBuilder.group({
      localProduct: [''],
      startDate: [''],
      startDateShamsi: [''],
      endDate: [''],
      endDateShamsi: [''],
    })

    this.lookListService.getItemReceiptTypeList().subscribe(val => {
      this.itemReceiptTypesList = val;
    });
  }

  //look section
  getItemReceiptTypesList() {
    this.lookListService.getItemReceiptTypeList().subscribe((res) => {
      this.itemReceiptTypesList = res;
      this.cdf.detectChanges();
    })
  }

  // calendar section
  setStartShamsiDate(date: any) {
    let gDate: String = date + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let startShamsiDate = this.dateService.toShamsiDate(date);
      if (this.searchForm.get('startDateShamsi').value != startShamsiDate)
        this.searchForm.get('startDateShamsi').setValue(startShamsiDate);

    }
  }

  setEndShamsiDate(date: any) {
    let gDate: String = date + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let endShamsiDate = this.dateService.toShamsiDate(date);
      if (this.searchForm.get('endDateShamsi').value != endShamsiDate)
        this.searchForm.get('endDateShamsi').setValue(endShamsiDate);
    }
  }

  setStartGregorianDate(shamsiDate: any) {
    let gDate: String = shamsiDate + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let startDate = this.dateService.toGregorianDate(shamsiDate);
      if (this.searchForm.get('startDate').value != startDate)
        this.searchForm.get('startDate').setValue(startDate);

    }
  }

  setEndGregorianDate(shamsiDate: any) {
    let gDate: String = shamsiDate + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let endDate = this.dateService.toGregorianDate(shamsiDate);
      if (this.searchForm.get('endDate').value != endDate)
        this.searchForm.get('endDate').setValue(endDate);
    }
  }
  ngAfterViewInit() {
    this.dateService.initCalendar();
  }

  //operations

  search() {
    if (this.searchForm.valid) {
      //let id = this.searchForm.value;
      this.ReportListService.getItemReceiptList(this.searchForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.searchList = d.data;
              this.InitPipe();

              this.changeDetectorRef.detectChanges();
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


  InitPipe(): void {
    //this.Chart = echarts.init((document.getElementById('pipe')) as any);
    // const option = {
    //   title: {
    //     text: ' رسیدات',
    //     left: 'center',
    //     top: '50',
    //   },
    //   tooltip: {
    //     text: 'value',
    //     trigger: 'item',
    //   },
    //   // legend: {
    //   //   show: true,
    //   //   orient: 'horizontal',
    //   //   textStyle: {},
    //   //   name: this.searchList.map(item => {
    //   //     let value;
    //   //     Object.keys(item).forEach(key => {
    //   //       if (key == 'name') {
    //   //         value = item[key];
    //   //         console.log("lable", value)
    //   //       }
    //   //     })
    //   //     return value;
    //   //   }),
    //   // },
    //   series: [
    //     {
    //       name: this.searchList.map(item => {
    //         let value;
    //         Object.keys(item).forEach(key => {

    //           if (key == 'name') {
    //             value = item[key];
    //           }
    //         })
    //         return value;
    //       }),
    //       type: 'pie',
    //       radius: ['50%'],
    //       avoidLabelOverlap: true,
    //       itemStyle: {
    //         borderRadius: 5,
    //         borderColor: '#fff',
    //         borderWidth: 1
    //       },
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'right'
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)',
    //             fontSize: '30',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: true
    //         }
    //       },
    //       data: this.searchList.map(item => {
    //         let value;
    //         Object.keys(item).forEach(key => {
    //           if (key == 'itemReceiptCount') {
    //             value = item[key];
    //           }
    //         })
    //         return value;
    //       }),
    //     }
    //   ]

    // };
    // this.Chart.setOption(option);
    // //--------------------------------------------------------------------

    // this.Chart1 = echarts.init((document.getElementById('pipe1')) as any);
    // const option1 = {
    //   title: {
    //     text: ' اجناس',
    //     left: 'center',
    //     top: '50',
    //   },
    //   tooltip: {
    //     text: 'value',
    //     trigger: 'item',
    //   },
    //   // legend: {
    //   //   orient: 'horizontal',
    //   //   bottom: '50',
    //   //   data: this.searchList.map(item => {
    //   //     let value;
    //   //     Object.keys(item).forEach(key => {
    //   //       if (key == 'name') {
    //   //         value = item[key];
    //   //       }
    //   //     })
    //   //     return value;
    //   //   }),
    //   // },
    //   series: [
    //     {
    //       name: 'report',
    //       type: 'pie',
    //       radius: ['50%'],
    //       avoidLabelOverlap: true,
    //       itemStyle: {
    //         borderRadius: 5,
    //         borderColor: '#fff',
    //         borderWidth: 1
    //       },
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'right'
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)',
    //             fontSize: '30',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: true
    //         }
    //       },
    //       data: this.searchList.map(item => {
    //         let value;
    //         Object.keys(item).forEach(key => {
    //           if (key == 'itemCount') {
    //             value = item[key];
    //           }
    //         })
    //         return value;
    //       }),
    //     }
    //   ]

    // };
    // this.Chart1.setOption(option1);
    // //------------------------------------------------------------------------

    // this.Chart2 = echarts.init((document.getElementById('pipe2')) as any);
    // const option2 = {
    //   title: {
    //     text: 'مبلغ ',
    //     left: 'center',
    //     top: '50',
    //   },
    //   tooltip: {
    //     text: 'value',
    //     trigger: 'item',
    //   },
    //   // legend: {
    //   //   orient: 'horizontal',
    //   //   bottom: '50',
    //   //   data: this.searchList.map(item => {
    //   //     let value;
    //   //     Object.keys(item).forEach(key => {
    //   //       if (key == 'name') {
    //   //         value = item[key];
    //   //       }
    //   //     })
    //   //     return value;
    //   //   }),
    //   // },
    //   series: [
    //     {
    //       name: 'report',
    //       type: 'pie',
    //       radius: ['50%'],
    //       avoidLabelOverlap: true,
    //       itemStyle: {
    //         borderRadius: 5,
    //         borderColor: '#fff',
    //         borderWidth: 1
    //       },
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'right'
    //         },
    //         emphasis: {
    //           show: true,
    //           textStyle: {
    //             shadowBlur: 10,
    //             shadowOffsetX: 0,
    //             shadowColor: 'rgba(0, 0, 0, 0.5)',
    //             fontSize: '30',
    //             fontWeight: 'bold'
    //           }
    //         }
    //       },
    //       labelLine: {
    //         normal: {
    //           show: true
    //         }
    //       },
    //       data: this.searchList.map(item => {
    //         let value;
    //         Object.keys(item).forEach(key => {
    //           if (key == 'priceTotal') {
    //             value = item[key];
    //           }
    //         })
    //         return value;
    //       }),
    //     }
    //   ]

    // };
    // this.Chart2.setOption(option2);
  }






}
