import { StatusObjectName, StatusCategory, StatusMapped } from './../../../../../../environments/environment';
import { notice } from '@pnotify/core';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ItemDistributedService } from './../../../services/asset/item-distribution/item-distributed.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { NgModule } from '@angular/core';
import { LookListService } from '../../../../../views/pages/services/asset/look/look-list.service';
import { SearchEmployeeComponent } from '../../../configuration/hr/employee/search-employee/search-employee.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { ItemReallocationDetailService } from '../../../services/asset/item-reallocation/item-reallocation-detail.service';

@Component({
	selector: 'kt-item-reallocate-specification',
	templateUrl: './item-reallocate-specification.component.html',
	styleUrls: ['./item-reallocate-specification.component.scss']
})
export class ItemReallocateSpecificationComponent implements OnInit {
	@Input() public itemReallocationDetailId;
	@Output() itemSpecificationEvent = new EventEmitter<any>();
	itemDistributionDetailId: Subject<number>;
	result: any;
	editable: boolean;
	formTitle: string;
	public itemStatusList = [];
	itemReallocationId: any;
	btnEmployeeDisable = [];

	itemReceiptSpecificationSearchForm: FormGroup;
	itemReceiptSpecificationList: FormArray;
	public specificationIdList = [];
	public statusList = [];

	initializaForm() {
		this.itemReceiptSpecificationSearchForm = this.formBuilder.group({
			itemDistributionDetailId: [''],

			itemReceiptSpecificationList: this.formBuilder.array([]),
		});
		this.itemReceiptSpecificationList = this.itemReceiptSpecificationSearchForm.get('itemReceiptSpecificationList') as FormArray;
	}
	createItem(): FormGroup {
		return this.formBuilder.group({
			id: [''],
			code: '',
			receiveDate: '',
			name: '',
			lastName: '',
			fatherName: '',
			itemReceiptTypeText: '',
			item: '',
			itemDetail: '',
			unitText: '',
			price: '',
			itemSpecificationId: '',
			itemDistributedSpecificationId: '',
			serialNumber: '',
			tagNumber: '',
			location: '',
			expirationDate: '',
			statusId: '',
			employeeText: '',
			toEmployeeId: '',
			toEmployeeText: '',
			itemReallocationDetailId: ''
		});
	}

	constructor(
		private formBuilder: FormBuilder,
		private ItemDistributedService: ItemDistributedService,
		private itemReallocationDetailService: ItemReallocationDetailService,
		private LookListService: LookListService,
		private changeDetectorRef: ChangeDetectorRef,
		private notify: NotificationService,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal
	) {
		this.itemDistributionDetailId = new BehaviorSubject(0);
		this.formTitle = " مشخصات جنس ";
		this.initializaForm();
	}

	ngOnInit() {
		console.log("itemReallocationDetailId", this.itemReallocationDetailId);
		this.findData();
		this.getStatusList();
	}

	getStatusList() {
		this.LookListService.getStatusList({ dbObject: StatusObjectName.ItemReallocationDetail, category: StatusCategory.ReallocationCategory }).subscribe((res) => {
			this.statusList = res.data;
			this.changeDetectorRef.detectChanges();
		})
	}

	findData() {

		this.itemDistributionDetailId.subscribe(next => {
			if (next != 0) {
				this.itemReallocationDetailService.searchDistributedSpecification({ itemDistributionDetailId: next }).subscribe({
					next: val => {
						if (val.successful) {
							const length = val.data.length;
							if (length > 0) {
								this.formTitle = "ویرایش مشخصات اجناس";
								val.data.map((item) => {
									let formArray = this.createItem();
									formArray.patchValue(item);
									formArray.patchValue({
										employeeText: item.name + ' "' + item.lastName + '"  فرزند  ' + item.fatherName,
									});
									this.itemReceiptSpecificationList.push(formArray);
									for (let l of val.data) {
										this.btnEmployeeDisable.push(true);
									}
								})
								this.changeDetectorRef.markForCheck();
							}
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});

	}


	// searchEmployee(value, index) {
	//   if (value.id == 4) {
	//     const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
	//     modalRef.result.then((result) => {
	//       if (result) {
	//         console.log("result", result)
	//         this.itemReceiptSpecificationList.at(index).patchValue({
	//           employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
	//           toEmployeeId: result.id,
	//         });
	//       }
	//     });
	//   }
	//   return;
	// }
	searchEmployee(index) {
		const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				this.itemReceiptSpecificationList.at(index).patchValue({
					toEmployeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
					toEmployeeId: result.id,
				});
			}
		});
	}

	submit(index) {
		let data = this.itemReceiptSpecificationSearchForm.get('itemReceiptSpecificationList').value[index];
		let record: any = {};
		record.id = data.id;
		record.itemDistributedSpecificationId = data.itemDistributedSpecificationId;
		record.itemReallocationDetailId = this.itemReallocationDetailId;
		const formArray = this.itemReceiptSpecificationList.controls[index];
		record.toEmployeeId = formArray.get('toEmployeeId').value;
		record.statusId = formArray.get('statusId').value;
		this.itemReallocationDetailService.saveToEmployee(record).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
				}
			},
			error: er => {
				this.notify.error(er);
				this.changeDetectorRef.markForCheck();
			}
		});
	}
	selectItemSpecifiction() {
		// this.itemSpecificationEvent.emit(this.specificationIdList);
		// this.result = this.specificationIdList;
		// this.activeModal.close(this.btnDisabled = false);

	}

	enableEmployee(index) {
		let data = this.itemReceiptSpecificationSearchForm.get('itemReceiptSpecificationList').value[index];
		if (data.statusId == StatusMapped.ToEmployeeReallocation) {
			this.btnEmployeeDisable[index] = false;
		}
		else {
			this.btnEmployeeDisable[index] = true;
		}
	}


}
