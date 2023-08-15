import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suffix',
})
export class SuffixPipe implements PipeTransform {
  transform(value: number, suffix?: string): string {
    if (suffix) {
      return `${value} ${suffix}`;
    } else {
      if (value >= 1000) {
        return `${value} kg`;
      } else {
        return `${value} g`;
      }
    }
  }
}
