import { BASE_API_URL, BUSINESS_RULE_OPERATION, WORK_FLOW_OPERATION } from './../../../../../environments/environment';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class WorkFlowService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(WORK_FLOW_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
}
