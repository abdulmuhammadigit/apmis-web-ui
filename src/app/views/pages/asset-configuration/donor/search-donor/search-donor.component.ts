import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { DonorService } from './../../../services/asset/donor/donor.service';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { CreateDonorComponent } from '../create-donor/create-donor.component';

@Component({
  selector: 'kt-search-donor',
  templateUrl: './search-donor.component.html',
  styleUrls: ['./search-donor.component.scss']
})
export class SearchDonorComponent implements OnInit {
  searchDonorForm: FormGroup;
  donorSearchList: Array<any>;

  onOperation: boolean = false;
  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;
  constructor(
    private fb: FormBuilder,
    private service: DonorService,
    private cdf: ChangeDetectorRef,
    private creator: ComponentBase<CreateDonorComponent>,
    private notify: NotificationService,
  ) { }

  ngOnInit() {
    this.donorSearchList = [];

    this.searchDonorForm = this.fb.group({
      id: [''],
      name: [''],
    })
  }

  editDonor(id) {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateDonorComponent, this.host);
    comp.instance.result.subscribe(nex => {
      if (nex == 1) {
        this.searchDonor();
      }
      this.onOperation = false;
      comp.destroy()
    });
    comp.instance.id.next(id);
  }

  createDonor() {
    this.onOperation = true;
    const comp = this.creator.Construct(CreateDonorComponent, this.host);
    this.cdf.markForCheck();
    comp.instance.result.subscribe(nex => {
      this.onOperation = false;
      comp.destroy()
    });
  }

  searchDonor() {
    if (this.searchDonorForm.valid) {
      this.service.search(this.searchDonorForm.value)
        .subscribe({
          next: d => {
            if (d.successful) {
              this.donorSearchList = d.data;
              if (d.data.length < 1) {
                this.notify.error("معلومات دریافت نگردید!");
              }
              this.cdf.markForCheck();
            }
          },
          error: err => {
            this.notify.error(err);
          }
        });
    }
  }

}
