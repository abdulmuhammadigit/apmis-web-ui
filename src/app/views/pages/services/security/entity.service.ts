import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, SECURITY_ENTITY_OPERATION } from './../../../../../environments/environment';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EntityService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(SECURITY_ENTITY_OPERATION) opsUrl: string,
		http: HttpClient
	) {
		super(baseUrl, opsUrl, http);
	}
}
