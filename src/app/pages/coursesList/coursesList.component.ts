import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseService } from '../../core/services';
import { Course } from '../../core/entities';

@Component({
	selector: 'courses-list',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./coursesList.styles.scss')],
	template: require('./coursesList.template.html')
})
export class CoursesListComponent implements OnInit, OnDestroy {
	private courseServiceSubscription: Subscription;
	private courseList: Course[];
	private isLoading: boolean = false;

	constructor(private courseService: CourseService) {
		console.log('Courses page constructor');

		this.courseList = [];
	}

	public deleteCourse(id) {
		const deleteForReals = confirm('Do you wanna delete this course? For reals?!');

		if (deleteForReals) {
			this.courseList = this.courseList.filter((course) => {
				if (course.id !== id) { return true; }
				return false;
			});
		}
	}

	public ngOnInit() {
		console.log('Courses page init');

		this.isLoading = true;
		this.courseServiceSubscription = this.courseService.getTodoItems().subscribe((res: Course[]) => {
			this.courseList = res;
			this.isLoading = false;
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
