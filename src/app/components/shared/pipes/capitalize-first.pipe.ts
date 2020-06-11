import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeFirst'
})
export class CapitalizeFirstPipe implements PipeTransform {

  transform(value: any): any {
    if (value === null) return 'Not assigned';
     return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }

}
