import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent }    from './loginPage.component';

// Route Configuration
const loginPageRoutes: Routes = [
	{ path: 'login', component: LoginPageComponent },
];

export const routes = RouterModule.forChild(loginPageRoutes);
