import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuditService } from '../../services/audit/audit.service';
import { EntityService } from '../../services/security/entity.service';


@Component({
	selector: 'kt-customer-list',
	templateUrl: './snapshots.component.html',
	styleUrls: ['./snapshots.component.scss']
})
export class SnapshotsComponent implements OnInit {

	searchForm: FormGroup;
	searchResultList: Array<any>;
	snapshotsResultList: Array<any>;
	onOperation: boolean = false;
	coaList: any;
	selectedEntity: string;
	JSON;
	entityList: any;

	constructor(
		private fb: FormBuilder,
		private auditService: AuditService,
		private entityService: EntityService,
		private cdr: ChangeDetectorRef) {
		this.JSON = JSON;
	}

	async ngOnInit() {
		this.searchForm = this.fb.group({
			entity: ['', Validators.required],
			entityId: ['', Validators.required],
		});
		let ret = await this.entityService.getList({}).toPromise();
		if (ret.successful) {
			this.entityList = ret.data.map(cur => {
				return { id: cur.path, title: cur.title }
			});
		}
	}

	search() {
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		//this.selectedEntity = this.entityList.find(i => i.value === this.searchForm.get('entity').value).name;
		let val = this.searchForm.value;
		val.entityId = JSON.parse(val.entityId);
		this.auditService.search(this.searchForm.value).subscribe({
			next: v => {
				if (v.successful) {
					this.snapshotsResultList = JSON.parse(v.data);
					this.cdr.markForCheck();
				}
			}
		})
	}

	isControlHasError(controlName, type) {
		const control = this.searchForm.controls[controlName];
		if (!control) {
			return false;
		}
		return control.hasError(type) && (control.dirty || control.touched);
	}

}
