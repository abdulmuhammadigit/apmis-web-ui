import { Injectable } from '@angular/core';
// import { USER_OPERATION } from 'src/environments/environment.prod';

let TOKEN_KEY = 'USER_AUTH_T';
let USER_KEY = 'CURRENT_LOGGED_USER';

let USER_MODULES = 'USER_MODULES';
let CURRENT_MODULE = 'CURRENT_MODULE';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	currentModuleId = -1;
	activeMenuId = -1;

	getMenus() {
		if (this.currentModuleId == -1) {
			return {};
		}
		const modules = this.getUserModules();
		let menus = modules.find(el => el.id == this.currentModuleId).menus;
		return menus;
	}

	getSubMenus() {
		if (this.activeMenuId == -1) {
			return {};
		}
		const menu = this.getMenus();
		let submenu = menu.find(el => el.id == this.activeMenuId).submenu;
		return submenu;
	}

	setCurrentModule(moduleId) {
		if (this.currentModuleId === moduleId) {
			return false;
		}
		else {
			this.currentModuleId = moduleId;
			return true;
		}
	}

	setActiveMenu(menuId) {
		this.activeMenuId = menuId;
	}


	setUserModules(modules) {
		console.log(JSON.stringify(modules));
		window.localStorage.setItem(USER_MODULES, JSON.stringify(modules));
	}

	public getUserModules() {
		return JSON.parse(localStorage.getItem(USER_MODULES));
	}

	isUserLoggedIn(): boolean {
		let t = window.localStorage.getItem(TOKEN_KEY);
		return t != null;
	}

	signOut() {
		window.localStorage.clear();
	}

	public saveToken(token: string) {
		window.localStorage.removeItem(TOKEN_KEY);
		window.localStorage.setItem(TOKEN_KEY, token);
	}

	public getToken(): string {
		return localStorage.getItem(TOKEN_KEY);
	}

	public saveUser(user) {
		window.localStorage.removeItem(USER_KEY);
		window.localStorage.setItem(USER_KEY, JSON.stringify(user));
	}

	public getUser() {
		return JSON.parse(localStorage.getItem(USER_KEY));
	}
}
