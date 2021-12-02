import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { StorageService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-materias',
  templateUrl: './form-materias.component.html',
  styleUrls: ['./form-materias.component.css']
})
export class FormMateriasComponent implements OnInit {

  foto;
  materias : Array<Usuario>;
  cuatri : string = 'primer';
  profesor : Usuario;
  formGroup : FormGroup;

  constructor(private auth : AuthService, private router : Router,
    private matService : MateriasService, private storage : StorageService,
    private spinner : NgxSpinnerService, private fb : FormBuilder,) {}

    ngOnInit(): void {

      this.formGroup = this.fb.group({
        "nombre": ['', Validators.required],
        "cuatrimestre": ['', Validators.required],
        "año": ['', Validators.required],
        "cupo": ['', [Validators.required, Validators.min(10), Validators.max(40)]],
        "profesor": ['', Validators.required],
        "foto": ['', Validators.required]
       // "recaptcha": ['', Validators.required]
      });
    }

    cargarImg($event){
      this.foto = $event.target.files[0];
    }

    asignarCuatri(valor : any){
      this.formGroup.controls['cuatrimestre'].setValue(valor);
      console.log(this.formGroup.controls['cuatrimestre'].value);
    }

    asignarProfesor(valor : any){
      this.formGroup.controls['profesor'].setValue(valor);
      console.log(this.formGroup.controls['profesor'].value);
    }

    probar(){
      console.log(this.formGroup.getRawValue());
    }


  enviarDatos(){
    this.spinner.show();
    let imgRef = this.formGroup.controls['nombre'].value + ' - ' + this.foto.name;

    let materia = new Materia(this.formGroup.controls['nombre'].value,
     this.formGroup.controls['cuatrimestre'].value,
     this.formGroup.controls['cupo'].value,
     this.formGroup.controls['año'].value,
     this.formGroup.controls['profesor'].value,
     imgRef);

    if(!this.matService.validaRegistro(materia.nombre, materia.cuatrimestre, materia.anio)){
      this.matService.registrarEnBD(materia).subscribe(()=>{
        this.storage.subirFotoMateria(imgRef, this.foto);
        this.storage.subirFoto(imgRef, this.foto);
        this.spinner.hide().then(()=>{
          Swal.fire({
            title: 'Listo!',
            text: 'Materia registrada',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(()=>{this.reset()});
        });
      });
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'La materia ya esta registrada',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red'
        });
      });
    }
  }

  reset(){
    this.formGroup.reset({'nombre':'', 'cuatrimestre': '', 'año':'', 'cupo':'', 'profesor':'', 'foto':''});
  }

}
