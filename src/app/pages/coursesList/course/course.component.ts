import {
	Component,
	ViewEncapsulation,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy } from '@angular/core';
import { Course } from '../../../core/entities';

@Component({
	selector: 'course',
	templateUrl: 'course.component.html',
	styles: [require('./course.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent {
	@Input() public course: Course;

	@Output() public deleteCourse = new EventEmitter<number>();

	@Output() public updateCourse = new EventEmitter();

	public courseDate: Date;

	constructor() {
	}
	public deleteClick(id: number) {
		this.deleteCourse.emit(id);
	}

	public updateClick(userId) {
		this.updateCourse.emit({id: userId, data: {
			title: prompt('Give me the new title'),
			id: prompt('Give me the new id'),
			duration: prompt('Give me the new duration'),
			description: prompt('Give me the new descritpion'),
			startDate: new Date()
		}});
	}
}
