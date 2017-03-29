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
import { LoaderModule } from './../../core/components/loader/loader.module';

@NgModule({
	declarations: [
		CoursesListComponent,
		CourseComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		ModalModule,
		LoaderModule
	],
	providers: []
})
export class CoursesListModule {
	constructor() {
	}
}
