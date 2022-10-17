import { HttpRequestResponse } from './../../../../../core/_base/crud/models/http-request-response';
import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, NECESSITY_CHART_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class NecessityChartService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(NECESSITY_CHART_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
	public findCommissionDecision(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('findcommissiondecision'), criteria);
	}

}
