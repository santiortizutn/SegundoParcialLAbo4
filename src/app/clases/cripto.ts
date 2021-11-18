export class Cripto {
  nombre : string;
  costoActual : number;
  comision : number;
  año : string;

  constructor(nombre, costo, comision, año){
    this.nombre = nombre;
    this.costoActual = costo;
    this.comision = comision;
    this.año = año;
  }
}
