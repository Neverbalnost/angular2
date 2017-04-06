import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'myFilter'
})
export class FilterPipe implements PipeTransform {

	public transform(array, searchText) {
		return array.filter((item) => {
			return item.title.includes(searchText);
		});
	}
}
