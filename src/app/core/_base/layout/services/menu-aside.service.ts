// Angular
import { Inject, Injectable } from '@angular/core';
// RxJS
import { BehaviorSubject } from 'rxjs';
// Object path
import * as objectPath from 'object-path';
// Services
import { MenuConfigService } from './menu-config.service';
import { BASE_API_URL, SIDE_MENU_OPERATION } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as cleaner from 'clean-deep'
import { StorageService } from '../../../../core/auth/_services/storage.service';

@Injectable()
export class MenuAsideService {
	// Public properties
	menuList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	// menuItems: any[];
	/**
	 * Service constructor
	 *
	 * @param menuConfigService: MenuConfigService
	 */
	constructor(
		private menuConfigService: MenuConfigService,
		private storage: StorageService,
		//private menuConfigService: MenuConfigService
	) {
		this.loadMenu();
	}

	loadMenu() {
		this.menuList$.next(this.storage.getUserModules());
	}
}
