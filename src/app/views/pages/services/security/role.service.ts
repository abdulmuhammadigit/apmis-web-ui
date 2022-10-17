import { Inject, Injectable } from '@angular/core';
import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import {
	BASE_API_URL, ROLE_OPERATION
} from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class RoleService extends BaseService {
	constructor(
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(ROLE_OPERATION) opsUrl: string,
		http: HttpClient
	) {
		super(baseUrl, opsUrl, http);
	}
}
