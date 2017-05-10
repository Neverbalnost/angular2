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
		title: ['', [Validators.maxLength(50), Validators.required]],
		start: [this.today, Validators.required],
		id: ['', Validators.required],
		duration: ['', Validators.required],
		author: ['', Validators.required],
		desc: ['', [Validators.maxLength(500), Validators.required]]
	});

	constructor(public fb: FormBuilder, private format: DurationPipe) {
	}
	public sendCourseData(data) {
		console.log('Data submitted: ', data)
	}

	public formatDurarion() {
		this.durationFormated = this.format.transform(this.duration);
	}

	public ngOnInit() {
	}

	public ngOnDestroy() {
	}
}
