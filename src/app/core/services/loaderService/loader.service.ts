import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/share';

@Injectable()

export class LoaderService {
	IsLoading: Observable<boolean>;
	private _observer: Observer<any>;

	constructor() {
		console.log('constructor')
		this.IsLoading = new Observable(observer =>
		{
			console.log('---');
			console.log(this._observer);
			this._observer = observer;
		}).share();
		console.log(this.IsLoading, this._observer)
	}

	public changeState(state) {
		console.log(state, this._observer)
		this._observer.next(state);
	}
}
