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
        cripto.uid = snapshot.payload.key;
        this.criptos.push(cripto);
      })
    });
  }

  traerTodas(){
    return this.criptomonedas;
  }

  traerTodasArray(){
    return this.criptos;
  }

  registrarEnBD(cripto : Cripto){
    return this.http.post(`${environment.hostFirebase}/criptomonedas.json`, cripto);
  }

  registrarEnBDVendedor(criptos : Cripto[], uid : string){
    return this.http.patch(`${environment.hostFirebase}/usuarios/${uid}.json`,{misCriptos: criptos});
  }


  validaRegistro(nombre : string, año : string) : Boolean{
    let log : Boolean = false;
    this.criptos.forEach(u => {
      if (nombre == u.nombre && año == u.anio){
        log = true;
      }
    });
    return log;
  }
}
