import { Injectable } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';

import { TodoItem } from '../../entities';

@Injectable()
export class CourseService {

	private todoListUrl: string = 'assets/mock-data/courses.json';

	constructor(private http: Http) {
	}

	public getTodoItems (): Observable<TodoItem[]> {
		return this.http.get(this.todoListUrl)
			.map((response: Response) => response.json())
			.map((todoItems: TodoItem[]) => {
				// change return value structure here if you want
				return todoItems;
			});
	}

	private extractData(res: Response) {
		let body = res.json();
		return body.data || { };
	}
}
