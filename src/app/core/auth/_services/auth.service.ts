import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user.model';
import { Permission } from '../_models/permission.model';
import { Role } from '../_models/role.model';
import { catchError, map } from 'rxjs/operators';
import { QueryParamsModel, QueryResultsModel } from '../../_base/crud';
import { BASE_AUTH_URL, environment, LOGIN_PATH, USER_OPERATION } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { HttpRequestResponse } from '../../_base/crud/models/http-request-response';

const API_USERS_URL = 'api/users';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';

@Injectable()
export class AuthService {
	constructor(
		private http: HttpClient,
		@Inject(BASE_AUTH_URL) private authUrl,
		@Inject(LOGIN_PATH) private loginPath,
		@Inject(USER_OPERATION) private usersPath,
		private storage: StorageService,
		private router: Router
	) {
	}

	// Authentication/Authorization
	login(username: string, password: string): Observable<HttpRequestResponse> {
		return this.http.post<HttpRequestResponse>(`${this.authUrl}${this.loginPath}signin`, { username, password });
	}

	changePassword(criteria): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.loginPath}change-password`, criteria);
	}

	getUserModules(criteria) {
		return this.sendPostRequest(`${this.authUrl}${this.usersPath}modules`, criteria);
	}

	searchUsers(criteria): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.usersPath}search`, criteria);
	}

	isLoggedIn(): boolean {
		return this.storage.isUserLoggedIn();
	}

	getLoggedInUser(): User {
		return this.storage.getUser();
	}
	checkUserRolePage(url: string): boolean {
		let result = false;

		this.storage.getUserModules().forEach(element => {
			element.menus.forEach(elem => {
				elem.submenu.forEach(e => {
					if (e.page === url) {
						result = true;
					}
				});
			});
		});
		return result;
	}
	checkEntityPermission(ent: string, permission: string): boolean {
		let result = true;
		this.storage.getUser().userPages.forEach(element => {
			if (element.excludedPermissions.length > 0) {
				element.excludedPermissions.forEach(elm => {
					if (elm.entity == ent && elm.code == permission) {
						result = false;
					}
				});
			}
		});
		return result;
	}
	logout() {
		this.storage.signOut();
		this.router.navigateByUrl('auth/login').then();
	}

	/*
	 * Submit forgot password request
	 *
	 * @param {string} email
	 * @returns {Observable<any>}
	 */
	public requestPassword(criteria): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.loginPath}request-password`, criteria);

	}


	findById(id): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.usersPath}find`, { id: id });
	}

	resetPassword(criteria): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.usersPath}reset-password`, criteria);
	}

	saveUser(user): Observable<HttpRequestResponse> {
		return this.sendPostRequest(`${this.authUrl}${this.usersPath}save`, user);
	}

	private sendPostRequest(url: string, body: object): Observable<HttpRequestResponse> {
		const options = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		};
		return this.http.post<HttpRequestResponse>(url, body, options);
	}

	getUserByToken(): Observable<User> {
		const userToken = localStorage.getItem(environment.authTokenKey);
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Authorization', 'Bearer ' + userToken);
		return this.http.get<User>(API_USERS_URL, { headers: httpHeaders });
	}

	register(user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders })
			.pipe(
				map((res: User) => {
					return res;
				}),
				catchError(err => {
					return null;
				})
			);
	}




	getAllUsers(): Observable<User[]> {
		return this.http.get<User[]>(API_USERS_URL);
	}

	getUserById(userId: number): Observable<User> {
		return this.http.get<User>(API_USERS_URL + `/${userId}`);
	}


	// DELETE => delete the user from the server
	deleteUser(userId: number) {
		const url = `${API_USERS_URL}/${userId}`;
		return this.http.delete(url);
	}

	// UPDATE => PUT: update the user on the server
	updateUser(_user: User): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_USERS_URL, _user, { headers: httpHeaders });
	}

	// CREATE =>  POST: add a new user to the server
	createUser(user: User): Observable<User> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<User>(API_USERS_URL, user, { headers: httpHeaders });
	}

	// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
	// items => filtered/sorted result
	findUsers(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_USERS_URL + '/findUsers', queryParams, { headers: httpHeaders });
	}

	// Permission
	getAllPermissions(): Observable<Permission[]> {
		return this.http.get<Permission[]>(API_PERMISSION_URL);
	}

	getRolePermissions(roleId: number): Observable<Permission[]> {
		return this.http.get<Permission[]>(API_PERMISSION_URL + '/getRolePermission?=' + roleId);
	}

	// Roles
	getAllRoles(): Observable<Role[]> {
		return this.http.get<Role[]>(API_ROLES_URL);
	}

	getRoleById(roleId: number): Observable<Role> {
		return this.http.get<Role>(API_ROLES_URL + `/${roleId}`);
	}

	// CREATE =>  POST: add a new role to the server
	createRole(role: Role): Observable<Role> {
		// Note: Add headers if needed (tokens/bearer)
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<Role>(API_ROLES_URL, role, { headers: httpHeaders });
	}

	// UPDATE => PUT: update the role on the server
	updateRole(role: Role): Observable<any> {
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.put(API_ROLES_URL, role, { headers: httpHeaders });
	}

	// DELETE => delete the role from the server
	deleteRole(roleId: number): Observable<Role> {
		const url = `${API_ROLES_URL}/${roleId}`;
		return this.http.delete<Role>(url);
	}

	// Check Role Before deletion
	isRoleAssignedToUsers(roleId: number): Observable<boolean> {
		return this.http.get<boolean>(API_ROLES_URL + '/checkIsRollAssignedToUser?roleId=' + roleId);
	}

	findRoles(queryParams: QueryParamsModel): Observable<QueryResultsModel> {
		// This code imitates server calls
		const httpHeaders = new HttpHeaders();
		httpHeaders.set('Content-Type', 'application/json');
		return this.http.post<QueryResultsModel>(API_ROLES_URL + '/findRoles', queryParams, { headers: httpHeaders });
	}

	/*
	 * Handle Http operation that failed.
	 * Let the app continue.
   *
   * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: any) {
		return (error: any): Observable<any> => {
			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// Let the app keep running by returning an empty result.
			return of(result);
		};
	}
}
