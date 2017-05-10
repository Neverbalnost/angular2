import { Component } from '@angular/core';

@Component({
	selector: 'no-content',
	template: `
		<div>
			<h1>404: This URL is not heroic enough!</h1>
			<img src="assets/img/404.jpg">
		</div>
	`
})
export class NoContentComponent {

}
