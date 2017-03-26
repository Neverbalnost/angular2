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
	@Input() modalTitle;

	@Output() public userConfirm = new EventEmitter();

	public userAnswer(answer: boolean) {
		this.userConfirm.emit(answer);
	}

	constructor() {

	}
}
