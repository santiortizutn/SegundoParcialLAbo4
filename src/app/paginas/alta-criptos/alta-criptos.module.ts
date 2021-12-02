import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaCriptosComponent } from './alta-criptos.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { AltaCriptosRoutingModule } from './alta-criptos-routing.module';



@NgModule({
  declarations: [AltaCriptosComponent],
  imports: [
    CommonModule,
    ComponentesModule,
    AltaCriptosRoutingModule
  ]
})
export class AltaCriptosModule { }
