import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AltaUsuariosRoutingModule } from './alta-usuarios-routing.module';
import { AltaUsuariosComponent } from './alta-usuarios.component';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AltaUsuariosComponent
  ],
  imports: [
    CommonModule,
    AltaUsuariosRoutingModule,
    ComponentesModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AltaUsuariosModule { }
