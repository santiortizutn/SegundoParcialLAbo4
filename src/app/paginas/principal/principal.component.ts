import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  emailUsuario : string;

  constructor(private auth : AuthService, private usService : UsuariosService,
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
}
