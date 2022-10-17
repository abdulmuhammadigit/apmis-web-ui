import { Component, Input, OnInit } from '@angular/core';
import { FormConfig } from '../utils/form-config';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'kt-auto-form',
	templateUrl: './auto-form.component.html',
	styleUrls: ['./auto-form.component.scss']
})
export class AutoFormComponent implements OnInit {
	@Input() formConfig: FormConfig;
	form: FormGroup;

	constructor(private builder: FormBuilder) { }

	ngOnInit() {
		let cfg = {};

		for (const row of this.formConfig.rows) {
			for (const ctrl of row.elements) {

				if (ctrl.required) {
					cfg[ctrl.name] = ['', Validators.required];
				}
				else {
					cfg[ctrl.name] = [''];
				}
			}
		}
		this.form = this.builder.group(cfg);
	}

}
