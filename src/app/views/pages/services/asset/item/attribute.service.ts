import {Inject, Injectable} from '@angular/core';
import {BaseService} from '../../../../../core/_base/crud/service/base-service.service';
import {ATTRIBUTE_OPERATION, BASE_API_URL} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttributeService extends BaseService{

	constructor(
		@Inject(BASE_API_URL) protected  baseUrl:string,
		@Inject(ATTRIBUTE_OPERATION) protected operationUrl:string,
		http:HttpClient
	) {
		super(baseUrl,operationUrl,http);
	}
}
