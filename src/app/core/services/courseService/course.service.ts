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
				const filteredList = courseList.filter((course) => {
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

				this.courseList = filteredList;
				this.CourseListSource.next(filteredList);
				return filteredList;
			});
	}

	public createCourse() {
		this.CourseListSource.next([...this.courseList, {
			title: 'Course',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			startDate: new Date().toISOString(),
			id: this.getLastId() + 1,
			topRated: false,
			duration: '360'
		}]);
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
		this.CourseListSource.next(this.courseList);
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
