import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { Course } from '../../entities';

@Injectable()
export class CourseService {

	private courseListUrl: string = 'assets/mock-data/courses.json';
	private courseList;

	constructor(private http: Http) {
	}

	public getCourses (): Observable<Course[]> {
		return this.http.get(this.courseListUrl)
			.map((response: Response) => response.json())
			.map((courseList: Course[]) => {
				this.courseList = courseList;
				return this.courseList;
			});
	}

	public createCourse() {
		
	}

	public getCourseById() {

	}

	public updateCourse() {

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
