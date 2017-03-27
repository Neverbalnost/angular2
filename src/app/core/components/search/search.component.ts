import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from '../../../core/services';
import {DomSanitizer} from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'search',
	templateUrl: './search.component.html',
	styles: [require('./search.component.scss')],
	providers: [],
	encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
	protected modalHidden: boolean = true;
	protected modalText;
	protected modalTitle: string = 'Starting a new course, huh?'

	@Input() public searchString: string;


	public newCourseForm = this.fb.group({
		title: [''],
		start: [''],
		id: [''],
		duration: [''],
		desc: ['']
	});

	constructor(private courseService: CourseService, private sanitizer: DomSanitizer, public fb: FormBuilder) {
		this.modalText= sanitizer.bypassSecurityTrustHtml(
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
						<input class="form-control" formControlName="duration" type="text" value="" id="course-duration">
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

	sendCourseData(data) {
		if (data) {
			this.courseService.createCourse();
		}
		this.modalHidden = true;
	}

	private clickFind(model: string) {
		console.log(`You've tried seaching for 
"${this.searchString}", but unfortunately seach doesn't work yet.`);
	}

	private openModal() {
		this.modalHidden = false;
	}
}
