// Angular
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// RxJS
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
// Models
import { DataTableItemModel } from '../models/datatable-item.model';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

const API_DATATABLE_URL = 'api/cars';

@Injectable()
export class DataTableService {

	public _data: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	/**
	 * Service Constructor
	 *
	 * @param http: HttpClient
	 */
	constructor(private http: HttpClient) { }

	/**
	 * Returns data from fake server
	 */
	getAllItems(): Observable<DataTableItemModel[]> {
		return this.http.get<DataTableItemModel[]>(API_DATATABLE_URL);
	}
}
