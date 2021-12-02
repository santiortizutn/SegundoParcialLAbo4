export class Cripto {
  nombre : string;
  costoActual : number;
  comision : number;
  anio : string;
  uid : any;

  constructor(nombre: string, costo: number, comision: number, anio: string){
    this.nombre = nombre;
    this.costoActual = costo;
    this.comision = comision;
    this.anio = anio;
  }
}
