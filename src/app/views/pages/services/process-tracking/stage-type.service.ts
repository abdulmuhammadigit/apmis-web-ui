import { BASE_API_URL, BUSINESS_RULE_OPERATION, STAGE_OPERATION, STAGE_TYPE_OPERATION } from './../../../../../environments/environment';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class StageTypeService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(STAGE_TYPE_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
}
