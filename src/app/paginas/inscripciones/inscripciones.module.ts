import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesComponent } from './inscripciones.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    ComponentesModule,
    FormsModule
  ]
})
export class InscripcionesModule { }
