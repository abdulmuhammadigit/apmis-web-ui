import { UserService } from './../../../../services/security/user.service';
import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { EmployeeService } from './../../../../services/asset/hr/employee.service';
import { StockKeeperService } from './../../../../services/asset/hr/stock-keeper.service';
import { LookListService } from '../../../../services/asset/look/look-list.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchEmployeeComponent } from '../../employee/search-employee/search-employee.component';


@Component({
	selector: 'kt-create-stock-keeper',
	templateUrl: './create-stock-keeper.component.html',
	styleUrls: ['./create-stock-keeper.component.scss']
})
export class CreateStockKeeperComponent implements OnInit {
	closeResult: string;
	modalOptions: NgbModalOptions;
	public categoryList: Array<any>;
	id: Subject<number>;
	editable: boolean;
	stockKeeperForm: FormGroup;
	result: Subject<any>;
	category = [];
	location = [];
	keeperType = [];
	userList = [];
	public employeeDetailsList = [];
	formTitle: string;

	constructor(
		private fb: FormBuilder,
		private notify: NotificationService,
		private stockKeeperService: StockKeeperService,
		private lookListService: LookListService,
		private employeeService: EmployeeService,
		private userService: UserService,
		private cdf: ChangeDetectorRef,
		private modalService: NgbModal,
	) {

		this.id = new BehaviorSubject(0);
		this.userList = [];
		this.editable = false;
		this.result = new Subject<any>();
		this.formTitle = "ثبت معتمد تحویلخانه ";
		this.result = new Subject<any>();
		this.initializeForm();
	}


	initializeForm() {
		this.stockKeeperForm = this.fb.group({
			id: '',
			employeeId: ['', Validators.required],
			employeeText: ['', Validators.required],
			stockKeeperTypeId: ['', Validators.required],
			categoryList: ['', Validators.required],
			locationId: ['', Validators.required],
			userId: ['', Validators.required]
		});
	}

	cancelClick() {
		this.result.next(-1);
	}

	async LocationList() {

		this.location = await this.lookListService.getLocationList().toPromise();

	}
	// async categoryList() {

	// 	this.category = await this.lookListService.getCategoryList().toPromise();

	// }
	skCategoryList() {
		this.lookListService.getCategoryList().subscribe(val => {
			this.categoryList = val;
		});
	}


	async stockKeeperTypeList() {

		this.keeperType = await this.lookListService.getStockKeeperTypeList().toPromise();
	}

	async getUserList() {

		var rs = await this.userService.search({}).toPromise();
		this.userList = rs.data;

	}

	newForm() {
		this.stockKeeperForm.reset()
	}

	isControlHasError(controlName, type) {
		const control = this.stockKeeperForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

	selectEmployee() {
		const modalRef = this.modalService.open(SearchEmployeeComponent, { size: 'lg' });
		modalRef.result.then((result) => {
			if (result) {
				this.stockKeeperForm.patchValue({
					employeeText: result.name + ' "' + result.lastName + '"  فرزند  ' + result.fatherName,
					employeeId: result.id,
				});
				// const emp = ({ index: index, id: result.id });
				// this.employeeDetailsList.push(emp);
			}
		}).catch(err => {
		})
	}

	async ngOnInit() {

		await this.LocationList();
		// await this.categoryList();
		this.skCategoryList();
		await this.stockKeeperTypeList();
		await this.getUserList();

		this.id.subscribe(next => {
			if (next != 0) {
				this.formTitle = "ویرایش اداره";
				this.stockKeeperService.findById({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.stockKeeperForm.patchValue({
								id: val.data.id,
								employeeId: val.data.employeeId,
								employeeText: val.data.name + ' "' + val.data.lastName + '"  فرزند  ' + val.data.fatherName,
								stockKeeperTypeId: val.data.stockKeeperTypeId,
								categoryList: val.data.categoryList,
								locationId: val.data.locationId,
								userId: val.data.userId
							});

							this.cdf.detectChanges();
							this.cdf.markForCheck();
							this.editable = true;
						}
					},
					error: err => {
						this.notify.error(err);
					}
				})
			}
		});
	}


	submit() {

		const controls = this.stockKeeperForm.controls;
		/** check form */
		if (this.stockKeeperForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.stockKeeperService.save(this.stockKeeperForm.value).subscribe({
			next: val => {
				if (val.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
					this.stockKeeperForm.patchValue({
						id: val.data.id,
						employeeId: val.data.employeeId,
						employeeText: val.data.name + ' "' + val.data.lastName + '"  فرزند  ' + val.data.fatherName, stockKeeperTypeId: val.data.stockKeeperTypeId,
						categoryList: val.data.categoryList,
						locationId: val.data.locationId,
						userId: val.data.userId
					});
					this.cdf.markForCheck();
					this.editable = true;
				}
			},
			error: er => {
				this.notify.error(er);
				this.cdf.markForCheck();
			}
		});

	}

}
