import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'add-course',
	encapsulation: ViewEncapsulation.None,
	providers: [],
	styles: [require('./addCourse.styles.scss')],
	template: require('./addCourse.template.html')
})
export class AddCourseComponent implements OnInit, OnDestroy {

	constructor() {
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
	}
}
