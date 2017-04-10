import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
	public isLoggedIn: boolean = false;
	public authServiceSubscription: Subscription;
	constructor(private authService: AuthService) {
	}

	public ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				this.isLoggedIn = isLogged;
		});
	}

	public ngOnDestroy() {
		this.authServiceSubscription.unsubscribe();
	}
}
