import { Routes } from '@angular/router';
import { CoursesListComponent } from './pages/coursesList';
import { NoContentComponent } from './pages/no-content';

export const ROUTES: Routes = [
	{path: '', component: CoursesListComponent},
	{path: 'courses', component: CoursesListComponent},
	{path: '**', component: NoContentComponent},
];
