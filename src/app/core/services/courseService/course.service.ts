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
	public courseListUrl: string = `courses`;

	constructor(private http: Http) {}

	public updateCourseList(arr) {
		this.CourseList.next(arr);
	}

	public getCourses (start: number = 0, count: number = 4): Observable<Course[]> {
		console.log('We\'re in place', start, count);
		return this.http.get(`${this.courseListUrl}?start=${start}&count=${count}`)
			.map((response: Response) => {
				console.log(response);
				return response.json();
			})
			// .map((courseList: Course[]) => this.filterOutdatedCourses(courseList))
			.switchMap((filtered) => {
				this.CourseList.next(filtered);
				window.location.href += `?start=${start}&count=${count}`;
				return this.CourseList;
		});
	}

	public createCourse() {
		this.CourseList.next([...this.CourseList.getValue(), {
			name: 'Course',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			date: new Date().toISOString(),
			id: this.getLastId() + 1,
			isTopRated: false,
			length: '360',
			authors: {
				id: 1370,
				firstName: 'Polly',
				lastName: 'Sosa'
			}
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

		if (data.title) { coursetoChange.name = data.title; }
		if (data.id) { coursetoChange.id = data.id; }
		if (data.description) { coursetoChange.description = data.description; }
		if (data.startDate) { coursetoChange.date = data.startDate; }
		if (data.duration) { coursetoChange.length = data.duration; }
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
			const courseDate = (new Date(course.date));
			if (courseDate < currDate) {
				const timeDiff = Math.abs(currDate.getTime() - courseDate.getTime());
				const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(course.name + ' diff days is ' + diffDays);
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
