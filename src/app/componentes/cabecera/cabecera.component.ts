import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  @Output() navigateEvent = new EventEmitter();

  selected : string = 'miPerfil';
  usuarioActual : Usuario;
  email : string;

  constructor(private usService : UsuariosService, private router : Router) {
    this.usuarioActual = this.usService.traerPorEmail(localStorage.getItem("UsuarioActual"));
    console.log("usuario: ", this.usuarioActual);
    console.log("storage: ", localStorage.getItem("UsuarioActual"));
  }

  ngOnInit(): void {
  }

  navigate(ruta : string){
    this.selected = ruta;

    switch(ruta){
      case 'salir':
        this.navigateEvent.emit(ruta);
        break;
      case 'altaUsuarios':
        this.router.navigate(['/alta-usuarios']);
        break;
      case 'altaCriptos':
        this.router.navigate(['/alta-criptos']);
        break;
      case 'inscripciones':
        this.router.navigate(['/inscripciones']);
        break;
      case 'listados':
        this.router.navigate(['/listados']);
        break;
      case 'home':
        this.router.navigate(['/principal']);
        break;

    }

  }

  asignar(eml:string){
    console.log(eml);
    this.email = eml;
  }

}
