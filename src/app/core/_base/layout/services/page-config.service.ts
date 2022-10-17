import { BaseService } from './../../crud/service/base-service.service';
// Angular
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
// RxJS
import { BehaviorSubject, Subject } from 'rxjs';
// Object-Path
import * as objectPath from 'object-path';
// Lodash
import { merge } from 'lodash';
import { BASE_API_URL, TOP_MENU_OPERATION } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as cleaner from 'clean-deep'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { element } from 'protractor';

@Injectable()
export class PageConfigService extends BaseService {
	// Public properties
	onConfigUpdated$: Subject<any>;
	pageConfig: any;

	pageList$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service Constructor
	 *
	 * @param router: Router
	 */
	constructor(
		private router: Router,
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(TOP_MENU_OPERATION) opsUrl: string,
		http: HttpClient,

	) {
		super(baseUrl, opsUrl, http);
		// register on config changed event and set default config
		this.onConfigUpdated$ = new Subject();
	}

	/**
	 * Get current page config based on route
	 */
	getCurrentPageConfig(path?: string): any {
		let configPath = this.cleanUrl(this.router.url);
		if (path) {
			configPath += '.' + path;
		}

		//console.log(this.pageConfig);
		// get page config by path
		return objectPath.get(this.pageConfig, configPath);
	}

	/**
	 * Set existing config with a new value
	 * @param value: any
	 * @param sav: boolean?
	 */
	setConfig(value: any, save?: boolean): void {
		this.pageConfig = merge(this.pageConfig, value);

		if (save) {
			// not implemented
		}

		// fire off an event that all subscribers will listen
		this.onConfigUpdated$.next(this.pageConfig);
	}

	/**
	 * Load confgis
	 *
	 * @param config: any
	 *
	 */
	loadConfigs(config: any) {
		// this.pageConfig = config;
		// this.onConfigUpdated$.next(this.pageConfig);

		// get menu list
		// let rawData: any[];// = objectPath.get(this.menuConfigService.getMenus(), 'header.items');
		// let menuItems:any[];

		// this.getList({}).subscribe({
		// 	next:val => {
		// 		rawData = val.data;
		// 		menuItems = cleaner.default(rawData);

		// 		// set current configuration from DB datasource
		// 		config = this.structureConfigs(menuItems);
		// 		console.log(config);
		// 		this.pageConfig = config;

		// 		this.onConfigUpdated$.next(this.pageConfig);
		// 		console.log(this.pageConfig);
		// 	},
		// 	error:er => {
		// 		console.log('ERROR');
		// 	}
		// });

	}

	structureConfigs(obj: any): any {
		let structuredConfiguration = {};
		obj.forEach(element => {
			if (!element.submenu) {
				structuredConfiguration[element.abbr] = {
					page: {
						title: element.title,
						desc: element.description
					}
				}
			}
			else {
				structuredConfiguration[element.abbr] = this.structureConfigs(element.submenu);
			}
		});
		return structuredConfiguration;
	};


	/**
	 * Remove unnecessary params from URL
	 * @param url
	 */
	cleanUrl(url: string): string {
		// remove first route (demo name) from url router
		if (new RegExp(/^\/demo/).test(url)) {
			const urls = url.split('/');
			urls.splice(0, 2);
			url = urls.join('/');
		}

		if (url.charAt(0) == '/') {
			url = url.substr(1);
		}

		// we get the page title from config, using url path.
		// we need to remove query from url ?id=1 before we use the path to search in array config.
		let finalUrl = url.replace(/\//g, '.');
		if (finalUrl.indexOf('?') !== -1) {
			finalUrl = finalUrl.substring(0, finalUrl.indexOf('?'));
		}

		return finalUrl;
	}
}
