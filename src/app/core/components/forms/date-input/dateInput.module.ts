import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DateInputComponent } from './dateInput.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		DateInputComponent,
	],
	declarations: [
		DateInputComponent,
	],
	providers: [],
})
export class DateInputModule { }
