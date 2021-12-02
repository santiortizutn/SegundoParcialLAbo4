import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage : AngularFireStorage) { }

  subirFoto(usuario : string, foto : any){
    this.storage.upload("fotos/" + usuario, foto);
  }

  subirFotoUsuario(usuario : string, foto : any){
    this.storage.upload("usuarios/" + usuario, foto);
  }

  subirFotoMateria(nombre : string, foto : any){
    this.storage.upload("materias/" + nombre, foto);
  }

  traerFoto(imagen : string | File){
    return this.storage.ref("fotos/"+imagen).getDownloadURL();

  }

  traerTodas(){
    return this.storage.ref("fotos/").listAll();
  }
}
