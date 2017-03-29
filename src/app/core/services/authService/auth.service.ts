import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()

export class AuthService {
	private userLoggedIn: boolean = false;
	IsAuthenticated: Observable<boolean>;
	private _observer: Observer<any>;

	// authStateChange:EventEmitter<boolean> = new EventEmitter<boolean>();
	constructor() {
		this.IsAuthenticated = new Observable(observer =>
			this._observer = observer).share();
	}

	private changeState(state) {
		this._observer.next(state);
	}

	public getState() {
		return this.userLoggedIn;
	}

	public Login(name, pass) {
		let currUser = {
			name: name,
			pass: pass
		}
		localStorage.setItem('currUser', JSON.stringify(currUser));
		this.userLoggedIn = true;
		this.changeState(this.userLoggedIn);
		// this.authStateChange.emit(this.userLoggedIn);
	}

	public Logout() {
		localStorage.removeItem('currUser');
		this.userLoggedIn = false;
		this.changeState(this.userLoggedIn);
		// this.authStateChange.emit(this.userLoggedIn);
	}

	public GetUserInfo() {
		return JSON.parse(localStorage.getItem('currUser')).name;
	}

	// public IsAuthenticated(): Observable<boolean> {
	// 	console.log('Observable is ', this.userLoggedIn)
	// 	return Observable.of(this.userLoggedIn);
	// }
}
