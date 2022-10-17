import { BaseService } from './../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import {
	AUDIT_OPERATION,
	BASE_API_URL,
} from '../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuditService extends BaseService {
	constructor(
		@Inject(BASE_API_URL) baseUrl: string,
		@Inject(AUDIT_OPERATION) opsUrl: string,
		http: HttpClient
	) {
		super(baseUrl, opsUrl, http);
	}

}
