import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaMateriasComponent } from './alta-materias.component';

const routes: Routes = [{ path: '', component: AltaMateriasComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaMateriasRoutingModule { }
