import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaCriptosComponent } from './alta-criptos.component';


const routes: Routes = [{ path: '', component: AltaCriptosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AltaCriptosRoutingModule { }
