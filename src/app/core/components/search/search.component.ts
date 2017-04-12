import { Component,
		ViewEncapsulation,
		Input,
		Output,
		EventEmitter,
		ChangeDetectionStrategy } from '@angular/core';
import { CourseService } from '../../../core/services';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { FilterPipe } from './../../pipes';
import { Router } from '@angular/router';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [FilterPipe],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

	@Input() public searchString: string;
	public modalHidden: boolean = true;
	public modalText;
	public modalTitle: string = 'Starting a new course, huh?';

	constructor(
		private courseService: CourseService,
		private filter: FilterPipe,
		private router: Router
	) {}

	public sendCourseData(data) {
		if (data) {
			this.courseService.createCourse();
		}
		this.modalHidden = true;
	}

	public redirectToAdd() {
		this.router.navigate(['add-course']);
	}

	public clickFind(model: string) {
		const newList = this.filter.transform(this.courseService.courseList, this.searchString);
		this.courseService.updateCourseList(newList);
	}

	public openModal() {
		this.modalHidden = false;
	}
}
