import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

	@Input() public searchString: string;

	public clickFind(model: string) {
		console.log(`You've tried seaching for "${this.searchString}", but unfortunately seach doesn't work yet.`);
	}
}
