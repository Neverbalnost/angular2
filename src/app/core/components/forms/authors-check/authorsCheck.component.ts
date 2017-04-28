import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	FormControl,
	Validator
} from '@angular/forms';

@Component({
	selector: 'authors-input',
	template:
		`
		<div *ngFor="let hero of heroList" >
			<input 
				type="checkbox"
				name="{{hero.name}}"
				id="{{hero.name}}"
				[checked]="hero.checked"
				(change)="onChange($event)">
			<label for="{{hero.name}}">{{hero.name}}</label>
		</div>
		`,
	providers: [
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
export class AuthorsInputComponent implements ControlValueAccessor, Validator {
	private jsonString: string;
	private parseError: boolean;
	private data: any[] = [];
	private heroList = [
		{name: 'Batman', checked: false},
		{name: 'Spiderman', checked: false},
		{name: 'Deadpool', checked: false},
		{name: 'Green Lantern', checked: false},
		{name: 'Black Widow', checked: false},
		{name: 'Mr. Manhattan', checked: false},
		{name: 'Wolverine', checked: false},
		{name: 'Rogue', checked: false}
	];

	public writeValue(obj: any) {
	}

	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	public validate(c: FormControl) {
		const isValid = this.data.length > 0;
		console.log(isValid);
		return (isValid) ? null : {
			nothincgCheckedError: {
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
				return el != name;
			})
		}
		this.propagateChange(this.data);
	}

	private propagateChange = (_: any) => { };
}