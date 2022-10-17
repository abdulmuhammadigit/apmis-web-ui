import { Inject, Injectable } from '@angular/core';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, PAGE_OPERATION, USER_OPERATION } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../core/_base/crud/models/http-request-response';

@Injectable({
	providedIn: 'root'
})
export class UserService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(USER_OPERATION) opsUrl: string,
		http: HttpClient
	) {
		super(baseUrl, opsUrl, http);
	}


	resetPassword(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('reset-password'), criteria);
	}
}
