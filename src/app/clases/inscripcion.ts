import { Materia } from "./materia";
import { Usuario } from "./usuario";

export class Inscripcion {
  uid : string;
  nombre : string;
  materia : Materia;
  cupo : number;
  cupoDisponible : number;
  alumnos : Array<Usuario>;

  constructor(){}
}
