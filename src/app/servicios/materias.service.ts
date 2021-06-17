import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Inscripcion } from '../clases/inscripcion';
import { Materia } from '../clases/materia';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  private materias: AngularFireList<any>;
  private mats: Array<Materia> = [];

  private inscripciones: AngularFireList<any>;
  private ins: Array<Inscripcion> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.materias = this.firebase.list('materias');
    this.materias.snapshotChanges().forEach(elementos =>{
      this.mats = [];
      elementos.forEach(snapshot => {
        const materia = snapshot.payload.toJSON() as Materia;
        this.mats.push(materia);
      })
    });
    this.inscripciones = this.firebase.list('inscripciones');
    this.inscripciones.snapshotChanges().forEach(elementos =>{
      this.ins = [];
      elementos.forEach(snapshot => {
        const inscripcion = snapshot.payload.toJSON() as Inscripcion;
        inscripcion.uid = snapshot.payload.key;
        this.ins.push(inscripcion);
      })
    });
  }

  traerTodos(){
    return this.materias;
  }

  traerTodosIns(){
    return this.inscripciones;
  }

  traerPorNombreIns(inscripcion : string){
    let ins: Inscripcion = null;

    for (let i = 0; i < this.ins.length; i++) {
      if (this.ins[i].nombre == inscripcion) {
        ins = this.ins[i];
      }
    }
    return ins;
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

  inscribirAlumno(inscripcion : Inscripcion){
    return this.http.post(`${environment.hostFirebase}/inscripciones.json`, inscripcion);
  }

  sobrescribir(inscripcion : Inscripcion){
    return this.http.patch(`${environment.hostFirebase}/inscripciones/${inscripcion.uid}.json`, inscripcion);
  }
}
