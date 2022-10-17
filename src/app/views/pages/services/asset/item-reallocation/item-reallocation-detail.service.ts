import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../../core/_base/crud/models/http-request-response';
import { BASE_API_URL, ITEM_REALLOCATION_DETAIL_OPERATION } from '../../../../../../environments/environment';
import { BaseService } from './../../../../../core/_base/crud/service/base-service.service';

@Injectable({
	providedIn: 'root'
})
export class ItemReallocationDetailService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(ITEM_REALLOCATION_DETAIL_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
	public approveItemReallocation(id): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('approve'), id);
	}
	public saveItemExamination(info): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('saveexaminer'), info);
	}
	public saveItemPrice(info): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('saveprice'), info);
	}
	public saveToEmployee(info): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('savetoemployee'), info);
	}

	public searchDistributedSpecification(criterai): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('specification'), criterai);
	}
}
