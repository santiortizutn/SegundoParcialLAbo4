import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../clases/enums';
import { Usuario } from '../clases/usuario';
import { UsuariosService } from '../servicios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminOnlyGuard implements CanActivate {

  usuarioActivo : Usuario;

  constructor(private usService : UsuariosService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.usuarioActivo = this.usService.traerPorEmail(localStorage.getItem("UsuarioActual"));
    if (this.usuarioActivo && this.usuarioActivo.tipo == TipoUsuario.administrador) {
      return true;
    }else{
      return false;
    }

  }

}
