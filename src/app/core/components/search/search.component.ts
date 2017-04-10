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

	public newCourseForm = this.fb.group({
		title: [''],
		start: [''],
		id: [''],
		duration: [''],
		desc: ['']
	});

	public modalHidden: boolean = true;
	public modalText;
	public modalTitle: string = 'Starting a new course, huh?';

	constructor(
		private courseService: CourseService,
		private sanitizer: DomSanitizer,
		public fb: FormBuilder, private filter: FilterPipe
		) {
		this.modalText = sanitizer.bypassSecurityTrustHtml(
			`
			<form [formGroup]="newCourseForm" (ngSubmit)="sendCourseData($event)">
				<div class="form-group row">
					<label for="course-title" class="col-2 col-form-label">Title</label>
					<div class="col-10">
						<input class="form-control" formControlName="title" type="text" value="" id="course-title">
					</div>
				</div>

				<div class="form-group row">
					<label for="course-date" class="col-2 col-form-label">Start Date</label>
					<div class="col-10">
						<input class="form-control" formControlName="start" type="date" value="" id="course-date">
					</div>
				</div>

				<div class="form-group row">
					<label for="course-id" class="col-2 col-form-label">Id</label>
					<div class="col-10">
						<input class="form-control" formControlName="id" type="number" value="" id="course-id">
					</div>
				</div>

				<div class="form-group row">
					<label for="course-duration" class="col-2 col-form-label">Duration</label>
					<div class="col-10">
						<input class="form-control" formControlName="duration" id="course-duration">
					</div>
				</div>

				<div class="form-group">
					<label for="course-desc">Description</label>
					<textarea class="form-control" formControlName="desc" id="course-desc" rows="3"></textarea>
				</div>
			</form>
			`
			);
	}

	public sendCourseData(data) {
		if (data) {
			this.courseService.createCourse();
		}
		this.modalHidden = true;
	}

	public clickFind(model: string) {
		const newList = this.filter.transform(this.courseService.courseList, this.searchString);
		this.courseService.updateCourseList(newList);
	}

	public openModal() {
		this.modalHidden = false;
	}
}
