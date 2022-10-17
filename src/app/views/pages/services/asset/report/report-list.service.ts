import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, REPORT_LIST_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from './../../../../../core/_base/crud/models/http-request-response';


@Injectable({
	providedIn: 'root'
})
export class ReportListService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(REPORT_LIST_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
	public getItemDistributedList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`itemdistributedquantity`), criteria);
	}

	public getItemQuantityList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`itemquantity`), criteria);
	}

	public getEmployeesItemList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`employeesitem`), criteria);
	}

	public getNecessityChartList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`necessityChart`), criteria);
	}

	public getEmployeesItemDetailsList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`employeesitemdetails`), criteria);
	}

	public getItemReceiptList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`itemreceiptquantity`), criteria);
	}
}
