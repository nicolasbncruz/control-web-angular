import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textoVacio'
})
export class EmptyTextPipe implements PipeTransform{

  transform(value: any): any {
    if (value === null || value==='') return '-';
    else return value;
  }

}
