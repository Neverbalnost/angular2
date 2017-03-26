import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';
import { ModalModule } from './../modal/modal.module';

@NgModule({
	declarations: [SearchComponent],
	imports: [FormsModule, ModalModule],
	exports: [SearchComponent]
})
export class SearchModule {
	constructor() {
	}
}
