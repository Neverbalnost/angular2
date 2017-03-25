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
	protected modalHidden: boolean = true;
	protected modalText: string = `Do you wanna delete this course? For reals?!`;
	protected currId: number;

	constructor(private courseService: CourseService) {
		console.log('Courses page constructor');

		this.courseList = [];
	}

	private askForReals(id) {
		//const deleteForReals = confirm('Do you wanna delete this course? For reals?!');
		this.currId = id;
		this.modalHidden = false;

		//if (deleteForReals) {
		//	this.courseList = this.courseService.deleteCourse(id);
		//}
	}

	private closeModal(data) {
		if (data.answer) {
			this.courseList = this.courseService.deleteCourse(data.id);
		}
		this.modalHidden = true;
	}

	public ngOnInit() {
		console.log('Courses page init');

		this.isLoading = true;
		this.courseServiceSubscription = this.courseService.getCourses().subscribe((res: Course[]) => {
			this.courseList = res;
			this.isLoading = false;
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
