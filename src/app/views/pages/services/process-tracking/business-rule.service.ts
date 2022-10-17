import { BASE_API_URL, BUSINESS_RULE_OPERATION } from './../../../../../environments/environment';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
	providedIn: 'root'
})
export class BusinessRuleService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(BUSINESS_RULE_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
}
