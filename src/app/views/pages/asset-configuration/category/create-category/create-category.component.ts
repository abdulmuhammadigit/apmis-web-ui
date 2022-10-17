import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { CategoryService } from '../../../services/asset/look/category.service';

@Component({
  selector: 'kt-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  id: Subject<number>;
  editable: boolean;
  saveCategoryForm: FormGroup;
  result: Subject<any>;
  formTitle: string;

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private notify: NotificationService,
    private cdf: ChangeDetectorRef,
  ) {
    this.id = new BehaviorSubject(0);
    this.editable = false;
    this.result = new Subject<any>();
    this.formTitle = "ثبت فورم کتگوری";
    this.initializeForm();
  }

  initializeForm() {
    this.saveCategoryForm = this.fb.group({
      id: '',
      name: ['', Validators.required]
    });
  }

  cancelClick() {
    this.result.next(-1);
  }
  newCategoryForm() {
    this.saveCategoryForm.reset()
  }

  isControlHasError(controlName, type) {
    const control = this.saveCategoryForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }

  ngOnInit() {
    this.id.subscribe(next => {
      if (next != 0) {
        this.formTitle = "ویرایش کارمند";
        this.service.findById({ id: next }).subscribe({
          next: val => {
            if (val.successful) {
              this.saveCategoryForm.patchValue({
                id: val.data.id,
                name: val.data.name
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

    const controls = this.saveCategoryForm.controls;
    /** check form */
    if (this.saveCategoryForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }
    this.service.save(this.saveCategoryForm.value).subscribe({
      next: val => {
        if (val.successful) {
          this.notify.success("معلومات موفقانه ثبت گردید!");
          this.saveCategoryForm.patchValue({
            id: val.data.id,
            name: val.data.name
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
