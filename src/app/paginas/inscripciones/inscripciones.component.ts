import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  alumno : Usuario;
  materia : Materia;

  nombre : string;
  correo : string;

  constructor(private auth : AuthService, private matService : MateriasService,
     private spinner : NgxSpinnerService, private router : Router) { }

  ngOnInit(): void {
  }

  salir(evento:string){
    this.spinner.show();
    this.auth.logOut().then(()=>{
      localStorage.removeItem("UsuarioActual");
      this.spinner.hide().then(()=>{
        this.router.navigate(['/']);
      });
    });
  }

  asignarDatos(datos : any, tipo : string){
    if (tipo == "materia") {
      this.materia = datos;
      this.nombre = this.materia.nombre;
    }else{
      this.alumno = datos;
      this.correo = this.alumno.correo;
    }
  }

  validarInscripcion(){
    if (this.materia.alumnos) {
      for (let i = 0; i < this.materia.alumnos.length; i++) {
        if (this.materia.alumnos[i].correo == this.alumno.correo) {
          return 'yaEsta';
        }
      }
      if (this.materia.alumnos.length < this.materia.cupo) {
        return 'hayCupo';
      }else{
        return 'sinCupo';
      }
    }else{
      return 'vacio';
    }
  }

  enviarDatos(){
    this.spinner.show();
    if (this.validarInscripcion() == 'vacio' || this.validarInscripcion() == 'hayCupo') {
      this.materia.alumnos = [];
      this.materia.alumnos.push(this.alumno);
      this.matService.inscribirAlumno(this.materia.uid, this.materia.alumnos).subscribe(()=>{
        this.spinner.hide().then(()=>{
          Swal.fire({
            title: 'Listo!',
            text: 'Alumno inscripto!',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        });
      });
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'No hay cupo o ya esta en esta materia.',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      });
    }
  }

}
