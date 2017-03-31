import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	private subscription: Subscription;
	private username: string;
	constructor(private authService: AuthService, private router: Router) {
	}
	private authServiceSubscription: Subscription;
	private logout() {
		this.authService.Logout();
	}

	ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
					this.router.navigate(['login']);
		});
		this.subscription = this.authService.userInfo
						.subscribe(username => this.username = username);
	}
}
