import { ModuleConstants } from './../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { MenuHorizontalService } from '../../../core/_base/layout';
import { StorageService } from '../../../core/auth/_services';

@Component({
	selector: 'kt-audit',
	templateUrl: './audit.component.html',
	styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {

	constructor(
		private menuHorizontal: MenuHorizontalService,
		private storage: StorageService
	) { }

	ngOnInit() {
		this.storage.setCurrentModule(ModuleConstants.Report);
		this.menuHorizontal.loadMenu();
	}

}
