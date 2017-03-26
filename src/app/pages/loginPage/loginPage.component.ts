import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services';

@Component({
	selector: 'login-page',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./loginPage.styles.scss')],
	template: require('./loginPage.template.html')
})
export class LoginPageComponent implements OnInit, OnDestroy {

	constructor(private authService: AuthService, private router: Router) {
	}

	private login(name, pass) {
		this.authService.Login(name, pass);
	}

	public ngOnInit() {
		this.authService.authStateChange.subscribe(
			(isLogged) => {
				console.log('Got it!')
				this.router.navigate(['courses']);
			}
		);
	}

	public ngOnDestroy() {
	}
}
