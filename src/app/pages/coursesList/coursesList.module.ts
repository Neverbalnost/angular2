// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './coursesList.routes';

// custom components
import { CoursesListComponent } from './coursesList.component';
import { CourseComponent } from './course/course.component';

@NgModule({
	declarations: [
		CoursesListComponent,
		CourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class CoursesListModule {
	constructor() {
	}
}
