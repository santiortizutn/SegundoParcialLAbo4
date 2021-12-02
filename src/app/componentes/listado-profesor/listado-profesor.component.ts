import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoUsuario, TipoUsuario } from 'src/app/clases/enums';
import { Usuario } from 'src/app/clases/usuario';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado-profesor',
  templateUrl: './listado-profesor.component.html',
  styleUrls: ['./listado-profesor.component.css']
})
export class ListadoProfesorComponent implements OnInit {

  @Output() profeElegidoEvent = new EventEmitter();

  profesores : Array<Usuario>;
  elegido : string;

  constructor(private usService : UsuariosService, private spinner : NgxSpinnerService, private storage : StorageService) {

    this.spinner.show();
    this.usService.traerTodos().snapshotChanges().forEach(element =>{
      this.profesores = [];
      element.forEach(snapshot=>{
        const profe = snapshot.payload.toJSON() as Usuario;
        if (profe.tipo == TipoUsuario.profesor && profe.estado == EstadoUsuario.activo) {
          this.storage.traerFoto(profe.foto).subscribe(urlFoto =>{
            profe.foto = urlFoto;
            this.profesores.push(profe);
          })
        }
      });
      this.spinner.hide();
    });
   }

  ngOnInit(): void {
  }

  elegirProfesor(profe : Usuario){
    this.elegido = profe.correo;
    this.profeElegidoEvent.emit(profe);
  }

}
