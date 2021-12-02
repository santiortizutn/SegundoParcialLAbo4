import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(value: any, arg: any): unknown {
    const resultPost= [];

    for(const user of value){
      if(user.tipo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPost.push(user);
      }else{
        if(user.correo.toLowerCase().indexOf(arg.toLowerCase()) > -1){
          resultPost.push(user);
        }
      }
    }
    return resultPost
  }

}
