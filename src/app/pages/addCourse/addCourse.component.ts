import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DurationPipe } from './../../core/pipes';

@Component({
	selector: 'add-course',
	encapsulation: ViewEncapsulation.None,
	providers: [DurationPipe],
	styles: [require('./addCourse.styles.scss')],
	template: require('./addCourse.template.html')
})
export class AddCourseComponent implements OnInit, OnDestroy {

	public newCourseForm = this.fb.group({
		title: [''],
		start: [''],
		id: [''],
		duration: [''],
		desc: ['']
	});

	constructor(public fb: FormBuilder) {
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
	}
}
