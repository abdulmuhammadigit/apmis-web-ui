import { HttpRequestResponse } from './../../../../../core/_base/crud/models/http-request-response';
import { Observable } from 'rxjs';
import { BASE_API_URL, ITEM_RECEIPT_DETAIL_OPERATION } from './../../../../../../environments/environment';
import { BaseService } from './../../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ItemReceiptDetailService extends BaseService {
	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(ITEM_RECEIPT_DETAIL_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}

	public findItemDetailByItemReceipt(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('finditemdetaillist'), criteria);
	}
}
