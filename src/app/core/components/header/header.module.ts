import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

import { LogoComponent } from './logo/logo.component';
import { LoginComponent } from './login/login.component';

@NgModule({
	declarations: [
		HeaderComponent,
		LogoComponent,
		LoginComponent
	],
	imports: [RouterModule],
	exports: [HeaderComponent]
})
export class HeaderModule {
	constructor() {
	}
}
