import { Component,
		ViewEncapsulation,
		Input,
		Output,
		EventEmitter,
		ChangeDetectionStrategy } from '@angular/core';
import { CourseService } from '../../../core/services';
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

	constructor(
		private courseService: CourseService,
		private filter: FilterPipe,
		private router: Router
	) {}

	public redirectToAdd() {
		this.router.navigate(['add-course']);
	}

	public clickFind(model: string) {
		const newList = this.filter.transform(this.courseService.courseList, this.searchString);
		this.courseService.updateCourseList(newList);
	}
}
