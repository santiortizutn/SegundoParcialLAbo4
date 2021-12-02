import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comision'
})
export class ComisionPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    if (value < 10) {
      return 'Baja comision'
    }
    if (value >= 10 && value <= 20) {
      return 'Buena comision'
    }
    if (value > 20) {
      return 'Mucha comision'
    }
  }

}
