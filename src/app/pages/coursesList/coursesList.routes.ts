import { Routes, RouterModule } from '@angular/router';
import { CoursesListComponent }    from './coursesList.component';

// Route Configuration
const coursesListRoutes: Routes = [
	{ path: 'coursesList', component: CoursesListComponent },
];

export const routes = RouterModule.forChild(coursesListRoutes);
