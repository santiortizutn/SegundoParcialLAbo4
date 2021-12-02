import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOnlyGuard } from './guards/admin-only.guard';

const routes: Routes = [
  { path: 'principal', loadChildren: () => import('./paginas/principal/principal.module').then(m => m.PrincipalModule) },
  { path: '', loadChildren: () => import('./paginas/ingreso/ingreso.module').then(m => m.IngresoModule) },
  { path: 'alta-usuarios', loadChildren: () => import('./paginas/alta-usuarios/alta-usuarios.module').then(m => m.AltaUsuariosModule), canActivate: [AdminOnlyGuard]},
  { path: 'inscripciones', loadChildren: () => import('./paginas/inscripciones/inscripciones.module').then(m => m.InscripcionesModule) },
  { path: 'alta-criptos', loadChildren: () => import('./paginas/alta-criptos/alta-criptos.module').then(m => m.AltaCriptosModule), canActivate: [AdminOnlyGuard]},
  { path: 'listados', loadChildren: () => import('./paginas/listados/listados.module').then(m => m.ListadosModule), }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
