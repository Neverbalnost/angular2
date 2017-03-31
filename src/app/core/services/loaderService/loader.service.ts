import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()

export class LoaderService {
	IsLoading: Observable<boolean>;
	private _observer: Observer<any>;

	constructor() {
		this.IsLoading = new Observable(observer =>
		{
			this._observer = observer;
		}).share();
	}

	public Show() {
		this.changeState(true);
	}

	public Hide() {
		this.changeState(false);
	}

	private changeState(state) {
		this._observer.next(state);
	}
}
