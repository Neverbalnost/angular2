// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './coursesList.routes';

// custom components
import { CoursesListComponent } from './coursesList.component';
import { CourseComponent } from './course/course.component';
import { ModalComponent } from './../../core/components/modal/modal.component';

@NgModule({
	declarations: [
		CoursesListComponent,
		CourseComponent,
		ModalComponent
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
