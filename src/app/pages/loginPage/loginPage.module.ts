// angular modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// routes
import { routes } from './loginPage.routes';

// custom components
import { LoginPageComponent } from './loginPage.component';

@NgModule({
	declarations: [
		LoginPageComponent
	],
	imports: [
		routes,
		FormsModule,
		ReactiveFormsModule,
		CommonModule
	],
	providers: []
})
export class LoginPageModule {
	constructor() {
	}
}
