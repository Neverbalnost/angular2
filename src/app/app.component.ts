/*
 * Angular 2 decorators and services
 */
import {
	Component,
	OnInit,
	ViewEncapsulation
} from '@angular/core';
import { AppState } from './app.service';
import { AuthService } from './core/services';
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
	providers: [AuthService],
	template: require('./app.template.html')
})
export class AppComponent implements OnInit {
	private isLoggedIn: boolean;
	constructor(private authService: AuthService) {
	}

	public ngOnInit() {
		this.isLoggedIn = this.authService.IsAuthenticated();
		this.authService.authStateChange.subscribe(
			(isLogged) => {
				this.isLoggedIn = this.authService.IsAuthenticated();
			}
		);
	}
}
