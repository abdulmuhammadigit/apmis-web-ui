import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { SearchItemDetailComponent } from '../../../item/search-item-detail/search-item-detail.component';
import { IsdModalComponent } from '../../../../../../core/_base/layout/components/isd-modal/isd-modal.component';
import { ModalConfig } from '../../../../../../core/_config/modal.config';
@Component({
  selector: 'kt-item-request-details',
  templateUrl: './item-request-details.component.html',
  styleUrls: ['./item-request-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemRequestDetailsComponent implements OnInit {
  itemDetailsForm: FormGroup;
  unitType: any[];
  @ViewChild('searchItemModal') private searchItemModalComponent: IsdModalComponent;
  searchItemModalConfig: ModalConfig;

  modal: any;

  	itemExistList = [
		{value:true, text:"موجود است"},
		{value:false, text:"موجود نیست"}		
	];

  constructor(
    private lookListService: LookListService,
    private formBuilder: FormBuilder,
    private cdf: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getUnitType();

    this.searchItemModalConfig = {
      modalTitle: 'فهرست عمومی اجناس',
      size: 'xl'
    };
  }

  searchItemList() {

    this.modal = this.searchItemModalComponent.open()

    // const modalRef = this.modalService.open(SearchItemDetailComponent, { size: 'xl' });
    // modalRef.componentInstance.searchType = 2;
    // modalRef.result.then((result) => {
    //   if (result) {
    //     // this.detailsModel.at(index).patchValue({
    //     //   itemDetailId: result.id,
    //     //   itemDetailText: result.detail
    //     // });
    //   }
    // })
  }

  itemSelected(item) {
    console.log("Selected Item :", item);
    this.itemDetailsForm.patchValue({
      itemDetailId: item.id,
      itemDetailText: item.title
    });
    this.modal.dismiss();
  }


  isDetailControlHasError(controlName, type, index) {
    // const controls = this.detailsModel.controls[index] as FormGroup;
    // const control = controls.controls[controlName];
    // if (!control) {
    //   return false;
    // }
    // return control.hasError(type) && (control.dirty || control.touched);
  }

  getUnitType() {
    this.lookListService.getUnitList().subscribe((res) => {
      this.unitType = res;
      this.cdf.detectChanges();
    })
  }


  initializeForm() {
    this.itemDetailsForm = this.formBuilder.group({
      id: [''],
      itemRequestId: [''],
      itemDetailId: ['', Validators.required],
      itemDetailText: ['', Validators.required],
      unitId: ['', Validators.required],
      quantity: ['', Validators.required],
      description: '',
      notExistItem: [{ value: '' }],
      isRequestControlPage: false
    });
  }


}
