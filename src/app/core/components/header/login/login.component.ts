import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../../core/services';

@Component({
	selector: 'login',
	templateUrl: 'login.component.html',
	providers: [AuthService],
	encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
	username: string;
	constructor(private authService: AuthService) {

	}
	ngOnInit() {
		this.username = this.authService.GetUserInfo();
	}
}
