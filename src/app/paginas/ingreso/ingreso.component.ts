import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  opcion : string = "";
  loaded : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  back(){
    this.opcion = "";
    this.loaded = false;
  }

}
