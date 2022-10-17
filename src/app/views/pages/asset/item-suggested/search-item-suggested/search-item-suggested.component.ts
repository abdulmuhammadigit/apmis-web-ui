import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ComponentHostDirective } from '../../../../../core/_base/layout';
import { ComponentBase } from '../../../../../core/_base/layout/components/component-base';
import { NotificationService } from '../../../../../core/_base/layout/services/notification.service';
import { ItemRequestService } from '../../../services/asset/item-request/item-request.service';
import { CreateItemSuggestedComponent } from '../create-item-suggested/create-item-suggested.component';

@Component({
  selector: 'kt-search-item-suggested',
  templateUrl: './search-item-suggested.component.html',
  styleUrls: ['./search-item-suggested.component.scss']
})
export class SearchItemSuggestedComponent implements OnInit {

  suggestedList: Array<any>;
  suggestedForm: FormGroup;
  onOperation = false;
  @ViewChild(ComponentHostDirective, { static: false })
  host: ComponentHostDirective;

  constructor(
	private fb: FormBuilder,
	private itemRequestService: ItemRequestService,
	private cdf: ChangeDetectorRef,
	private creator: ComponentBase<CreateItemSuggestedComponent>,
	private notify: NotificationService
  ) { }

  ngOnInit(): void {
	this.suggestedList = [];

	this.suggestedForm = this.fb.group({
		code: [''],
		suggested: [true],
		documentNumber: ['']
	});
  }
  createSuggestedForm() {
	this.onOperation = true;
	const comp = this.creator.Construct(CreateItemSuggestedComponent, this.host);
	this.cdf.markForCheck();
	comp.instance.result.subscribe(nex => {
		this.onOperation = false;
		comp.destroy();
	});
  }

  searchSuggestedForm() {
	if (this.suggestedForm.valid) {
		this.itemRequestService.search(this.suggestedForm.value)
		.subscribe({
			next: response => {
			if (response.successful) {
				if (response.data.length < 1) {
				this.notify.error('معلومات دریافت نگردید!');
				}
				this.suggestedList = response.data;
				this.cdf.markForCheck();
			}

			},
			error: err => {
			this.notify.error(err);
			}
		});
	}
  }
  editSuggestedForm(id) {
	this.onOperation = true;
	const comp = this.creator.Construct(CreateItemSuggestedComponent, this.host);
	comp.instance.result.subscribe(nex => {
		if (nex == 1) {
		this.searchSuggestedForm();
		}
		this.onOperation = false;
		comp.destroy();
	});
	comp.instance.id.next(id);
  }
}
