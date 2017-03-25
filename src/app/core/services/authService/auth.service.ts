import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {
	private userLoggedIn: boolean = false;

	public Login(name, pass) {
		let currUser = {
			name: name,
			pass: pass
		}
		localStorage.setItem('currUser', JSON.stringify(currUser));
		this.userLoggedIn = true;
	}

	public Logout() {
		localStorage.removeItem('currUser');
		this.userLoggedIn = false;
	}

	public GetUserInfo() {
		return JSON.parse(localStorage.getItem('currUser')).name;
	}

	public IsAuthenticated() {
		return this.userLoggedIn;
	}
}
