import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoMateria } from 'src/app/clases/enums';
import { Materia } from 'src/app/clases/materia';
import { Usuario } from 'src/app/clases/usuario';
import { MateriasService } from 'src/app/servicios/materias.service';
import { StorageService } from 'src/app/servicios/storage.service';

@Component({
  selector: 'app-listado-materias',
  templateUrl: './listado-materias.component.html',
  styleUrls: ['./listado-materias.component.css']
})
export class ListadoMateriasComponent implements OnInit {

  @Output() materiaElegidaEvent = new EventEmitter();

  materias : Array<Materia>;
  elegida : string;
  loading : boolean = true;
  mostrar : boolean = false;
  alumnosParaMostrar : Array<Usuario> | string;
  cupoDisponible : any;

  constructor(private matService : MateriasService, private spinner : NgxSpinnerService, private storage : StorageService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.matService.traerTodos().snapshotChanges().forEach(element =>{
      this.materias = [];
      element.forEach(snapshot=>{
        const materia = snapshot.payload.toJSON() as Materia;
        materia.uid = snapshot.payload.key;
        if (materia.estado == EstadoMateria.activo) {
          this.storage.traerFoto(materia.foto).subscribe(urlFoto =>{
            materia.foto = urlFoto;
            this.materias.push(materia);
          })
        }
      });
      this.spinner.hide().then(()=>{
        this.loading = false;
      });
    });
  }

  elegirMateria(mat : Materia){
    this.elegida = mat.nombre;
    this.materiaElegidaEvent.emit(mat);
  }

  mostrarAlumnos(materia : Materia){
    this.mostrar = true;
    if (!materia.alumnos) {
      this.alumnosParaMostrar = [];
      this.cupoDisponible = materia.cupo;
    }else{
      this.alumnosParaMostrar = materia.alumnos;
      this.cupoDisponible = materia.alumnos.length;
    }
  }
}
