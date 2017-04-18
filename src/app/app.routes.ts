import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/coursesList';
import { NoContentComponent } from './pages/no-content';
import { LoginPageComponent } from './pages/loginPage';
import { AddCourseComponent } from './pages/addCourse';

export const ROUTES: Routes = [
	{path: '', redirectTo: '/login', pathMatch: 'full'},
	{path: 'courses', component: CoursesListComponent},
	{path: 'add-course', component: AddCourseComponent},
	{path: 'login', component: LoginPageComponent},
	{path: '**', component: NoContentComponent},
];
