import { BASE_API_URL, ITEM_DISTRIBUTION_DETAIL_OPERATION } from './../../../../../../environments/environment';
import { BaseService } from './../../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ItemDistributionDetailService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(ITEM_DISTRIBUTION_DETAIL_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}
}
