import { ModuleConstants } from './../../../../environments/environment';
import { StorageService } from './../../../core/auth/_services/storage.service';
import { MenuHorizontalService } from './../../../core/_base/layout/services/menu-horizontal.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'kt-configuration',
	templateUrl: './configuration.component.html',
	styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

	constructor(
		private menu: MenuHorizontalService,
		private storage: StorageService
	) { }

	ngOnInit() {
		this.storage.setCurrentModule(ModuleConstants.Configuration);
		this.menu.loadMenu();
	}

}
