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
	private username: string = 'Stranger';
	constructor(private authService: AuthService, private router: Router) {
	}
	private authServiceSubscription: Subscription;
	private logout() {
		this.authService.Logout();
	}

	ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				if (isLogged) {
					this.username = this.authService.GetUserInfo();
				} else {
					this.router.navigate(['login']);
				}
		});
	}
}
