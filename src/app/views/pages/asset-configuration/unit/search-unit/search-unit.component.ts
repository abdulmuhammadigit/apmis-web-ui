import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { CreateUnitComponent } from '../create-unit/create-unit.component';
import { UnitService } from '../../../services/asset/look/unit.service';

@Component({
  selector: 'kt-search-unit',
  templateUrl: './search-unit.component.html',
  styleUrls: ['./search-unit.component.scss']
})
export class SearchUnitComponent implements OnInit {

  unitSearchForm: FormGroup;
  unitSearchList: Array<any>
  onOperation: boolean = false;



  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;

  constructor(
    private formBuilder: FormBuilder,
    private UnitService: UnitService,
    private changeDetectorRef: ChangeDetectorRef,
    private creator: ComponentBase<CreateUnitComponent>,
    private notify: NotificationService,
  ) { }

  ngOnInit() {

    this.unitSearchList = [];
    this.unitSearchForm = this.formBuilder.group({
      id: [''],
      name: ['']
    })


  }

  searchUnit() {
    if (this.unitSearchForm.valid) {
      this.UnitService.search(this.unitSearchForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.unitSearchList = d.data;
              if (d.data.length < 1) {
                this.notify.error("معلومات دریافت نگردید!");
              }

              this.changeDetectorRef.markForCheck();
            }
          },
          error: err => {
            this.notify.error(err);
          }
        });
    }
  }

  createUnit() {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateUnitComponent, this.host);
    comp.instance.result.subscribe(nex => {
      this.onOperation = false;
      comp.destroy()
    });
  }


  editUnit(id) {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateUnitComponent, this.host);
    comp.instance.result.subscribe(nex => {
      if (nex == 1) {
        this.searchUnit();
      }
      this.onOperation = false;
      comp.destroy()
    });
    comp.instance.id.next(id);
  }

}
