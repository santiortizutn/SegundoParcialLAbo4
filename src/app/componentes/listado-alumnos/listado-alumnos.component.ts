import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoUsuario, TipoUsuario } from 'src/app/clases/enums';
import { Usuario } from 'src/app/clases/usuario';
import { StorageService } from 'src/app/servicios/storage.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado-alumnos',
  templateUrl: './listado-alumnos.component.html',
  styleUrls: ['./listado-alumnos.component.css']
})
export class ListadoAlumnosComponent implements OnInit {

  @Output() alumnoElegidoEvent = new EventEmitter();
  @Input('pagina') paginaActual : string = 'inscripcion';

  elegida : string;
  loading : boolean = true;
  mostrar : boolean = false;
  alumnosParaMostrar : Array<Usuario>;
  alumnos : Array<Usuario>;
  cupoDisponible : any;

  constructor(private usService : UsuariosService, private spinner : NgxSpinnerService, private storage : StorageService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.usService.traerTodos().snapshotChanges().forEach(element =>{
      this.alumnos = [];
      element.forEach(snapshot=>{
        const alumno = snapshot.payload.toJSON() as Usuario;
        if (alumno.estado == EstadoUsuario.activo && alumno.tipo == TipoUsuario.alumno) {
          this.storage.traerFoto(alumno.foto).subscribe(urlFoto =>{
            alumno.foto = urlFoto;
            this.alumnos.push(alumno);
          })
        }
      });
      this.spinner.hide().then(()=>{
        this.loading = false;
      });
    });
  }

  elegirAlumno(us : Usuario){
    this.elegida = us.correo;
    this.alumnoElegidoEvent.emit(us);
  }

}
