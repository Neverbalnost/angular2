/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	OnDestroy,
	ViewEncapsulation,
	NgZone
} from '@angular/core';
import { AppState } from './app.service';
import { LoaderService } from './core/services';
import { AuthService } from './core/services';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

/*
 * App Component
 * Top Level Component
 */
@Component({
	selector: 'app',
	encapsulation: ViewEncapsulation.None,
	styles: [
		require('./styles/vendors.scss'),
		require('./styles/index.scss'),
		require('./app.styles.scss')
	],
	providers: [AuthService, LoaderService],
	template: require('./app.template.html')
})
export class AppComponent implements OnInit, OnDestroy {
	private isLoggedIn: boolean = false;
	private authServiceSubscription: Subscription;
	constructor(private authService: AuthService, private router: Router, private ngZone: NgZone) {
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				this.isLoggedIn = isLogged;
		});
		if (!this.isLoggedIn) {
			this.router.navigate(['login']);
		}
		this.ngZone.onUnstable.subscribe((data) => console.log('unstable', data));
		this.ngZone.onStable.subscribe((data) => console.log('stable', data));
	}

	public ngOnDestroy() {
		this.authServiceSubscription.unsubscribe();
	}
}
