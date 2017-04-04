import { Pipe, PipeTransform } from '@angular/core';
import { Course } from './../entities';

@Pipe({name: 'orderBy'})
export class OrderByPipe implements PipeTransform {
  transform(value: Course): number {
    return 1;
  }
}