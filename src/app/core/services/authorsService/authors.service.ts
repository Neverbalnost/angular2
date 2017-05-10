import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthorsService {

	constructor(private http: Http) {}

	public getAuthors() {
		return this.http.get("authors")
			.map((response: Response) => response.json())
	}
}