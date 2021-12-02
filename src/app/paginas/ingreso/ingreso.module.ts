import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IngresoRoutingModule } from './ingreso-routing.module';
import { IngresoComponent } from './ingreso.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';


@NgModule({
  declarations: [
    IngresoComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    ComponentesModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class IngresoModule { }
