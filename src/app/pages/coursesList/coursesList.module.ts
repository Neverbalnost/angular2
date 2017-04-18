// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './coursesList.routes';

// custom components
import { CoursesListComponent } from './coursesList.component';
import { CourseComponent } from './course/course.component';
import { ModalModule } from './../../core/components/modal/modal.module';

// directives
import { NewCourseDirective } from './../../core/directives/newCourse/newCourse.directive';

// Pipes
import { OrderByPipe } from './../../core/pipes';
import { DurationPipe } from './../../core/pipes';

@NgModule({
	declarations: [
		CoursesListComponent,
		CourseComponent,
		NewCourseDirective,
		OrderByPipe,
		DurationPipe
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		ModalModule
	],
	providers: []
})
export class CoursesListModule {
	constructor() {
	}
}
