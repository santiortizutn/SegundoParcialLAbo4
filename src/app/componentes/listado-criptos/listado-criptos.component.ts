import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cripto } from 'src/app/clases/cripto';
import { CriptoVendedor } from 'src/app/clases/cripto-vendedor';
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
  usuarioActual : string;
  filter = '';

  constructor(private crService : CriptoService, private spinner : NgxSpinnerService, private usService : UsuariosService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.crService.traerTodas().snapshotChanges().forEach(crip =>{
      this.criptosDisponibles = [];
      crip.forEach(snap => {
        const cripto = snap.payload.toJSON() as Cripto;
        cripto.uid = snap.payload.key;
        this.criptosDisponibles.push(cripto);
      });
    });
    this.crService.traerTodasVendedor().snapshotChanges().forEach(element =>{
      this.misCriptos = [];
      element.forEach(snapshot =>{
        const cripto = snapshot.payload.toJSON() as CriptoVendedor;
        cripto.uid = snapshot.payload.key;
        if (cripto.vendedor == "juan@juuan.com") {
          this.misCriptos.push(cripto.cripto);
        }
      });
    });
    
      this.spinner.hide().then(()=>{
        this.loading = false;
      });

  }

  elegirCripto(cripto : Cripto){
    this.crService.registrarEnBDVendedor({
      cripto: cripto,
      uid : cripto.uid,
      vendedor: localStorage.getItem("UsuarioActual")
    }).subscribe(()=>{
      console.log("Agregado");
    });
  }



}
