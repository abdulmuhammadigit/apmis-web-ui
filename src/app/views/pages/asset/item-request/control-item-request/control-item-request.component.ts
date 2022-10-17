import { UploadFileService } from './../../../services/document/upload-file.service';
import { ProcessEntity, SectionConstants } from './../../../../../../environments/environment';
import { ProcessTrackingService } from './../../../services/process-tracking/process-tracking.service';
import { ItemRequestDetailService } from './../../../services/asset/item-request/item-request-detail.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BehaviorSubject, of, Subject } from "rxjs";
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';
import { LookListService } from '../../../services/asset/look/look-list.service';
import { SearchItemDetailComponent } from '../../item/search-item-detail/search-item-detail.component';
import { DatePickerComponent } from 'ng2-jalali-date-picker';
import { DatePickerService } from '../../../services/datepicker/date-picker.service';
import { PrintItemRequestComponent } from '../print-item-request/print-item-request.component';
import { SearchItemRemainComponent } from '../search-item-remain/search-item-remain.component';
import { EmployeeAllocatedItemsModalComponent } from '../../../report/asset/employee-allocated-items-modal/employee-allocated-items-modal.component';


@Component({
  selector: 'kt-control-item-request',
  templateUrl: './control-item-request.component.html',
  styleUrls: ['./control-item-request.component.scss']
})
export class ControlItemRequestComponent implements OnInit {

  closeResult: string;
  modalOptions: NgbModalOptions;
  data;

  id: Subject<number>;
  hideDetail: boolean = true;
  result: Subject<any>;
  requestForm: FormGroup;
  detailsModel: FormArray;
  formTitle: string;
  miladiNgModel: string;
  shamsiNgModel: string;
  public Editor = ClassicEditor;
  public employeeDetailsList = [];
  unitType: any[];
  btnDisabled: boolean = true;
  isChecked: boolean = true;


  @ViewChild('shamsiDate', { static: false }) shamsiDate: DatePickerComponent;
  @ViewChild('date', { static: false }) date: DatePickerComponent;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private itemRequestService: ItemRequestService,
    private itemRequestDetailService: ItemRequestDetailService,
    private lookListService: LookListService,
    private cdf: ChangeDetectorRef,
    public dateService: DatePickerService,
    private notify: NotificationService,
    private processTrackingService: ProcessTrackingService,
    private uploadService: UploadFileService) {
    this.id = new BehaviorSubject(0);
    this.result = new Subject<any>();
    this.formTitle = "ثبت فورم درخواستی ";
    this.initializeForm();
  }
  // calendar section
  setShamsiDate(date: any) {
    let gDate: String = date + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let shamsiDate = this.dateService.toShamsiDate(date);
      if (this.requestForm.get('shamsiDate').value != shamsiDate)
        this.requestForm.get('shamsiDate').setValue(shamsiDate);
    }
  }

  setGregorianDate(shamsiDate: any) {
    let gDate: String = shamsiDate + "";
    if (gDate.match(/^\d{4}\-\d{1,2}\-\d{1,2}$/)) {
      let date = this.dateService.toGregorianDate(shamsiDate);
      if (this.requestForm.get('date').value != date)
        this.requestForm.get('date').setValue(date);
    }
  }

  ngOnInit() {
    this.getUnitType();
    this.findData();
    this.detailsModel.clear();
    this.processTrackingService.clear();
  }

  //form initialization
  initializeForm() {
    this.requestForm = this.fb.group({
      id: [''],
      code: [{ value: '', disabled: true }],
      employeeText: [{ value: '', disabled: true }],
      employeeId: [{ value: '', disabled: true }],
      department: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      date: [{ value: '', disabled: true }],
      shamsiDate: [{ value: '', disabled: true }],
      detailsModel: this.fb.array([this.createDetailItem()])
    });
    this.detailsModel = this.requestForm.get('detailsModel') as FormArray;
  }

  // these three funtions are used in form arrays
  createDetailItem(): FormGroup {
    return this.fb.group({
      id: [''],
      itemRequestId: [''],
      itemDetailId: [{ value: '', disabled: true }],
      itemDetailText: [{ value: '', disabled: true }],
      unitId: [{ value: '', disabled: true }],
      quantity: [{ value: '', disabled: true }],
      description: [''],
      notExistItem: [''],
      requestControlPage: ['']
    });
  }
  addItem() {
    this.detailsModel.push(this.createDetailItem());
  }
  //look section

  getUnitType() {
    this.lookListService.getUnitList().subscribe((res) => {
      this.unitType = res;
      this.cdf.detectChanges();
    })
  }
  //utility
  cancelClick() {
    this.result.next(-1);
  }
  ngAfterViewInit() {
    this.dateService.initCalendar();
  }

  isControlHasError(controlName, type) {
    const control = this.requestForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

  isDetailControlHasError(controlName, type, index) {
    const controls = this.detailsModel.controls[index] as FormGroup;
    const control = controls.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

  //operations

  searchItemDetail(index) {
    const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'lg' });

    modalRef.result.then((result) => {
      if (result) {
        this.detailsModel.at(index).patchValue({
          itemDetailId: result.id,
          itemDetailText: result.detail
        });
      }
    })
  }
  searchEmployeeAllocatedItems() {
    const modalRef = this.modalService.open(EmployeeAllocatedItemsModalComponent, { size: 'lg' });
    let employeeId = (this.requestForm.get('employeeId').value)
    modalRef.componentInstance.employeeId = employeeId;
  }
  printItemRequest() {
    const modalRef = this.modalService.open(PrintItemRequestComponent, { size: 'lg' });
    let id = (this.requestForm.get('id').value)
    modalRef.componentInstance.id.next(id);
  }



  submitDetail(index) {

    const controls = this.detailsModel.controls[index] as FormGroup;
    /** check form */
    if (controls.invalid) {
      Object.keys(controls.controls).forEach(controlName =>
        controls.controls[controlName].markAsTouched()
      );
      return;
    }


    let record = this.detailsModel.getRawValue()[index];
    record.itemRequestId = this.requestForm.get('id').value;
    record.requestControlPage = true;
    this.itemRequestDetailService.save(record).subscribe({
      next: data => {
        if (data.successful) {
          this.notify.success("معلومات موفقانه ثبت گردید!");
          this.detailsModel.at(index).patchValue({
            id: data.data.id,
            itemReqestId: data.data.itemRequestId,
            itemDetailId: data.data.itemDetailId,
            itemDetailText: data.data.itemDetailText,
            unitId: data.data.unitId,
            quantity: data.data.quantity,
            description: data.data.description,
            notExistItem: data.data.notExistItem
          });
          this.cdf.markForCheck();
          this.btnDisabled = false;
        }
      },
      error: er => {
        this.notify.error(er);
      }
    });
  }

  findData() {
    // this code is used for control data
    this.id.subscribe(next => {
      if (next != 0) {
        this.formTitle = 'بررسی درخواستی';
        this.itemRequestService.findById({ id: next }).subscribe({
          next: val => {
            if (val.successful) {

              this.processTracking(val.data.id, val.data.stageId)
              this.uploadFile(val.data.id)

              this.data = val;
              this.requestForm.patchValue({
                id: val.data.id,
                code: val.data.code,
                documentNumber: val.data.documentNumber,
                date: val.data.date,
                employeeId: val.data.employeeId,
                employeeText: val.data.employeeText,
                description: val.data.description,
                department: val.data.department
              });
              this.detailsModel.clear();
              val.data.detailModelList.map((item) => {
                let formArray = this.createDetailItem();
                formArray.patchValue(item);
                this.detailsModel.push(formArray);
              })
              this.cdf.detectChanges();
              this.cdf.markForCheck();
              this.hideDetail = false;
            }
          },
          error: err => {
            this.notify.error(err);
          }
        })
      }
    });
  }

  removeDetailItem(index) {
    this.notify.confirm({
      message: 'آیا مطمئن هستید که معلومات حذف شود?',
      ok: event => {
        let record = (this.requestForm.get('detailsModel').value)[index];
        if (record.id == "" || record.id == 0) {
          this.detailsModel.removeAt(index);
          this.cdf.markForCheck();
        } else {
          this.itemRequestDetailService.delete({ id: record.id }).subscribe({
            next: val => {
              if (val.successful) {
                this.notify.success("معلومات موفقانه حذف گردید!");
                this.detailsModel.removeAt(index);
                this.cdf.markForCheck();
              }
            },
            error: err => {
              this.notify.error(err);
            }
          })
        }
      }
    })

  }
  newRecord() {
    this.hideDetail = true;
    this.processTrackingService.clear();
    this.requestForm.reset();
    this.detailsModel.clear();
  }

  processTracking(recordId: number, currentStageId: number) {
    this.processTrackingService.setRecordId(recordId);
    this.processTrackingService.setClassificationId(null);
    this.processTrackingService.setEntity(ProcessEntity.ItemRequest);
    this.processTrackingService.setCurrentStageId(currentStageId);
  }

  uploadFile(recordId: number) {
    this.uploadService.setRecordId(recordId);
    this.uploadService.setSectionId(SectionConstants.ItemRequest);
  }

  searchItemRemain(index) {
    const modalRef = this.modalService.open(SearchItemRemainComponent, { size: 'lg' });
    let itemDetailId = this.detailsModel.at(index).get("itemDetailId").value;
    modalRef.componentInstance.itemDetailId = itemDetailId;

    modalRef.result.then((result) => {
      if (result) {
        // this.detailsModel.at(index).patchValue({
        //   itemDetailId: result.id,
        //   itemDetailText: result.detail,
        // });
      }
    }
      , (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
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

  onCheckboxChange(e) {
    if (e.target.checked) {

      this.isChecked;
    } else {
      this.isChecked = false;

    }
  }


}
