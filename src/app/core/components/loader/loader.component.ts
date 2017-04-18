import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { LoaderService } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
	selector: 'loader',
	templateUrl: './loader.component.html',
	styles: [require('./loader.component.scss')]
})
export class LoaderComponent implements OnInit, OnDestroy {
	public isLoading: boolean = false;
	public loaderServiceSubscription: Subscription;
	constructor(private loaderService: LoaderService) {
	}

	public ngOnInit() {
		this.loaderServiceSubscription = this.loaderService.IsLoading.subscribe(
			(isLoading: boolean) => {
				this.isLoading = isLoading;
		});
	}

	public ngOnDestroy() {
		this.loaderServiceSubscription.unsubscribe();
	}

}
