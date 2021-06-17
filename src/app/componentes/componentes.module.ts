import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { ComponentesRoutingModule } from './componentes-routing.module';
import { BienvenidoComponent } from './bienvenido/bienvenido.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EmailDirective } from '../directivas/email.directive';
import { FormMateriasComponent } from './form-materias/form-materias.component';
import { ListadoProfesorComponent } from './listado-profesor/listado-profesor.component';
import { ListadoAlumnosComponent } from './listado-alumnos/listado-alumnos.component';
import { ListadoMateriasComponent } from './listado-materias/listado-materias.component';



@NgModule({
  declarations: [
    CabeceraComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent,
    EmailDirective,
    FormMateriasComponent,
    ListadoProfesorComponent,
    ListadoAlumnosComponent,
    ListadoMateriasComponent
  ],
  imports: [
    CommonModule,
    ComponentesRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    CabeceraComponent,
    LoginComponent,
    RegistroComponent,
    BienvenidoComponent,
    EmailDirective,
    FormMateriasComponent,
    ListadoProfesorComponent,
    ListadoAlumnosComponent,
    ListadoMateriasComponent
  ]
})
export class ComponentesModule { }