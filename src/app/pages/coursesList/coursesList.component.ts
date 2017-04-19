import { Component, ViewEncapsulation, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { CourseService } from '../../core/services';
import { LoaderService } from '../../core/services';
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
	private modalHidden: boolean = true;
	private modalText: string = `Do you wanna delete this course? For reals?!`;
	private modalTitle: string = `Delete this course?`;
	private currId: number;

	constructor(private courseService: CourseService, private loaderService: LoaderService) {
		console.log('Courses page constructor');

		this.courseList = [];
	}

	public ngOnInit() {
		this.loaderService.Show();
		this.courseServiceSubscription = this.courseService.getCourses().subscribe((res: Course[]) => {
			console.log('Got data', res);
			this.courseList = res;
			setTimeout(() => { this.loaderService.Hide(); }, 200);
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}

	private getSearchResult(data) {
		this.courseList = data;
	}

	private askForReals(id) {
		this.currId = id;
		this.modalHidden = false;
	}

	private giveNextCouses() {
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
		const url = window.location.href;
		let params = {start: undefined, count: undefined};
		let match;
		while (match = regex.exec(url)) {
			params[match[1]] = match[2];
		}
		this.courseService.getCourses(parseInt(params.count, 10), parseInt(params.count, 10) + 4);
	}

	private sendNewCourseData(courseData) {
		this.courseService.updateCourse(courseData.id, courseData.data);
	}

	private closeModal(data) {
		this.courseService.deleteCourse(this.currId);
		this.modalHidden = true;
		this.loaderService.Show();
		setTimeout(() => { this.loaderService.Hide(); }, 200);
	}
}
