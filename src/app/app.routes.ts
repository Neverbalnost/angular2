import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/coursesList';
import { NoContentComponent } from './pages/no-content';
import { LoginPageComponent } from './pages/loginPage';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: 'courses', component: CoursesListComponent},
	{path: 'login', component: LoginPageComponent},
	{path: '**', component: NoContentComponent},
];
