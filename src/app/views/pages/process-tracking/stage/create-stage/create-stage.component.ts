import { WorkFlowService } from './../../../services/process-tracking/work-flow.service';
import { StageTypeService } from './../../../services/process-tracking/stage-type.service';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { StageService } from '../../../services/process-tracking/stage.service';

@Component({
    selector: 'kt-create-stage',
    templateUrl: './create-stage.component.html',
    styleUrls: ['./create-stage.component.scss']
})
export class CreateStageComponent implements OnInit {
    id: Subject<number>;
    createStageForm: FormGroup;
    result: Subject<any>;
    formTitle: string;
    stageTypeList: Array<any>;
    workFlowList: Array<any>;
    constructor(
        private formBuilder: FormBuilder,
        private notification: NotificationService,
        private changeDetector: ChangeDetectorRef,
        private stageService: StageService,
        private stageTypeService: StageTypeService,
        private workFlowService: WorkFlowService
    ) {
        this.id = new BehaviorSubject(0);
        this.formTitle = "ایجاد مرحله";
        this.result = new Subject<any>();
        this.createStageForm = this.formBuilder.group({
            id: [null],
            name: ['', Validators.required],
            stageTypeId: ['', Validators.required],
            workFlowId: ['', Validators.required],
            isActive: [false],
            isEditable: [false]
        });
    }

    ngOnInit() {
        this.getStageTypeList();
        this.getWorkFlowList();
        this.find();
    }

    // look section
    getStageTypeList() {
        this.stageTypeService.getList({}).subscribe({
            next: val => {
                if (val.successful) {
                    this.stageTypeList = val.data
                }
                this.changeDetector.markForCheck();
            },
            error: err => {
                this.notification.error(err);
            }
        })
    }

    getWorkFlowList() {
        this.workFlowService.getList({}).subscribe({
            next: val => {
                if (val.successful) {
                    this.workFlowList = val.data
                }
                this.changeDetector.markForCheck();
            },
            error: err => {
                this.notification.error(err);
            }
        })
    }

    //utility section
    isControlHasError(controlName, type) {
        const control = this.createStageForm.controls[controlName];
        if (!control) {
            return false;
        }
        return control.hasError(type) && (control.dirty || control.touched);
    }

    back() {
        this.result.next(-1);
    }

    // operation section
    save() {

        const controls = this.createStageForm.controls;
        /** check form */
        if (this.createStageForm.invalid) {
            Object.keys(controls).forEach(controlName =>
                controls[controlName].markAsTouched()
            );
            return;
        }

        this.stageService.save(this.createStageForm.value).subscribe({
            next: val => {
                if (val.successful) {
                    this.notification.success("Sucess");
                    this.createStageForm.reset();
                    this.result.next(1);
                }
            },
            error: err => {
                this.notification.error(err);
            }
        })

    }

    find() {
        this.id.subscribe(next => {
            if (next != 0) {
                this.formTitle = 'Edit Stage';
                this.stageService.findById(next).subscribe({
                    next: val => {
                        if (val.successful) {
                            this.createStageForm.patchValue(val.data);
                            this.changeDetector.markForCheck();
                        }
                    }
                    ,
                    error: err => {
                        this.notification.error(err);
                    }
                })
            }
        });

    }
}
