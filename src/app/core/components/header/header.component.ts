import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	private isLoggedIn: boolean = false;
	private authServiceSubscription: Subscription;
	constructor(private authService: AuthService) {
	}

	ngOnInit() {
		this.authServiceSubscription = this.authService.IsAuthenticated.subscribe(
			(isLogged: boolean) => {
				this.isLoggedIn = isLogged;
		});
	}
}
