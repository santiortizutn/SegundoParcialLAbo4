import { Cripto } from "./cripto";
import { EstadoUsuario, TipoUsuario} from "./enums";

export class Usuario {
  uid : string;
  correo : string;
  clave : string;
  foto : File | string;
  tipo : TipoUsuario | string;
  estado : EstadoUsuario;
  misCriptos : Array<Cripto> = [];

  constructor(correo: string, clave: string, foto: string | File, tipo: TipoUsuario | string){
    this.correo = correo;
    this.clave = clave;
    this.foto = foto;
    this.tipo = tipo;
    this.estado = EstadoUsuario.activo;
  }



}
