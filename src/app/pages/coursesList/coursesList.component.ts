import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseService } from '../../core/services';
import { TodoItem } from '../../core/entities';

@Component({
	selector: 'courses-list',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./coursesList.styles.scss')],
	template: require('./coursesList.template.html')
})
export class CoursesListComponent implements OnInit, OnDestroy {
	private courseServiceSubscription: Subscription;
	private todoList: TodoItem[];
	private isLoading: boolean = false;

	constructor(private courseService: CourseService) {
		console.log('Courses page constructor');

		this.todoList = [];
	}

	public ngOnInit() {
		console.log('Courses page init');

		this.isLoading = true;
		this.courseServiceSubscription = this.courseService.getTodoItems().subscribe((res: TodoItem[]) => {
			this.todoList = res;
			this.isLoading = false;
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
