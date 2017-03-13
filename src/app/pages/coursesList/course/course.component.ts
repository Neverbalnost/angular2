import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/entities';
import { todoStatusClasses } from '../../../core/enums';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styles: [require('./course.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class CourseComponent {
	@Input() public course: Course;

	@Output() public deleteCourse = new EventEmitter<number>();

	deleteClick(id: number) {
		console.log('Delete clicked!' + id);
		this.deleteCourse.emit(id);
	}

	constructor() {
	}
}
