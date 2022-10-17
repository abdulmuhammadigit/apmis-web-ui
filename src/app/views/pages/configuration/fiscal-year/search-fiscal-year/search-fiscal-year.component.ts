import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { ViewChild } from '@angular/core';
import { ComponentHostDirective } from "../../../../../core/_base/layout/directives/component-host.directive";
import { CreateFiscalYearComponent } from '../create-fiscal-year/create-fiscal-year.component';
import { FiscalYearService } from '../../../services/configuration/fiscal-year/fiscal-year.service';

@Component({
  selector: 'kt-search-fiscal-year',
  templateUrl: './search-fiscal-year.component.html',
  styleUrls: ['./search-fiscal-year.component.scss']
})
export class SearchFiscalYearComponent implements OnInit {

  fiscalYearSearchForm: FormGroup;
  fiscalYearSearchList: Array<any>
  onOperation: boolean = false;
  public shamsiYearList = [];

  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;

  constructor(
    private formBuilder: FormBuilder,
    private fiscalyearService: FiscalYearService,
    private changeDetectorRef: ChangeDetectorRef,
    private creator: ComponentBase<CreateFiscalYearComponent>,
    private notify: NotificationService,
  ) { }

  ngOnInit() {
    this.fiscalYearSearchList = [];
    this.getShamsiYear();
    this.fiscalYearSearchForm = this.formBuilder.group({
      id: [''],
      shamsiYear: ['', Validators.required],
    })
  }
  // utility

  getShamsiYear() {
    var miladiYear = new Date().getFullYear();
    var shamsiYear = miladiYear - 621;

    this.shamsiYearList.push(shamsiYear + 1);
    this.shamsiYearList.push(shamsiYear);
    for (var i = 1; i < 10; i++) {
      this.shamsiYearList.push(shamsiYear - i);
    }
  }

  isControlHasError(controlName, type) {
    const control = this.fiscalYearSearchForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }


  searchFiscalyear() {
    const controls = this.fiscalYearSearchForm.controls;
    /** check form */
    if (this.fiscalYearSearchForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }


    if (this.fiscalYearSearchForm.valid) {
      this.fiscalyearService.search(this.fiscalYearSearchForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.fiscalYearSearchList = [];
              this.fiscalYearSearchList.push(d.data);
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

  createFiscalyear() {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateFiscalYearComponent, this.host);
    comp.instance.result.subscribe(nex => {
      this.onOperation = false;
      comp.destroy()
    });
  }


  editFiscalyear(id) {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateFiscalYearComponent, this.host);
    comp.instance.result.subscribe(nex => {
      if (nex == 1) {
        this.searchFiscalyear();
      }
      this.onOperation = false;
      comp.destroy()
    });
    comp.instance.id.next(id);
  }

}
