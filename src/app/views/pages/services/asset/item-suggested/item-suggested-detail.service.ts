import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { BASE_API_URL, ITEM_SUGGESTED_DETAIL_OPERATION } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemSuggestedDetailService extends BaseService {

  constructor(
    @Inject(BASE_API_URL) protected baseUrl: string,
    @Inject(ITEM_SUGGESTED_DETAIL_OPERATION) protected operationUrl: string,
    http: HttpClient
  ) {
    super(baseUrl, operationUrl, http);
  }
}
