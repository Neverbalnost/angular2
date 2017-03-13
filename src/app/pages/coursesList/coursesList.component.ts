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
		console.log(`We are about to delete course with id: ${id}. 
What a relief, you cannot delete it for real!`);
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
