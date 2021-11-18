import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Cripto } from '../clases/cripto';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  private criptomonedas: AngularFireList<any>;
  private criptos: Array<Cripto> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.criptomonedas = this.firebase.list('criptomonedas');
    this.criptomonedas.snapshotChanges().forEach(elementos =>{
      this.criptos = [];
      elementos.forEach(snapshot => {
        const cripto = snapshot.payload.toJSON() as Cripto;
        this.criptos.push(cripto);
      })
    });
  }

  traerTodas(){
    return this.criptomonedas;
  }

  registrarEnBD(cripto : Cripto){
    return this.http.post(`${environment.hostFirebase}/criptomonedas.json`, cripto);
  }

  validaRegistro(nombre : string, año : string) : Boolean{
    let log : Boolean = false;
    this.criptos.forEach(u => {
      if (nombre == u.nombre && año == u.año){
        log = true;
      }
    });
    return log;
  }
}
