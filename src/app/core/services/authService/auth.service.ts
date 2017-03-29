import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()

export class AuthService {
	private userLoggedIn: boolean = false;
	IsAuthenticated: Observable<boolean>;
	private _observer: Observer<any>;

	constructor() {
		this.IsAuthenticated = new Observable(observer =>
			this._observer = observer).share();
	}

	private changeState(state) {
		this._observer.next(state);
	}

	public Login(name, pass) {
		let currUser = {
			name: name,
			pass: pass
		}
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
}
