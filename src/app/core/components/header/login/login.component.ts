import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
	public userInfo: Subscription;
	public username: string;
	public isAuthSubscription: Subscription;

	constructor (private authService: AuthService, private router: Router) {
	}

	public ngOnInit() {
		this.isAuthSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
					this.router.navigate(['login']);
		});
		this.userInfo = this.authService.userInfo
						.subscribe((username) => this.username = username);
	}

	public ngOnDestroy() {
		this.isAuthSubscription.unsubscribe();
		this.userInfo.unsubscribe();
	}

	public logout() {
		this.authService.Logout();
	}
}
