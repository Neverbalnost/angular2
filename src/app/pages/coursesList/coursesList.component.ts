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
	protected modalHidden: boolean = true;
	protected modalText: string = `Do you wanna delete this course? For reals?!`;
	protected modalTitle: string = `Delete this course?`;
	protected currId: number;

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
		if (data) {
			this.courseList = this.courseService.deleteCourse(this.currId);
		}
		this.modalHidden = true;
	}

	public ngOnInit() {
		console.log('Courses page init');
		// this.loaderService.changeState(true);
		this.isLoading = true;

		this.courseServiceSubscription = this.courseService.getCourses().subscribe((res: Course[]) => {
			this.courseList = res;
			// this.loaderService.changeState(false);
			this.isLoading = false;
		});
	}

	public ngOnDestroy() {
		this.courseServiceSubscription.unsubscribe();
	}
}
