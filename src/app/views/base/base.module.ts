import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { AutoFormComponent } from './forms/auto-form/auto-form.component';
import {PartialsModule} from '../partials/partials.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AutoFormComponent],
	imports: [
		CommonModule,
		BaseRoutingModule,
		PartialsModule,
		ReactiveFormsModule
	],
	exports: [AutoFormComponent]
})
export class BaseModule { }
