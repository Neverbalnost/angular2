import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./modal.component.scss')],
})

export class ModalComponent {
	@Input() modalHidden;
	@Input() modalText;
	@Input() currId;

	@Output() public deleteCourse = new EventEmitter();

	public userAnswer(answer: boolean, id: number) {
		this.deleteCourse.emit({answer: answer, id: id});
	}

	constructor() {

	}
}
