import { HttpRequestResponse } from './../../../../../core/_base/crud/models/http-request-response';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, LOOK_LIST_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LookListService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(LOOK_LIST_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}

	public getUnitList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('unit'))
	}

	public getFiscalYearList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('fiscalyear'))
	}

	public getFiscalYearQuarterList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('fiscalyearquarter'))
	}

	public getItemReceiptTypeList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('itemreceipttype'))
	}

	public getStockKeeperTypeList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('stockkeepertype'))
	}

	public getAttributeDataTypeList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('attributedatatype'))
	}

	public getCategoryList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('category'))
	}

	public getUnitTypeList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('orgunittype'))
	}

	public getStatusList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`status`), criteria);
	}

	public getLocationList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('location'))
	}

	public getOrganizationList(): Observable<Array<any>> {
		return this.http.get<Array<any>>(this.getActionUrl('organization'))
	}

}
