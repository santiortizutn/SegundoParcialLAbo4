import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { element } from 'protractor';
import { Cripto } from 'src/app/clases/cripto';
import { CriptoComprador } from 'src/app/clases/cripto-comprador';
import { CriptoVendedor } from 'src/app/clases/cripto-vendedor';
import { EstadoUsuario, TipoUsuario } from 'src/app/clases/enums';
import { Usuario } from 'src/app/clases/usuario';
import { CriptoService } from 'src/app/servicios/cripto.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-listado-vendedores',
  templateUrl: './listado-vendedores.component.html',
  styleUrls: ['./listado-vendedores.component.css']
})
export class ListadoVendedoresComponent implements OnInit {
  loading : boolean = true;
  mostrar : boolean = false;
  misCriptos : Cripto[] = [];
  vendedoresDisponibles : Usuario[] = [];
  usuarioActual : string;
  cantidad : number;

  constructor(private crService : CriptoService, private spinner : NgxSpinnerService, private usService : UsuariosService) {}


  ngOnInit(): void {
    this.spinner.show();
    this.usService.traerTodos().snapshotChanges().forEach(element =>{
      this.vendedoresDisponibles = [];
      element.forEach(snapshot =>{
          const user = snapshot.payload.toJSON() as Usuario;
          user.uid = snapshot.payload.key;
          if (user.tipo == TipoUsuario.vendedor && user.estado == EstadoUsuario.activo) {
            this.vendedoresDisponibles.push(user);
          }
      });
    });
    
    this.spinner.hide().then(()=>{
      this.loading = false;
    });
  }

  verCriptos(usuario : Usuario){
    console.log("ENTRE")
    this.misCriptos = [];
    this.crService.traerTodasVendedor().snapshotChanges().forEach(element =>{
      this.misCriptos = [];
      element.forEach(snapshot =>{
        const cripto = snapshot.payload.toJSON() as CriptoVendedor;
        if (usuario.correo == cripto.vendedor) {
          this.misCriptos.push(cripto.cripto);
        }
      });
    });
  }

  comprarCriptos(cripto : Cripto){
    if (this.cantidad < 0 || this.cantidad > 100) {
      alert("ERROR DE CANTIDAD");
    }else{
      this.crService.registrarEnBDComprador({cripto: cripto, uid: cripto.uid, comprador: localStorage.getItem('UsuarioActual'), cantidad: this.cantidad}).subscribe(()=>{
        console.log("compra realizada");
      });
    }
  }

}
