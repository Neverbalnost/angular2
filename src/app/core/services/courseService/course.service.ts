import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';

import 'rxjs/add/operator/map';

import { Course } from '../../entities';

@Injectable()
export class CourseService {

	public courseList: Course[];
	public CourseListSource = new BehaviorSubject<Course[]>([]);
	public CourseList = this.CourseListSource.asObservable();
	public courseListUrl: string = 'assets/mock-data/courses.json';
	public initialSubscription = this.getCourses().subscribe((res: Course[]) => {
			this.courseList = res;
	});

	constructor(private http: Http) {}

	public updateCourseList(arr) {
		this.CourseListSource.next(arr);
	}

	public getCourses (): Observable<Course[]> {
		return this.http.get(this.courseListUrl)
			.map((response: Response) => response.json())
			.map((courseList: Course[]) => {
				this.courseList = courseList;
				this.CourseListSource.next(courseList);
				return this.courseList;
			});
	}

	public createCourse() {
		this.courseList.push({
			title: 'Course',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			startDate: new Date(),
			id: this.getLastId() + 1,
			topRated: false,
			duration: '3 hours'
		});
	}

	public getCourseById(id) {
		return this.courseList.find((course) => {
			return course.id === id;
		});
	}

	public getLastId() {
		return this.courseList[this.courseList.length - 1].id;
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
		this.courseList = this.courseList.filter((course) => {
			if (course.id !== id) { return true; }
			return false;
		});

		return this.courseList;
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
