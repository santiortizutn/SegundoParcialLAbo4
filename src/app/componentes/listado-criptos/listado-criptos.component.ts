import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cripto } from 'src/app/clases/cripto';
import { Usuario } from 'src/app/clases/usuario';
import { CriptoService } from 'src/app/servicios/cripto.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado-criptos',
  templateUrl: './listado-criptos.component.html',
  styleUrls: ['./listado-criptos.component.css']
})
export class ListadoCriptosComponent implements OnInit {

  loading : boolean = true;
  mostrar : boolean = false;
  misCriptos : Cripto[] = [];
  criptosDisponibles : Cripto[] = [];
  usuarioActual : Usuario;
  filter = '';

  constructor(private crService : CriptoService, private spinner : NgxSpinnerService, private usService : UsuariosService) {}

  ngOnInit(): void {
    this.spinner.show();

    this.usService.traerTodos().snapshotChanges().forEach(element =>{
      this.misCriptos = [];
      this.criptosDisponibles = [];
      element.forEach(snapshot =>{
        const user = snapshot.payload.toJSON() as Usuario;
        user.uid = snapshot.payload.key;
        if (user.correo == localStorage.getItem("UsuarioActual")) {
          this.usuarioActual = user;


            if (this.usuarioActual.misCriptos) {
              let j = 0;
              for (let i = 0;j == 0; i++) {
                if (this.usuarioActual.misCriptos[i]) {
                  this.misCriptos.push(this.usuarioActual.misCriptos[i]);
                }else{
                  j = 1;
                }
              }
              console.log(this.misCriptos);
              this.calcularDisponibles();
            }else{
              this.crService.traerTodas().snapshotChanges().forEach(element =>{
                this.criptosDisponibles = [];
                element.forEach(snapshot =>{
                  const cripto = snapshot.payload.toJSON() as Cripto;
                  cripto.uid = snapshot.payload.key;
                  this.criptosDisponibles.push(cripto)
                })
              })


          }
        }
      });
    });


      this.spinner.hide().then(()=>{
        this.loading = false;
      });

  }


  calcularDisponibles(){
    let array :Cripto[];
    let includes = false;
    this.criptosDisponibles = [];
    array = this.crService.traerTodasArray();
    array.forEach(cripto =>{
      for (let i = 0; i < this.misCriptos.length; i++) {
        if(this.misCriptos[i].nombre == cripto.nombre){
          includes = true;
        }
      }
      if (includes == false) {
        this.criptosDisponibles.push(cripto);
      }
    })
  }


  elegirCripto(cripto : Cripto){
    let array = this.misCriptos;
    array.push(cripto);
    this.crService.registrarEnBDVendedor(array, this.usuarioActual.uid).subscribe(()=>{
      console.log("Agregado");
      this.calcularDisponibles();
    });
  }



}
