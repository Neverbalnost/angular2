import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../core/entities';

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

	@Output() public updateCourse = new EventEmitter();

	constructor() {
	}
	public deleteClick(id: number) {
		this.deleteCourse.emit(id);
	}

	public updateClick(id) {
		this.updateCourse.emit({id: id, data: {
			title: prompt('Give me the new title'),
			id: prompt('Give me the new id'),
			duration: prompt('Give me the new duration'),
			description: prompt('Give me the new descritpion'),
			startDate: new Date()
		}});
	}
}
