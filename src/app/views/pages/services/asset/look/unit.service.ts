import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, UNIT_OPERATION } from '../../../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpRequestResponse} from '../../../../../core/_base/crud/models/http-request-response';

@Injectable({
  providedIn: 'root'
})
export class UnitService extends BaseService {
  constructor(
	@Inject(BASE_API_URL) protected baseUrl: string,
	@Inject(UNIT_OPERATION) protected operationUrl: string,
	http: HttpClient
  ) {
	super(baseUrl, operationUrl, http);
  }

	public findUnitById(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`itemUnit`), criteria);
	}

}
