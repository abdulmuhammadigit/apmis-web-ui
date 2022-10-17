// Angular
import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { BASE_API_URL, TOP_MENU_OPERATION } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { isDataSource } from '@angular/cdk/collections';
import * as cleaner from 'clean-deep'
import { StorageService } from '../../../../core/auth/_services/storage.service';
import { SubheaderService } from './subheader.service';

//import * as cleanDeep from 'clean-deep'
@Injectable()
export class MenuHorizontalService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	/**
	 * Service constructor
	 *
	 * @param storage
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(
		private storage: StorageService,
		private menuConfigService: MenuConfigService,
		private subheaderservice: SubheaderService
	) {
		this.loadMenu();

	}

	/**
	 * Load menu list
	 */
	loadMenu() {
		let menuItems: any[];
		menuItems = this.storage.getMenus();
		this.menuList$.next(menuItems);
	}
}
