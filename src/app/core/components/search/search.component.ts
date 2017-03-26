import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../core/services';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
	protected modalHidden: boolean = true;

	protected modalTitle: string = 'Starting a new course, huh?'

	@Input() public searchString: string;

	constructor(private courseService: CourseService) {
	}

	private clickFind(model: string) {
		console.log(`You've tried seaching for 
"${this.searchString}", but unfortunately seach doesn't work yet.`);
	}

	openModal() {
		this.modalHidden = false;
	}

	private closeModal(data) {
		this.modalHidden = true;
	}

	private addCourse() {
		this.courseService.createCourse();
	}
}
