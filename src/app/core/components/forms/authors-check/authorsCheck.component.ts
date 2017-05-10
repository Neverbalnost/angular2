import { Component, Input, forwardRef, OnInit } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	FormControl,
	Validator
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AuthorsService } from '../../../services';

@Component({
	selector: 'authors-input',
	template:
		`
		<div *ngFor="let author of authorsList" >
			<input 
				type="checkbox"
				name="{{author.name}}"
				id="{{author.name}}"
				[checked]="author.checked"
				(change)="onChange($event)">
			<label for="{{author.name}}">{{author.name}}</label>
		</div>
		`,
	providers: [
		AuthorsService,
	{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => AuthorsInputComponent),
		multi: true,
	},
	{
		provide: NG_VALIDATORS,
		useExisting: forwardRef(() => AuthorsInputComponent),
		multi: true,
	}]
})
export class AuthorsInputComponent implements OnInit, ControlValueAccessor, Validator {
	private jsonString: string;
	private parseError: boolean;
	private data: any[] = [];
	private authorsList: [{}];

	constructor(private authorsService: AuthorsService) {}

	public ngOnInit() {
		this.authorsService.getAuthors().subscribe((response) => {
				console.log(response);
				this.authorsList = response;
			});;
	}

	public writeValue(obj: any) {
	}

	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	public validate(c: FormControl) {
		const isValid = this.data.length > 0;
		console.log(isValid);
		return (isValid) ? null : {
			nothingCheckedError: {
				valid: false,
			},
		};
	}

	public registerOnTouched() { }

	private onChange(event) {
		const isChecked = event.target.checked;
		const name = event.target.name;

		if (isChecked) {
			this.data.push(name);
		} else {
			this.data = this.data.filter((el) => {
				return el !== name;
			})
		}
		this.propagateChange(this.data);
	}

	private propagateChange = (_: any) => { };
}