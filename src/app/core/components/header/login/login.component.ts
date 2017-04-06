import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
	public subscription: Subscription;
	public username: string;
	public authServiceSubscription: Subscription;

	constructor (private authService: AuthService, private router: Router) {
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
					this.router.navigate(['login']);
		});
		this.subscription = this.authService.userInfo
						.subscribe((username) => this.username = username);
	}

	public logout() {
		this.authService.Logout();
	}
}
