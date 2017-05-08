import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services';
import { LoaderService } from '../../core/services';
import { FormBuilder, Validators } from '@angular/forms';

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

	public loginForm = this.fb.group({
		login: ['', Validators.required],
		password: ['', Validators.required]
	});

	constructor(
		private authService: AuthService,
		private router: Router,
		private loaderService: LoaderService,
		public fb: FormBuilder) {
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
		this.authServiceSubscription.unsubscribe();
	}

	private login(data) {
		let self = this;
		this.loaderService.Show();
		setTimeout(() => { self.loaderService.Hide(); }, 300);
		this.authService.changeUserInfo(name);
		this.authService.Login(data.login, data.password);
	}
}
