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
import { FormCriptosComponent } from './form-criptos/form-criptos.component';
import { ListadoUsuariosComponent } from './listado-usuarios/listado-usuarios.component';
import { FiltroPipe } from '../pipes/filtro.pipe';
import { ListadoCriptosComponent } from './listado-criptos/listado-criptos.component';
import { ComisionPipe } from '../pipes/comision.pipe';



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
    ListadoMateriasComponent,
    FormCriptosComponent,
    ListadoUsuariosComponent,
    FiltroPipe,
    ComisionPipe,
    ListadoCriptosComponent
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
    ListadoMateriasComponent,
    FormCriptosComponent,
    ListadoUsuariosComponent,
    ListadoCriptosComponent
  ]
})
export class ComponentesModule { }
