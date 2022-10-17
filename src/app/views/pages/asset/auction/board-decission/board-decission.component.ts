import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from './../../../../../core/_base/layout/services/notification.service';
import { AuctionService } from '../../../services/asset/auction/auction.service';

@Component({
	selector: 'kt-board-decission',
	templateUrl: './board-decission.component.html',
	styleUrls: ['./board-decission.component.scss']
})
export class BoardDecissionComponent implements OnInit {
	@Output() passEntry: EventEmitter<any> = new EventEmitter();

	id: Subject<number>;
	formTitle: string;
	boardDecisionForm: FormGroup;
	editable: boolean;
	result: Subject<any>;
	fiscalyear = [];
	status = [];
	// formData: FormData;

	constructor(
		private fb: FormBuilder,
		private auctionService: AuctionService,
		private cdf: ChangeDetectorRef,
		public activeModel: NgbActiveModal,
		private notify: NotificationService,
		public modalService: NgbModal,
	) {
		this.initializeForm();
		this.result = new Subject<any>();
		this.editable = false;
		this.id = new BehaviorSubject(0);
		this.formTitle = 'ویرایش چارت';

	}


	ngOnInit() {

		this.id.subscribe(next => {
			if (next != 0) {
				this.auctionService.findBoardDecision({ id: next }).subscribe({
					next: val => {
						if (val.successful) {
							this.boardDecisionForm.patchValue(val.data);

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

	initializeForm() {
		this.boardDecisionForm = this.fb.group({
			id: [''],
			itemDetailText: [''],
			quantity: [''],
			price: [''],
			boardDecision: ['', Validators.required]
		});
	}

	submit() {

		// const controls = this.detailsModel.controls[index] as FormGroup;
		// /** check form */
		// if (controls.invalid) {
		//   Object.keys(controls.controls).forEach(controlName =>
		//     controls.controls[controlName].markAsTouched()
		//   );
		//   return;
		// }

		let data = this.boardDecisionForm.value;
		let record = data;
		const requstData = ({ auctionId: record.id, pricingBoard: record.boardDecision });
		this.auctionService.boardDecision(requstData).subscribe({
			next: data => {
				if (data.successful) {
					this.notify.success("معلومات موفقانه ثبت گردید!");
				}
			},
			error: er => {
				this.notify.error(er);
			}
		});
	}

}
