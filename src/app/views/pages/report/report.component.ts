import { ModuleConstants } from './../../../../environments/environment';
import { StorageService } from './../../../core/auth/_services/storage.service';
import { MenuHorizontalService } from './../../../core/_base/layout/services/menu-horizontal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kt-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private menu: MenuHorizontalService,
    private storage: StorageService
  ) { }

  ngOnInit() {
    this.storage.setCurrentModule(ModuleConstants.Report);
    this.menu.loadMenu();
  }

}