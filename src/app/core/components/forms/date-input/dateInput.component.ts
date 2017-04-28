import { Component, Input, forwardRef } from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	FormControl
	} from '@angular/forms';

@Component({
	selector: 'date-input',
	template:
		`
		<input
			class="form-control"
			placeholder="mm/dd/yyyy"
			[value]="date" 
			(input)="onChange($event)" 
			(keyup)="onChange($event)">
		`,
	providers: [
	{
		provide: NG_VALUE_ACCESSOR,
		useExisting: forwardRef(() => DateInputComponent),
		multi: true,
	}]
})
export class DateInputComponent implements ControlValueAccessor {
	public date: Date;
	private data: any;

	public writeValue(date: any) {
		this.date = date;
	}

	public registerOnChange(fn: any) {
		this.propagateChange = fn;
	}

	public registerOnTouched() { }

	public onChange(event) {

		let newValue = new Date(event.target.value);

		if (isNaN(newValue.getTime())) {
			this.data = null;
		} else {
			this.data = newValue;
		}
		console.log('Got input!', this.data);
		this.propagateChange(this.data);
	}

	private propagateChange = (_: any) => { };
}