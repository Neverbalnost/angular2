import { Injectable, EventEmitter } from '@angular/core';
import { Response, Request, RequestOptions, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/share';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()

export class AuthService {
	public IsAuthenticated: Observable<boolean>;
	public UserInfoSource = new BehaviorSubject<string>('User');
	public userInfo = this.UserInfoSource.asObservable();
	private userLoggedIn: boolean = false;
	private _observer: Observer<any>;
	private authUrl: string = 'auth/login';
	private infoUrl: string = 'auth/userinfo';

	constructor(private http: Http) {
		this.IsAuthenticated = new Observable((observer) =>
			this._observer = observer).share();
	}

	public Login(userName, userPass) {
		let currUser = {
			login: userName,
			password: userPass
		};
		return this.http.post(this.authUrl, currUser)
			.catch((error: any) => {
				alert(error._body);
				return Observable.throw(error);
			})
			.map((response: Response) => response.json())
			.subscribe((response) => {
				localStorage.setItem('currUserToken', response.token);
				this.userLoggedIn = true;
				this.changeState(this.userLoggedIn);
				this.GetUserInfo();
			});
	}

	public Logout() {
		localStorage.removeItem('currUser');
		this.userLoggedIn = false;
		this.changeState(this.userLoggedIn);
	}

	public GetUserInfo() {
		const token = JSON.parse(localStorage.getItem('currUserToken'));
		return this.http.post(this.infoUrl, token)
			.catch((error: any) => {
				alert(error._body);
				return Observable.throw(error);
			})
			.map((response: Response) => response.json())
			.subscribe((response) => {
				this.changeUserInfo(response);
			});
	}

	public changeUserInfo(info) {
		this.UserInfoSource.next(info);
	}

	private changeState(state) {
		this._observer.next(state);
	}
}
