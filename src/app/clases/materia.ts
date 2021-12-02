import { EstadoMateria } from "./enums";
import { Usuario } from "./usuario";

export class Materia {
  uid : string;
  nombre : string;
  cuatrimestre : string;
  cupo : number;
  anio : string;
  foto : string | File;
  profesor : Usuario;
  alumnos : Array<Usuario | any>;
  estado : EstadoMateria;

  constructor(nombre: string, cuatrimestre: string, cupo: number, año: string, profesor: Usuario, foto : string | File){
    this.nombre = nombre;
    this.cuatrimestre = cuatrimestre;
    this.cupo = cupo;
    this.anio = año;
    this.foto = foto;
    this.profesor = profesor;
    this.estado = EstadoMateria.activo;
    this.alumnos = [''];
  }
}
