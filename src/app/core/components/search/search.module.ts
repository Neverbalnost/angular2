import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

@NgModule({
	declarations: [SearchComponent],
	imports: [FormsModule],
	exports: [SearchComponent]
})
export class SearchModule {
	constructor() {
	}
}
