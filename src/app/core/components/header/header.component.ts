import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../core/services';

@Component({
	selector: 'main-header',
	templateUrl: 'header.component.html',
	styles: [require('./header.component.scss')],
	providers: [AuthService],
	encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
	isLoggedIn: boolean;
	constructor(private authService: AuthService) {
	}
	ngOnInit() {
		this.isLoggedIn = this.authService.IsAuthenticated();
	}
}
