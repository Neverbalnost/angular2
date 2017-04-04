import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
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

	private askForReals(id) {
		this.currId = id;
		this.modalHidden = false;
	}

	private sendNewCourseData(courseData) {
		console.log(courseData);
		this.courseService.updateCourse(courseData.id, courseData.data);
	}

	private closeModal(data) {
		let self = this;
		if (data) {
			this.courseList = this.courseService.deleteCourse(this.currId);
		}
		this.modalHidden = true;
		this.loaderService.Show();
		setTimeout(function(){self.loaderService.Hide()}, 200);
	}

	public ngOnInit() {
		let self = this;
		this.loaderService.Show();

		this.courseServiceSubscription = this.courseService.getCourses().subscribe((res: Course[]) => {
			console.log('Got data', res);
			this.courseList = res;
			setTimeout(function(){self.loaderService.Hide()}, 200);
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
