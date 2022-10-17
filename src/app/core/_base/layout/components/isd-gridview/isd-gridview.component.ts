
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter, TemplateRef } from '@angular/core';
import { NgxDatatableModule, ColumnMode, SelectionType, DatatableComponent } from '@swimlane/ngx-datatable';
import { BehaviorSubject } from 'rxjs';
import { DataTableService } from "../../services/datatable.service"

@Component({
  selector: 'kt-isd-gridview',
  templateUrl: './isd-gridview.component.html',
  styleUrls: ['./isd-gridview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsdGridviewComponent implements OnInit {
  @Output() itemDelete = new EventEmitter<any>();
  @Output() itemUpdate = new EventEmitter<any>();
  @Output() itemPrint = new EventEmitter<any>();
  @Output() itemView = new EventEmitter<any>();
  @Output() itemAdd = new EventEmitter<any>();
  @Output() itemSelected = new EventEmitter<any>();
  @Output() itemOk = new EventEmitter<any>();

  @Input() filterkey = "";
  @Input() actionslist: Array<any> = [];
  @Input() selectionTitle: Array<any> = [];


  @Input() set filterPlaceHolder(val: string) {
    if (val) {
      this._filterPlaceholder = val;
    }
  }

  get filterPlaceHolder() {
    return this._filterPlaceholder;
  }

  @Input() set columns(val: Array<any>) {
    if (val) {
      this._columns = [];
      val.forEach(element => {
        if (element.type == "check") {
          element.cellTemplate = this.chkTmpl;
        }
        this._columns.push(element);
      });
    }
  }
  @Input() set rows(val: Array<any>) {
    if (val) {
      this._rows.next(val);
      this._data = val;
    }
  }

  @Input() set limits(val: number) {
    if (val) {
      this._limited = val;
    }
  }

  get columns() {
    return this._columns;
  }

  public _rows: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public _data: Array<any> = [];
  public _actionlist: Array<any>;
  public _selectionDisplayColumns: Array<any> = [];
  public _columns: Array<any>;
  public _message = { 'emptyMessage': 'دیتا برای نمایش موجود نیست', 'totalMessage': 'ریکارد پیدا شد' };
  public _selectedlist = [];
  public _selectedItem: any = {};
  public _limited = 10;
  public _filterPlaceholder: string = "";
  public _filter = false;
  public _actions = false;
  public _editable = false;
  public _isItemSelected = false;
  public _title = "";
  editing = {};



  @ViewChild(DatatableComponent) _table: DatatableComponent;
  @ViewChild('chkTmpl', { static: true }) chkTmpl: TemplateRef<any>;


  constructor(
    public dataService: DataTableService,
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnInit(): void {



    this.config();
  }

  onRowSelect({ selected }) {
    console.log('Select Event', selected, this._selectedlist);
    this.itemSelected.emit(selected);

    if (selected.length > 0) {
      this._selectedItem = selected[0];
      this._isItemSelected = true;
    }

    this.configSelected();
  }

  config() {
    if (this.actionslist.length) {
      this._actions = true;
      let list = [];
      this.actionslist.forEach((element, index) => {
        list[element.trim()] = true;
      });
      this._actionlist = list;
    }

    if (this.selectionTitle.length) {
      this._selectionDisplayColumns = this.selectionTitle;
    }
    this._filter = this.filterkey.length > 0;
  }

  configSelected() {
    if (this._selectionDisplayColumns.length > 0) {
      let out = "";
      this._selectionDisplayColumns.forEach((element, index) => {
        let column = this._columns.find(el => el.prop == element);
        out += column.name + ": " + this._selectedItem[element] + "|";
      });
      this._title = out;
    }
  }

  filterTable(event) {
    const val = event.target.value.toLowerCase();
    let _key = this.filterkey;
    if (val != "") {
      //filter our data
      const temp = this._data.filter(function (d) {
        return d[_key].toLowerCase().indexOf(val) !== -1 || !val;
      });
      this._rows.next(temp);
    }

    else {
      this._rows.next(this._data);
    }
    this._table.offset = 0;
  }


  addItem(event) {
    this.itemAdd.emit();
  }

  deleteItem(event) {
    this.itemDelete.emit(this._selectedlist);
  }

  okItem(event) {
    this.itemOk.emit(this._selectedlist);
  }

  updateItem(event) {
    this.itemUpdate.emit(event);
  }
}
