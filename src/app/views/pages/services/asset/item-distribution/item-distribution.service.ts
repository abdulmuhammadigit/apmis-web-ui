import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, ITEM_DISTRIBUTION_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../../../../src/app/core/_base/crud/models/http-request-response';

@Injectable({
	providedIn: 'root'
})
export class ItemDistributionService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(ITEM_DISTRIBUTION_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
	public approveItemDistribution(id): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('approve'), id);
	}
	public printItemDistribution(id): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('print'), id);
	}

}
