import { ModuleConstants } from './../../../../environments/environment';
import { StorageService } from './../../../core/auth/_services/storage.service';
import { Component, OnInit } from '@angular/core';
import { MenuHorizontalService } from './../../../core/_base/layout';

@Component({
  selector: 'kt-process-tracking-main',
  templateUrl: './process-tracking-main.component.html',
  styleUrls: ['./process-tracking-main.component.scss'] 
})
export class ProcessTrackingMainComponent implements OnInit {

  constructor(
      private storage:StorageService,
      private hMenu:MenuHorizontalService
  ) { }

  ngOnInit() {
      this.storage.setCurrentModule(ModuleConstants.ProcessTracking);
      this.hMenu.loadMenu();
  }

}
