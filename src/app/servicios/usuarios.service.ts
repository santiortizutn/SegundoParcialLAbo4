import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { EstadoUsuario } from '../clases/enums';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private usuarios: AngularFireList<any>;
  private users: Array<Usuario> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.usuarios = this.firebase.list('usuarios');
    this.usuarios.snapshotChanges().forEach(elementos =>{
      this.users = [];
      elementos.forEach(snapshot => {
        const usuario = snapshot.payload.toJSON() as Usuario;
        this.users.push(usuario);
      })
    });
  }

  traerTodos(){
    return this.usuarios;
  }

  traerPorEmail(correo : string){
    let user: Usuario = null;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].correo == correo) {
        user = this.users[i];
      }
    }
    return user;
  }


  registrarEnBD(usuario : Usuario){
    return this.http.post(`${environment.hostFirebase}/usuarios.json`, usuario);
  }

  habilitarMateria(uid:string){
    return this.http.patch(`${environment.hostFirebase}/usuarios/${uid}.json`,{});
  }


  verificarEstadoUsuario(correo : string){
    let user: Usuario;

    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].correo == correo) {
        user = this.users[i] as Usuario;
        if (user.estado == EstadoUsuario.pendiente) {
          return false;
        }
      }
    }

    return true;
  }


  validaLogin(correo:string, clave:string) : Boolean{
    let log : Boolean = false;
    this.users.forEach(u => {
      if (correo == u.correo && clave == u.clave){
        log = true;
      }
    });
    return log;
  }
}
