import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services';
import { LoaderService } from '../../core/services';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./loginPage.styles.scss')],
	template: require('./loginPage.template.html')
})
export class LoginPageComponent implements OnInit, OnDestroy {
	private isLoggedIn: boolean = false;
	private authServiceSubscription: Subscription;
	constructor(private authService: AuthService, private router: Router, private loaderService: LoaderService) {
	}

	private login(name, pass) {
		let self = this;
		this.loaderService.Show();
		setTimeout(function(){self.loaderService.Hide()}, 300);
		this.authService.changeUserInfo(name);
		this.authService.Login(name, pass);
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				if (isLogged) {
					this.router.navigate(['courses']);
				}
		});
	}

	public ngOnDestroy() {
	}
}
