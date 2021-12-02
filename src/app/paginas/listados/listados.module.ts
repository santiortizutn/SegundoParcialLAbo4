import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListadosRoutingModule } from './listados-routing.module';
import { ListadosComponent } from './listados.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';


@NgModule({
  declarations: [
    ListadosComponent
  ],
  imports: [
    CommonModule,
    ListadosRoutingModule,
    ComponentesModule
  ]
})
export class ListadosModule { }
