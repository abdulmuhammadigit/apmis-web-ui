import {Inject, Injectable} from '@angular/core';
import {BaseService} from '../../../../../core/_base/crud/service/base-service.service';
import {BASE_API_URL, ITEM_RECEIPT_OPERATION} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpRequestResponse} from '../../../../../core/_base/crud/models/http-request-response';

@Injectable({
  providedIn: 'root'
})
export class ItemReceiptService extends BaseService{

	constructor(
		@Inject(BASE_API_URL) protected  baseUrl:string,
		@Inject(ITEM_RECEIPT_OPERATION) protected operationUrl:string,
		http:HttpClient
	) {
		super(baseUrl,operationUrl,http);
	}

	public searchSpecification(criteria):Observable<HttpRequestResponse>{
		return this.sendJsonRequest(this.getActionUrl('specification'),criteria);
	}
}
