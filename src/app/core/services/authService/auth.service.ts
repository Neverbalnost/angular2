import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';

@Injectable()

export class AuthService {
	public IsAuthenticated: Observable<boolean>;
	public UserInfoSource = new BehaviorSubject<string>('User');
	public userInfo = this.UserInfoSource.asObservable();
	private userLoggedIn: boolean = false;
	private _observer: Observer<any>;

	constructor() {
		this.IsAuthenticated = new Observable((observer) =>
			this._observer = observer).share();
	}

	public Login(userName, userPass) {
		let currUser = {
			name: userName,
			pass: userPass
		};
		localStorage.setItem('currUser', JSON.stringify(currUser));
		this.userLoggedIn = true;
		this.changeState(this.userLoggedIn);
	}

	public Logout() {
		localStorage.removeItem('currUser');
		this.userLoggedIn = false;
		this.changeState(this.userLoggedIn);
	}

	public GetUserInfo() {
		return JSON.parse(localStorage.getItem('currUser')).name;
	}

	public changeUserInfo(info) {
		this.UserInfoSource.next(info);
	}

	private changeState(state) {
		this._observer.next(state);
	}
}
