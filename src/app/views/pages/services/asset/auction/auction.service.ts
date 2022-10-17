import { Inject, Injectable } from '@angular/core';
import { BaseService } from '../../../../../core/_base/crud/service/base-service.service';
import { AUCTION_OPERATION, BASE_API_URL } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../../core/_base/crud/models/http-request-response';

@Injectable({
  providedIn: 'root'
})
export class AuctionService extends BaseService {

  constructor(
    @Inject(BASE_API_URL) protected baseUrl: string,
    @Inject(AUCTION_OPERATION) protected operationUrl: string,
    http: HttpClient
  ) {
    super(baseUrl, operationUrl, http);
  }
  public searchReallocatedItemSpecification(id): Observable<HttpRequestResponse> {
    return this.sendJsonRequest(this.getActionUrl('specification'), id);
  }

  public findBoardDecision(criteria): Observable<HttpRequestResponse> {
    return this.sendJsonRequest(this.getActionUrl('findboarddecision'), criteria);
  }

  public boardDecision(criteria): Observable<HttpRequestResponse> {
    return this.sendJsonRequest(this.getActionUrl('boarddecision'), criteria);
  }
}
