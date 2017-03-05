import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';

import { LogoComponent } from './logo/logo.component';

@NgModule({
	declarations: [
		HeaderComponent,
		LogoComponent
	],
	imports: [RouterModule],
	exports: [HeaderComponent]
})
export class HeaderModule {
	constructor() {
	}
}
