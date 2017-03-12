import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

	@Input() searchString:string;
	@Output() searchStringChange = new EventEmitter<string>();
	onStringChange(model: string){
		
		this.searchString = model;
		this.searchStringChange.emit(model);
	}

	constructor() {

	}
}
