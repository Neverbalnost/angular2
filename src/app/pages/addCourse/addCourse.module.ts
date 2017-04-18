// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './addCourse.routes';

// custom components
import { AddCourseComponent } from './addCourse.component';

@NgModule({
	declarations: [
		AddCourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class AddCourseModule {
	constructor() {
	}
}
