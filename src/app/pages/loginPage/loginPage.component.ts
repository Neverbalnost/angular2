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
		this.authService.Login(name, pass);
	}

	public ngOnInit() {
		this.loaderService.changeState(true);
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				if (isLogged) {
					this.router.navigate(['courses']);
				}
		});
	}

	ngAfterViewInit() {
		this.loaderService.changeState(false);
	}

	public ngOnDestroy() {
	}
}
