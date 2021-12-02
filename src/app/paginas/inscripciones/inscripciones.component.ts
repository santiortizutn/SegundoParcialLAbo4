import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inscripcion } from 'src/app/clases/inscripcion';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.css']
})
export class InscripcionesComponent implements OnInit {

  alumno : Usuario = null;
  materia : Materia = null;
  inscripcion : Inscripcion;

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

  enviarDatos(){
    this.spinner.show();
    if (this.materia != null && this.alumno != null ) {
      this.inscripcion = this.matService.traerPorNombreIns(this.materia.nombre);
      console.log("ESTO HAY ",this.inscripcion);
      if (this.inscripcion == null) {
        this.inscripcion = new Inscripcion();
        this.inscripcion.cupo = this.materia.cupo;
        this.inscripcion.materia = this.materia;
        this.inscripcion.nombre = this.materia.nombre;
        this.inscripcion.cupoDisponible = this.materia.cupo - 1;
        this.inscripcion.alumnos = this.inscripcion.alumnos || [];
        this.inscripcion.alumnos.push(this.alumno);

        this.matService.inscribirAlumno(this.inscripcion).subscribe(()=>{
          this.spinner.hide().then(()=>{
            Swal.fire({
              title: 'Listo!',
              text: 'Alumno inscripto!',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(()=>{this.materia = null; this.alumno = null;});
          });
        });
      }else{
        console.log(this.inscripcion);
        if (this.calcularDisponibilidad(this.inscripcion) != 0) {
          if (!this.yaRegistrado(this.inscripcion)) {
            this.inscripcion.cupoDisponible = this.inscripcion.cupoDisponible - 1;
            this.inscripcion.alumnos = this.calcularArray(this.inscripcion);
            this.inscripcion.alumnos.push(this.alumno);
            this.matService.sobrescribir(this.inscripcion).subscribe(()=>{
              this.spinner.hide().then(()=>{
                Swal.fire({
                  title: 'Listo!',
                  text: 'Alumno inscripto!',
                  icon: 'success',
                  confirmButtonText: 'Ok'
                }).then(()=>{this.materia = null; this.alumno = null;});
              });
            });
          }else{
            this.spinner.hide().then(()=>{
              Swal.fire({
                title: 'Error!',
                text: 'Ya esta registrado en esta materia',
                icon: 'error',
                confirmButtonColor: 'red',
                confirmButtonText: 'Ok'
              }).then(()=>{this.materia = null; this.alumno = null;});
            });
          }
        }else{
          this.spinner.hide().then(()=>{
            Swal.fire({
              title: 'Error!',
              text: 'No hay mas cupo disponible',
              icon: 'error',
              confirmButtonColor: 'red',
              confirmButtonText: 'Ok'
            }).then(()=>{this.materia = null; this.alumno = null;});
          });
        }
      }
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'Tenes que seleccionar una materia y un alumno',
          icon: 'error',
          confirmButtonColor: 'red',
          confirmButtonText: 'Ok'
        }).then(()=>{this.materia = null; this.alumno = null;});
      });
    }

  }

  calcularDisponibilidad(inscripcion : Inscripcion){
    if (inscripcion.alumnos) {
      if (inscripcion.cupo == inscripcion.alumnos.length) {
        return 0;
      }else{
        return inscripcion.cupo - inscripcion.alumnos.length;
      }
    }else{
      return inscripcion.cupo;
    }
  }

  yaRegistrado(inscripcion : Inscripcion){
    let ins : Inscripcion;
    let j = 0;
    ins = this.matService.traerPorNombreIns(inscripcion.nombre);
    console.log("INS",ins);
    for (let i = 0; j == 0; i++) {
      if (ins.alumnos[i]) {
        if (ins.alumnos[i].correo == this.alumno.correo) {

          return true;
        }
      }else{
        j = 1;
      }

    }

    return false;
  }

  calcularArray(inscripcion : Inscripcion){
    let auxArray = [];
    let j = 0;
    for (let i = 0; j == 0; i++) {
      if (inscripcion.alumnos[i]) {
        auxArray.push(inscripcion.alumnos[i]);
      }else{
        j = 1;
      }

    }
    console.log(auxArray);
    return auxArray;
  }

}
