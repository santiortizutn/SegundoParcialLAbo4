import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuariosComponent } from './alta-usuarios.component';

const routes: Routes = [{ path: '', component: AltaUsuariosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaUsuariosRoutingModule { }
