import { DonorService } from '../../../services/asset/donor/donor.service';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'kt-create-donor',
  templateUrl: './create-donor.component.html',
  styleUrls: ['./create-donor.component.scss']
})
export class CreateDonorComponent implements OnInit {

  id: Subject<number>;
  editable: boolean;
  saveDonorForm: FormGroup;
  result: Subject<any>;
  formTitle: string;

  constructor(
    private fb: FormBuilder,
    private donorService: DonorService,
    private notify: NotificationService,
    private cdf: ChangeDetectorRef,
    private translate: TranslateService
  ) {
    this.id = new BehaviorSubject(0);
    this.editable = false;
    this.result = new Subject<any>();
    this.formTitle = "ثبت تمویل کننده";
    this.initializeForm();
  }

  initializeForm() {
    this.saveDonorForm = this.fb.group({
      id: '',
      name: ['', Validators.required],
      abbreviation: ['', Validators.required]
    });
  }

  cancelClick() {
    this.result.next(-1);
  }
  newDonorForm() {
    this.saveDonorForm.reset()
  }

  isControlHasError(controlName, type) {
    const control = this.saveDonorForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

  ngOnInit() {
    this.id.subscribe(next => {
      if (next != 0) {
        this.formTitle = "ویرایش کارمند";
        this.donorService.findById({ id: next }).subscribe({
          next: val => {
            if (val.successful) {
              this.saveDonorForm.patchValue({
                id: val.data.id,
                name: val.data.name,
                abbreviation: val.data.abbreviation
              });

              this.cdf.detectChanges();
              this.cdf.markForCheck();
              this.editable = true;
            }
          },
          error: err => {
            this.notify.error(err);
          }
        })
      }
    });
  }



  submit() {

    const controls = this.saveDonorForm.controls;
    /** check form */
    if (this.saveDonorForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.donorService.save(this.saveDonorForm.value).subscribe({
      next: val => {
        if (val.successful) {
          this.notify.success("معلومات موفقانه ثبت گردید!");
          this.saveDonorForm.patchValue({
            id: val.data.id,
            name: val.data.name,
            abbreviation: val.data.abbreviation
          });
          this.cdf.markForCheck();
          this.editable = true;
        }
      },
      error: er => {
        this.notify.error(er);
        this.cdf.markForCheck();
      }
    });

  }

}
