import { NotificationService } from './../../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ComponentBase } from "../../../../../../core/_base/layout/components/component-base";
import { EmployeeService } from './../../../../services/asset/hr/employee.service';
import { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { ComponentHostDirective } from '../../../../../../core/_base/layout/directives/component-host.directive';

@Component({
	selector: 'kt-search-employee-list',
	templateUrl: './search-employee-list.component.html',
	styleUrls: ['./search-employee-list.component.scss']
})
export class SearchEmployeeListComponent implements OnInit {


	id: Subject<number>;
	editable: boolean;
	searchEmployeeForm: FormGroup;
	employeeSearchList: Array<any>;
	onOperation: boolean = false;
	@ViewChild(ComponentHostDirective, { static: false })
	host: ComponentHostDirective;


	constructor(
		private fb: FormBuilder,
		private employeeSerive: EmployeeService,
		private creator: ComponentBase<CreateEmployeeComponent>,
		private cdf: ChangeDetectorRef,
		private notify: NotificationService
	) { }

	ngOnInit() {

		this.employeeSearchList = [];

		this.searchEmployeeForm = this.fb.group({
			code: '',
			name: '',
			lastName: '',
			fatherName: ''
		})
	}
	createEmployee() {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateEmployeeComponent, this.host);
		this.cdf.markForCheck();
		comp.instance.result.subscribe(nex => {
			this.onOperation = false;
			comp.destroy()
		});
	}

	editEmployee(id) {
		this.onOperation = true;
		const comp = this.creator.Construct(CreateEmployeeComponent, this.host);
		comp.instance.result.subscribe(nex => {
			if (nex == 1) {
				this.searchEmployee();
			}
			this.onOperation = false;
			comp.destroy()
		});
		comp.instance.id.next(id);
	}

	searchEmployee() {
		if (this.searchEmployeeForm.valid) {
			this.employeeSerive.search(this.searchEmployeeForm.value)
				.subscribe({
					next: (e: any) => {
						if (e.length < 1) {
							this.notify.error("معلومات دریافت نگردید!");
						}
						this.employeeSearchList = e.data;
						this.cdf.markForCheck();
					},
					error: err => {
						this.notify.error(err);
					}
				});
		}
	}

}
