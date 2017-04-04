import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe{

	transform(array, searchText){
		return array.filter((item)=> {
			return item.title.includes(searchText);
		});
	}
}