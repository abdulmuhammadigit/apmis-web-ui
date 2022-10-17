import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { UnitService } from '../../../services/asset/look/unit.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';

@Component({
  selector: 'kt-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit {


  id: Subject<number>;
  result: Subject<any>;
  public unitForm: FormGroup;
  formTitle: string;

  constructor(
    private fb: FormBuilder,
    private notify: NotificationService,
    private UnitService: UnitService,
    private changeDetector: ChangeDetectorRef) {
    this.id = new BehaviorSubject(0);
    this.formTitle = " ثبت واحد";
    this.result = new Subject<any>();
    this.initializaForm();

  }

  ngOnInit() {


    this.id.subscribe(next => {
      if (next != 0) {
        this.formTitle = 'ویرایش  واحد';
        this.UnitService.findById({ id: next }).subscribe({
          next: val => {
            if (val.successful) {

              this.unitForm.patchValue({
                id: val.data.id,
                name: val.data.name,
              });
              this.changeDetector.markForCheck();

            }
          },
          error: err => {
            this.notify.error(err);
          }
        })
      }
    });
  }




  initializaForm() {
    this.unitForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
    });

  }
  cancelClick() {
    this.result.next(-1);
  }

  submit() {

    const controls = this.unitForm.controls;
    /** check form */
    if (this.unitForm.invalid) {
      Object.keys(controls).forEach(controlName =>
        controls[controlName].markAsTouched()
      );
      return;
    }

    this.UnitService.save(this.unitForm.value).subscribe({
      next: val => {
        if (val.successful) {

          this.notify.success("معلومات موفقانه ثبت گردید!");

          this.unitForm.reset()

          this.changeDetector.markForCheck();
        }
      },
      error: er => {
        this.notify.error(er);
      }
    });
  }

  // utility
  isControlHasError(controlName, type) {
    const control = this.unitForm.controls[controlName];
    if (!control) {
      return false;
    }
    return control.hasError(type) && (control.dirty || control.touched);
  }
}
