import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadoMateria } from 'src/app/clases/enums';
import { Inscripcion } from 'src/app/clases/inscripcion';
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
  @Input('pagina') paginaActual : string = 'inscripcion';


  materias : Array<Materia>;
  inscripciones : Array<Inscripcion>;

  elegida : string;
  loading : boolean = true;
  mostrar : boolean = false;
  alumnosParaMostrar : Array<Usuario>;
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

    this.matService.traerTodosIns().snapshotChanges().forEach(element =>{
      this.inscripciones = [];
      element.forEach(snapshot=>{
        const ins = snapshot.payload.toJSON() as Inscripcion;
        ins.uid = snapshot.payload.key;
        this.inscripciones.push(ins);
      });
    });
  }

  elegirMateria(mat : Materia){
    this.elegida = mat.nombre;
    this.materiaElegidaEvent.emit(mat);
  }

  mostrarAlumnos(materia : Materia){
    this.mostrar = true;
    this.alumnosParaMostrar = [];
    let j = 0;

    this.inscripciones.forEach(ins => {
      if (ins && ins.nombre == materia.nombre) {
        this.cupoDisponible = ins.cupoDisponible;
        for (let i = 0; j == 0; i++) {
          if (ins.alumnos[i]) {
            this.alumnosParaMostrar.push(ins.alumnos[i]);
          }else{
            j = 1;
          }
        }
      }
    });
  }
}
