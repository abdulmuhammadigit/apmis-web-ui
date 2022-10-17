import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, NECESSITY_CHART_DETAIL_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../../core/_base/crud/models/http-request-response';

@Injectable({
	providedIn: 'root'
})
export class NecessityChartDetailService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(NECESSITY_CHART_DETAIL_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}

	public savedecision(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('savedecision'), criteria);
	}

	public saveSubmited(criteria): Observable<HttpRequestResponse> {
		criteria.submited = true;
		return this.sendJsonRequest(this.getActionUrl('savesubmited'), criteria);
	}
}
