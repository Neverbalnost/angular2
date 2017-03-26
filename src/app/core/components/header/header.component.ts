import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../core/services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	isLoggedIn: boolean = false;
	constructor(private authService: AuthService) {
	}
	ngOnInit() {
		this.authService.authStateChange.subscribe(
			(isLogged) => {
				this.isLoggedIn = this.authService.IsAuthenticated();
			}
		);
	}
}
