import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { Router } from '@angular/router';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	username: string;
	constructor(private authService: AuthService, private router: Router) {
	}

	private logout() {
		this.authService.Logout();
	}

	ngOnInit() {
		if (this.authService.IsAuthenticated()) {
			this.username = this.authService.GetUserInfo();
		}
		this.authService.authStateChange.subscribe(
			(isLogged) => {
				if (this.authService.IsAuthenticated()) {
					this.username = this.authService.GetUserInfo();
				} else {
					console.log('Bye!')
					this.router.navigate(['login']);
				}
			}
		);
	}
}
