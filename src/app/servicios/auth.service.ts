import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser : any;

  constructor(public firebaseAuth: AngularFireAuth) {
    this.firebaseAuth.authState.subscribe( (user) => {
      this.currentUser = user;
    });
  }

  registro(correo:string, clave:string){
    return this.firebaseAuth.createUserWithEmailAndPassword(correo, clave);
  }

  login(correo:string, clave:string){
    return this.firebaseAuth.setPersistence('session').then(()=>{
      return this.firebaseAuth.signInWithEmailAndPassword(correo, clave).then(data =>{
        return this.currentUser = data.user;
      });
    });
  }

  logOut(){
    return this.firebaseAuth.signOut();
  }
}
