import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { Course } from '../../entities';

@Injectable()
export class CourseService {

	private todoListUrl: string = 'assets/mock-data/courses.json';

	constructor(private http: Http) {
	}

	public getTodoItems (): Observable<Course[]> {
		return this.http.get(this.todoListUrl)
			.map((response: Response) => response.json())
			.map((courseList: Course[]) => {
				// change return value structure here if you want
				return courseList;
			});
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
