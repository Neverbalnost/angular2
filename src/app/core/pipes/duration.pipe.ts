import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60) == 0 ? '' : Math.floor(value / 60);
    const minutes = value % 60 == 0 ? '' : value % 60;
    let hourText: string = '';
    let minuteText: string = '';

    if (hours > 1) {
      hourText = 'hours';
    } else if (hours == 1) {
      hourText = 'hour'
    }

    if (minutes > 1) {
      minuteText = 'minutes';
    } else if (minutes == 1) {
      minuteText = 'minut'
    }

    return `${hours} ${hourText} ${minutes} ${minuteText}`;
  }
}