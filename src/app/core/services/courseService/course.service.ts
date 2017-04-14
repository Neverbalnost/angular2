import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import 'rxjs/add/operator/map';

import { Course } from '../../entities';

@Injectable()
export class CourseService {

	public CourseList = new BehaviorSubject<Course[]>([]);
	public CourseListObservable = this.CourseList.asObservable();
	public courseListUrl: string = 'assets/mock-data/courses.json';

	constructor(private http: Http) {}

	public updateCourseList(arr) {
		this.CourseList.next(arr);
	}

	public getCourses (): Observable<Course[]> {
		return this.http.get(this.courseListUrl)
			.map((response: Response) => response.json())
			.map((courseList: Course[]) => this.filterOutdatedCourses(courseList))
			.switchMap((filtered) => {
				this.CourseList = new BehaviorSubject<Course[]>(filtered);
				return this.CourseList;
		});
	}

	public createCourse() {
		this.CourseList.next([...this.CourseList.getValue(), {
			title: 'Course',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			startDate: new Date().toISOString(),
			id: this.getLastId() + 1,
			topRated: false,
			duration: '360'
		}]);
	}

	public getCourseById(id) {
		return this.CourseList.getValue().find((course) => {
			return course.id === id;
		});
	}

	public getLastId() {
		return this.CourseList.getValue()[this.CourseList.getValue().length - 1].id;
	}

	public updateCourse(id, data) {
		const coursetoChange = this.getCourseById(id);

		if (data.title) { coursetoChange.title = data.title; }
		if (data.id) { coursetoChange.id = data.id; }
		if (data.description) { coursetoChange.description = data.description; }
		if (data.startDate) { coursetoChange.startDate = data.startDate; }
		if (data.duration) { coursetoChange.duration = data.duration; }
	}

	public deleteCourse(id) {
		this.CourseList.next(this.CourseList.getValue().filter((course) => {
			if (course.id !== id) { return true; }
			return false;
		}));
	}

	private filterOutdatedCourses(courseList: Course[]): Course[] {
		return courseList.filter((course) => {
			const currDate = new Date();
			const courseDate = (new Date(course.startDate));
			if (courseDate < currDate) {
				const timeDiff = Math.abs(currDate.getTime() - courseDate.getTime());
				const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(course.title + ' diff days is ' + diffDays);
				if (diffDays > 14 ) { return false; }
			}
			return true;
		});
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
