import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cripto } from 'src/app/clases/cripto';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { CriptoService } from 'src/app/servicios/cripto.service';
import { MateriasService } from 'src/app/servicios/materias.service';
import { StorageService } from 'src/app/servicios/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-criptos',
  templateUrl: './form-criptos.component.html',
  styleUrls: ['./form-criptos.component.css']
})
export class FormCriptosComponent implements OnInit {


  formGroup : FormGroup;

  constructor(private auth : AuthService, private router : Router,
    private cripService : CriptoService, private storage : StorageService,
    private spinner : NgxSpinnerService, private fb : FormBuilder,) {}

    ngOnInit(): void {

      this.formGroup = this.fb.group({
        "nombre": ['', Validators.required],
        "costo": ['', Validators.required],
        "año": ['', Validators.required],
        "comision": ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      });
    }


  enviarDatos(){
    this.spinner.show();

    let nuevaCripto = new Cripto(this.formGroup.controls['nombre'].value,
     this.formGroup.controls['costo'].value,
     this.formGroup.controls['comision'].value,
     this.formGroup.controls['año'].value,
    );

    if(!this.cripService.validaRegistro(nuevaCripto.nombre, nuevaCripto.anio)){
      this.cripService.registrarEnBD(nuevaCripto).subscribe(()=>{
        this.spinner.hide().then(()=>{
          Swal.fire({
            title: 'Listo!',
            text: 'Cripto registrada',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(()=>{this.reset()});
        });
      });
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'La cripto ya esta registrada',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red'
        });
      });
    }
  }

  reset(){
    this.formGroup.reset({'nombre':'', 'costo': '', 'año':'', 'comision':''});
  }


}
