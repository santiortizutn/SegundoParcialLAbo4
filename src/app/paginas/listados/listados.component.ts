import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  emailUsuario : string;
  usuarioActual: Usuario;

  constructor(private auth : AuthService, private usService : UsuariosService,
     private spinner : NgxSpinnerService, private router : Router) { }

  ngOnInit(): void {
    this.usuarioActual = this.usService.traerPorEmail(localStorage.getItem("UsuarioActual"));

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

}
