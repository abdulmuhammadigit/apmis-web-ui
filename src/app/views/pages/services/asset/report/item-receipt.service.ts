import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_API_URL, ITEM_ERCEIPT_REPORT_OPERATION } from '../../../../../../environments/environment';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ItemReceiptService extends BaseService {

  constructor(
    @Inject(BASE_API_URL) protected baseUrl: string,
    @Inject(ITEM_ERCEIPT_REPORT_OPERATION) protected operationUrl: string,
    http: HttpClient
  ) {
    super(baseUrl, operationUrl, http);
  }
}
