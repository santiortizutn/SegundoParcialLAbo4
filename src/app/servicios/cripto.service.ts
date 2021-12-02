import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { Cripto } from '../clases/cripto';
import { CriptoComprador } from '../clases/cripto-comprador';
import { CriptoVendedor } from '../clases/cripto-vendedor';

@Injectable({
  providedIn: 'root'
})
export class CriptoService {

  private criptomonedas: AngularFireList<any>;
  private criptosVendedor: AngularFireList<any>;
  private criptosComprador: AngularFireList<any>;
  private criptos: Array<Cripto> = [];

  constructor(private http:HttpClient, private firebase:AngularFireDatabase) {
    this.criptomonedas = this.firebase.list('criptomonedas');
    this.criptosVendedor = this.firebase.list('misCriptosVendedor');
    this.criptosComprador = this.firebase.list('misCriptosComprador');

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

  traerTodasVendedor(){
    return this.criptosVendedor;
  }

  traerTodasComprador(){
    return this.criptosComprador;
  }

  traerTodasArray(){
    return this.criptos;
  }

  registrarEnBD(cripto : Cripto){
    return this.http.post(`${environment.hostFirebase}/criptomonedas.json`, cripto);
  }

  registrarEnBDVendedor(cripto : CriptoVendedor){
    return this.http.patch(`${environment.hostFirebase}/misCriptosVendedor/${cripto.uid}.json`, cripto);
  }

  registrarEnBDComprador(cripto : CriptoComprador){
    return this.http.patch(`${environment.hostFirebase}/misCriptosVendedor/${cripto.uid}.json`, cripto);
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
