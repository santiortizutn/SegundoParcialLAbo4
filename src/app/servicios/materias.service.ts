import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Materia } from '../clases/materia';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private materias: AngularFireList<any>;
  private mats: Array<Materia> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.materias = this.firebase.list('materias');
    this.materias.snapshotChanges().forEach(elementos =>{
      this.mats = [];
      elementos.forEach(snapshot => {
        const materia = snapshot.payload.toJSON() as Materia;
        this.mats.push(materia);
      })
    });
  }

  traerTodos(){
    return this.materias;
  }

  traerPorNombre(materia : string){
    let mat: Materia = null;

    for (let i = 0; i < this.mats.length; i++) {
      if (this.mats[i].nombre == materia) {
        mat = this.mats[i];
      }
    }
    return mat;
  }

  traerPorProfesor(profe : string){
    let mat: Array<Materia> = null;

    for (let i = 0; i < this.mats.length; i++) {
      if (this.mats[i].profesor.correo == profe) {
        mat.push(this.mats[i]);
      }
    }
    return mat;
  }

  validaRegistro(nombre:string, cuatrimestre:string, año:string) : Boolean{
    let log : Boolean = false;
    this.mats.forEach(u => {
      if (nombre == u.nombre && cuatrimestre == u.cuatrimestre && año == u.anio){
        log = true;
      }
    });
    return log;
  }


  registrarEnBD(materia : Materia){
    return this.http.post(`${environment.hostFirebase}/materias.json`, materia);
  }

  inscribirAlumno(uid : string, alumnos : any){
    return this.http.patch(`${environment.hostFirebase}/usuarios/${uid}.json`,{alumnos: alumnos});
  }
}
