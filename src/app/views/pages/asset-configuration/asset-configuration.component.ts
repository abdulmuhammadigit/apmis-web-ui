import { ModuleConstants } from './../../../../environments/environment';
import { StorageService } from './../../../core/auth/_services/storage.service';
import { MenuHorizontalService } from './../../../core/_base/layout/services/menu-horizontal.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'kt-asset-configuration',
	templateUrl: './asset-configuration.component.html',
	styleUrls: ['./asset-configuration.component.scss']
})
export class AssetConfigurationComponent implements OnInit {

	constructor(
		private menuHorizontal: MenuHorizontalService,
		private storage: StorageService
	) { }

	ngOnInit() {
		// this.storage.setCurrentModule(ModuleConstants.Asset);
		// this.menuHorizontal.loadMenu();
	}
}
