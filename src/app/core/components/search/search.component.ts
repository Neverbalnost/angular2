import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

	@Input() public searchString: string;

	@Output() public searchStringChange = new EventEmitter<string>();

	public onStringChange(model: string) {
		this.searchString = model;
		this.searchStringChange.emit(model);
	}
}
