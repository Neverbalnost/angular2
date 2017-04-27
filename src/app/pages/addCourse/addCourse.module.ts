// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './addCourse.routes';

// custom components
import { AddCourseComponent } from './addCourse.component';

// custom form controls
import { DateInputModule } from './../../core/components/forms/date-input/dateInput.module';

@NgModule({
	declarations: [
		AddCourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		DateInputModule
	],
	providers: []
})
export class AddCourseModule {
	constructor() {
	}
}
