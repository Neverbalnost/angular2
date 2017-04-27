import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DurationPipe } from './../../core/pipes';

@Component({
	selector: 'add-course',
	encapsulation: ViewEncapsulation.None,
	providers: [DurationPipe],
	styles: [require('./addCourse.styles.scss')],
	template: require('./addCourse.template.html')
})
export class AddCourseComponent implements OnInit, OnDestroy {

	public duration: number;
	public durationFormated: string;
	public today = new Date().toLocaleDateString();

	public newCourseForm = this.fb.group({
		title: ['', Validators.maxLength(50)],
		start: [this.today, Validators.maxLength(500)],
		id: [''],
		duration: [''],
		desc: ['']
	});

	constructor(public fb: FormBuilder, private format: DurationPipe) {
	}

	public formatDurarion() {
		this.durationFormated = this.format.transform(this.duration);
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
	}
}
