import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Usuario } from 'src/app/clases/usuario';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {


  loading : boolean = true;
  mostrar : boolean = false;
  usuarios : Array<Usuario>;

  constructor(private usService : UsuariosService, private spinner : NgxSpinnerService, private storage : StorageService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.usService.traerTodos().snapshotChanges().forEach(element =>{
      this.usuarios = [];
      element.forEach(snapshot=>{
        const user = snapshot.payload.toJSON() as Usuario;
        user.uid = snapshot.payload.key;
        this.usuarios.push(user);

      });
      this.spinner.hide().then(()=>{
        this.loading = false;
      });
    });

  }

  cambiarEstado(uid : string, estado : string){
    if (estado == 'activar') {
        this.usService.habilitarUsuario(uid).subscribe();
    }else{
      this.usService.deshabilitarUsuario(uid).subscribe();
    }
  }

}
