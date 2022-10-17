import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../models/http-request-response';

export class BaseService {
	protected baseUrl: string;
	protected opsUrl: string;
	protected http: HttpClient;
	constructor(baseUrl: string, opsUrl: string, http: HttpClient) {
		this.baseUrl = baseUrl;
		this.opsUrl = opsUrl;
		this.http = http;
	}

	public getList(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`list`), criteria);
	}

	public findById(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('find'), criteria);
	}

	public search(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl(`search`), criteria);
	}

	public save(info): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('save'), info);
	}

	public delete(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl("delete"), criteria);
	}

	public print(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl("print"), criteria);
	}

	protected getActionUrl(action) {
		return `${this.baseUrl}${this.opsUrl}${action}`;
	}

	protected sendJsonRequest(url, body): Observable<HttpRequestResponse> {
		return this.http.post<HttpRequestResponse>(url, body, {
			headers: new HttpHeaders().set("Content-Type", "application/json")
		});
	}

}
