import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL, INSTITUTION } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class InstitutionService extends BaseService {

	constructor(
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(INSTITUTION) opsUrl: string,
		http: HttpClient
	) {
		super(baseUrl, opsUrl, http);
	}
}
