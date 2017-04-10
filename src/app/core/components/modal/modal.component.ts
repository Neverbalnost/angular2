import { Component,
	ViewEncapsulation,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./modal.component.scss')],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalComponent {
	@Input() public modalHidden;
	@Input() public modalText;
	@Input() public modalTitle;

	@Output() public userConfirm = new EventEmitter();

	constructor() {	}

	public userAnswer(answer: boolean) {
		this.userConfirm.emit(answer);
	}
}
