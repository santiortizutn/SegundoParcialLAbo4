import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() loadEvent = new EventEmitter<boolean>();

  loading : boolean = true;
  imagen : any;
  imagen2 : string;
  imagen3 : string;
  correo : string;
  clave : string;
  usuarios : Array<Usuario>;
  formGroup : FormGroup;

  constructor(private auth : AuthService, private router : Router,
    private usService : UsuariosService, private storage : StorageService,
    private spinner : NgxSpinnerService, private fb : FormBuilder,) {}

    ngOnInit(): void {
      this.spinner.show();
      this.usService.traerTodos().snapshotChanges().forEach(element=>{
        this.usuarios = [];
        element.forEach(snapshot=>{
          const usuario = snapshot.payload.toJSON() as Usuario;
          usuario.uid = snapshot.payload.key;
          this.usuarios.push(usuario);
        });
        this.spinner.hide().then(()=>{
          this.loading = false;
          this.loadEvent.emit(true);
        });
      });
      this.formGroup = this.fb.group({
        "correo": ['', [Validators.required, Validators.email]],
        "clave": ['', [Validators.required, this.passwordValidator]],
       // "recaptcha": ['', Validators.required]
      });


       // admin
      this.storage.traerFoto("santyno09@gmail.com - admin.jpg").subscribe(data =>{
        this.imagen = data;
      });

      // vendedor
      this.storage.traerFoto("pepe@pepe.com - vendedor.jpg").subscribe(data =>{
        this.imagen2 = data;
      });

      // comprador
      this.storage.traerFoto("leo@diaz.com - comprador.jpg").subscribe(data =>{
        this.imagen3 = data;
      });
    }


    passwordValidator(control : AbstractControl): null | object{
      const pass = <string>control.value;
      const tamaño  = pass.length!;
      if (tamaño < 6) {
        return { menorASeis:true };
      }else{
        return null;
      }
    }


  cargarCampos(perfil : string){
    if (perfil == 'admin') {
      this.correo = "santyno09@gmail.com";
      this.clave = "123456";
    }
    if (perfil == "vend") {
      this.correo = "juan@juuan.com"
      this.clave = "123456";
    }
    if (perfil == "comp") {
      this.correo = "barbaranavarro759@gmail.com"
      this.clave = "123456";
    }
  }


  enviarDatos(){
    this.spinner.show();
    if(this.usService.validaLogin(this.correo, this.clave)){
      this.auth.login(this.correo, this.clave).then( user =>{
        localStorage.setItem("UsuarioActual", user.email);
        this.spinner.hide().then(()=>{
          this.router.navigate(['/principal']);
        });
      });
    }else{
      this.spinner.hide().then(()=>{
        Swal.fire({
          title: 'Error!',
          text: 'El usuario no esta registrado',
          icon: 'error',
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red'
        });
      });
    }
  }


}
