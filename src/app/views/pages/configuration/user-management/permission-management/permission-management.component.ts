import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../services/security/role.service';
import { PageService } from '../../../services/security/page.service';
import { RolePageService } from '../../../services/security/role-page.service';
import { TemplateAccessibilityValidAriaRule } from 'codelyzer';
import { RolePageEntityPermissionService } from '../../../services/security/role-page-entity-permission.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePagePermissionComponent } from '../create-page-permission/create-page-permission.component';

@Component({
	selector: 'kt-permission-management',
	templateUrl: './permission-management.component.html',
	styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {

	searchForm: FormGroup;
	searchResultList: Array<any>;
	permissionList: any;
	rolesList: any = [];
	pagesList: any = [];

	constructor(
		private fb: FormBuilder,
		private cdr: ChangeDetectorRef,
		private notifier: NotificationService,
		private roleService: RoleService,
		private pageService: PageService,
		private rolePagesService: RolePageService,
		private modal: NgbModal
	) { }

	async ngOnInit() {
		this.searchForm = this.fb.group({
			roleId: [null, Validators.required],
			pageIds: [[]]
		});

		let rResult = await this.roleService.getList({}).toPromise();
		if (rResult.successful) {
			this.rolesList = rResult.data;
		}

		let pResult = await this.pageService.getList({}).toPromise();
		if (pResult.successful) {
			let childes = pResult.data.filter(e => e.parentId != null);
			let parents = pResult.data.filter(e => e.parentId == null);
			let rs = [];
			childes.forEach(cur => {
				let par = parents.filter(e => e.id == cur.parentId)[0];
				cur.parent = par.title;
				rs.push(cur);
			});
			this.pagesList = rs;
		}

		this.cdr.detectChanges();

	}

	create() {

	}

	edit(id: number) {
		let model = this.modal.open(CreatePagePermissionComponent, {
			centered: true,
			size: "lg"
		});
		model.componentInstance.recordId$.next(id);
	}

	save() {
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.rolePagesService.save(this.searchForm.value)
			.subscribe(next => {
				if (next.successful) {
					this.notifier.success("Permissions Saved Successfully!");
					this.loadRolePagePermissions();
				}
			})
	}

	loadRolePages() {
		let role = this.searchForm.controls['roleId'];
		if (role.valid) {
			this.rolePagesService.search({
				roleId: role.value
			}).subscribe(next => {
				if (next.successful) {
					this.searchForm.controls['pageIds'].patchValue(next.data.map(e => e.pageId));
				}
			});
		}
		else {
			this.searchForm.controls['pageIds'].patchValue([]);
		}
	}

	loadRolePagePermissions() {
		const control = this.searchForm.controls['roleId'];
		this.rolePagesService.getList({ roleId: control.value })
			.subscribe(next => {
				if (next.successful) {
					this.permissionList = next.data;
					this.cdr.detectChanges();
				}
			});
	}

	isControlHasError(controlName, type) {
		const control = this.searchForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}


}
