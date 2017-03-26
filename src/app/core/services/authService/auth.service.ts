import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class AuthService {
	private userLoggedIn: boolean = false;

	authStateChange:EventEmitter<boolean> = new EventEmitter<boolean>();

	public Login(name, pass) {
		let currUser = {
			name: name,
			pass: pass
		}
		localStorage.setItem('currUser', JSON.stringify(currUser));
		this.userLoggedIn = true;
		this.authStateChange.emit(this.userLoggedIn);
	}

	public Logout() {
		localStorage.removeItem('currUser');
		this.userLoggedIn = false;
		this.authStateChange.emit(this.userLoggedIn);
	}

	public GetUserInfo() {
		return JSON.parse(localStorage.getItem('currUser')).name;
	}

	public IsAuthenticated() {
		return this.userLoggedIn;
	}
}
