import { HttpRequestResponse } from './../../../../core/_base/crud/models/http-request-response';
import { Observable } from 'rxjs';
import { BASE_API_URL, BUSINESS_RULE_OPERATION, CONNECTION_OPERATION } from './../../../../../environments/environment';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ConnectionService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(CONNECTION_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}

	findStageConnection(criterai): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl("findstageconnection"), criterai);
	}
}
