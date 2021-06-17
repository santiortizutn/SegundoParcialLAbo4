import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  @Output() ingresoEvento = new EventEmitter<string>();

  loading : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  eleccion(opcion : string){
    this.ingresoEvento.emit(opcion);
  }

}
