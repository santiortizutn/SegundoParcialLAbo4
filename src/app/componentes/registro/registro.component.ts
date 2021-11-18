import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TipoUsuario } from 'src/app/clases/enums';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input('admin') esAdmin : Usuario = null;
  @Output() loadEvent = new EventEmitter<boolean>();
  @Output() volverEvent = new EventEmitter<string>();

  loading : boolean = true;
  opcion : string | TipoUsuario = "none";
  foto;
  formGroup : FormGroup;

  constructor(private fb : FormBuilder, private storage : StorageService,
    private usService : UsuariosService, private auth : AuthService,
    private spinner : NgxSpinnerService, private router : Router) {}

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide().then(()=>{
        this.loading = false;
        this.loadEvent.emit(true);
      });
    }, 500);

    this.formGroup = this.fb.group({
      "correo": ['', [Validators.required, Validators.email]],
      "clave": ['', [Validators.required, this.passwordValidator]],
      "foto": ['', Validators.required]
     // "recaptcha": ['', Validators.required]
    });
  }


  passwordValidator(control : AbstractControl): null | object{
    const pass = <string>control.value;
    const tamaño  = pass.length;
    if (tamaño < 6) {
      return { menorASeis:true };
    }else{
      return null;
    }
  }

  cargarImg($event){
    this.foto = $event.target.files[0];
  }

  cargarTipo(){
    if (this.opcion == 'administrador') {
      this.opcion = TipoUsuario.administrador;
    }
    if (this.opcion == 'vendedor') {
      this.opcion = TipoUsuario.vendedor;
    }
    if (this.opcion == 'comprador') {
      this.opcion = TipoUsuario.comprador;
    }
  }

  enviarDatos(){

    this.spinner.show();
    let imgRef = this.formGroup.controls['correo'].value + ' - ' + this.foto.name;
    this.cargarTipo();
    let user = new Usuario(this.formGroup.controls['correo'].value, this.formGroup.controls['clave'].value, imgRef, this.opcion);
    console.log(user);

    if (this.usService.traerPorEmail(user.correo) == null) {
      this.usService.registrarEnBD(user).subscribe(()=>{
        this.auth.registro(user.correo, user.clave).then(()=>{
          this.storage.subirFoto(imgRef, this.foto);
          this.storage.subirFotoUsuario(imgRef, this.foto);
          this.spinner.hide().then(()=>{
            Swal.fire({
              title: 'Listo!',
              text: 'Registro completado',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(()=>{
                this.reset();
              });
          });
        });
      });
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'El correo ya esta registrado',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red'
        }).then(()=>{
            this.formGroup.controls['correo'].reset();
          });
      });
    }
  }

  reset(){
    this.formGroup.reset({'correo':'', 'clave': '', 'foto':''});
    this.volverEvent.emit("");
    this.loadEvent.emit(false);
    if (this.esAdmin.tipo == TipoUsuario.administrador) {
      this.opcion = 'none';
      this.router.navigate(['/alta-usuarios']);
    }
  }

}
