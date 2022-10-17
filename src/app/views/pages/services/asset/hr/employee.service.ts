import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, EMPLOYEE_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpRequestResponse } from '../../../../../core/_base/crud/models/http-request-response';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EmployeeService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(EMPLOYEE_OPERATION,) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
	public searchemployeeitemactive(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('searchemployeeitemactive'), criteria);
	}

}
