import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltaMateriasRoutingModule } from './alta-materias-routing.module';
import { AltaMateriasComponent } from './alta-materias.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';


@NgModule({
  declarations: [
    AltaMateriasComponent
  ],
  imports: [
    CommonModule,
    AltaMateriasRoutingModule,
    ComponentesModule
  ]
})
export class AltaMateriasModule { }
