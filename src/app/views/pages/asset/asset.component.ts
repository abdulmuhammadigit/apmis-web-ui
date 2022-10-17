import { ModuleConstants } from './../../../../environments/environment';
import { StorageService } from './../../../core/auth/_services/storage.service';
import { MenuHorizontalService } from './../../../core/_base/layout/services/menu-horizontal.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'kt-asset',
	templateUrl: './asset.component.html',
	styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

	constructor(
		private menu: MenuHorizontalService,
		private storage: StorageService
	) { }

	ngOnInit() {
		if (this.storage.setCurrentModule(ModuleConstants.Asset)) {
			this.menu.loadMenu();
		}
	}

}
