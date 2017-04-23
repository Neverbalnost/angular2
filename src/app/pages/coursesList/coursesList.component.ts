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

	constructor(
		private courseService: CourseService,
		private loaderService: LoaderService) {

		this.courseList = [];
	}

	public ngOnInit() {
		let params = this.getUrlParams();
		this.loaderService.Show();
		this.courseServiceSubscription = this.courseService
		.getCourses(params.start, params.count)
		.subscribe((res: Course[]) => {
			this.processCourses(res);
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}

	private processCourses(res) {
		this.courseList = res;
		setTimeout(() => { this.loaderService.Hide(); }, 200);
	}

	private getSearchResult(searchString) {
		let params = this.getUrlParams();
		console.log('searchString is: ', searchString);
		this.courseServiceSubscription = this.courseService
		.getCourses(params.start, params.count, searchString)
		.subscribe((res: Course[]) => {
			this.processCourses(res);
		});
	}

	private askForReals(id) {
		this.currId = id;
		this.modalHidden = false;
	}

	private getUrlParams() {
		const regex = /[?&]([^=#]+)=([^&#]*)/g;
		const url = window.location.href;
		let params = {start: undefined, count: undefined};
		let match;
		while (match = regex.exec(url)) {
			params[match[1]] = match[2];
		}
		return params;
	}

	private giveNextCourses() {
		let params = this.getUrlParams();
		this.courseServiceSubscription = this.courseService
		.getCourses(parseInt(params.start, 10) + parseInt(params.count, 10), params.count)
		.subscribe((res: Course[]) => {
			this.processCourses(res);
		});
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
