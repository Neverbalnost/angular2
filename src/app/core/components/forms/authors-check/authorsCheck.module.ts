import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthorsInputComponent } from './authorsCheck.component';


@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	exports: [
		AuthorsInputComponent,
	],
	declarations: [
		AuthorsInputComponent,
	],
	providers: [],
})
export class AuthorsInputModule { }
