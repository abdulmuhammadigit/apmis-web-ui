import { NotificationService } from './../../../../core/_base/layout/services/notification.service';
import { BASE_API_URL, DOCUMENT_OPERATION } from '../../../../../environments/environment';
import { BaseService } from '../../../../core/_base/crud/service/base-service.service';
import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestResponse } from '../../../../core/_base/crud/models/http-request-response';
import * as fileSaver from 'file-saver';
import { id } from '@swimlane/ngx-datatable';
import { HttpEvent } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class DocumentService extends BaseService {


	constructor(
		@Inject(BASE_API_URL) protected baseUrl: string,
		@Inject(DOCUMENT_OPERATION) protected operationUrl: string,
		http: HttpClient
	) {
		super(baseUrl, operationUrl, http);
	}

	public searcheSpecification(criteria): Observable<HttpRequestResponse> {
		return this.sendJsonRequest(this.getActionUrl('specification'), criteria);
	}

	upload(file: File, data): any {
		const formData: FormData = new FormData();

		formData.append('file', file);
		formData.append('sectionId', data.sectionId);
		formData.append('documentTypeId', data.documentTypeId);
		formData.append('description', data.description);
		formData.append('documentNumber', data.documentNumber);
		formData.append('documentSource', data.documentSource);
		formData.append('recordId', data.recordId);


		//return this.sendJsonRequest(this.getActionUrl('upload'), formData);

		// const req = this.http.post<HttpRequestResponse>(`${this.baseUrl}${this.operationUrl}upload`, formData, {
		// 	headers: new HttpHeaders().set("Content-Type", "application/json")
		// });
		// const req = new HttpRequest('POST', `${this.baseUrl}${this.operationUrl}upload`, formData, {
		// 	responseType: 'json'
		// });

		const req = new HttpRequest('POST', `${this.baseUrl}${this.operationUrl}upload`, formData);
		return this.http.request(req);
	}

	download(id) {
		this.downloadFile(id).subscribe((data: HttpResponse<Blob>) => {
			this.saveFile(data.body, this.getDownloadedFileName(data));
		},
			(err) => {

			}
		)
	}

	private downloadFile(id): Observable<HttpResponse<Blob>> {
		let headers = new HttpHeaders();
		return this.http.post(`${this.baseUrl}${this.operationUrl}download`, { id: id },
			{
				headers: headers,
				observe: 'response',
				responseType: 'blob',
			}
		)
	}

	private saveFile(data, fileName?: string) {
		const blob = new Blob([data], { type: 'any' });
		const file = new File([blob], fileName != null ? fileName : 'download',
			{ type: 'blob' })
		fileSaver.saveAs(file, fileName);
	}

	private getDownloadedFileName(data: HttpResponse<Blob>) {
		let filename = "";
		const disposition = data.headers.get('Content-Disposition');
		if (disposition && disposition.indexOf('filename') !== -1) {
			var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
			var matches = filenameRegex.exec(disposition);
			if (matches != null && matches[1]) {
				filename = matches[1].replace(/['"]/g, '');
			}
		}
		return filename;
	}

}
