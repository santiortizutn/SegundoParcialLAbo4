(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"6k2k":function(t,i,s){"use strict";s.d(i,"a",function(){return n});var o=s("fXoL"),e=s("Vaw3");let n=(()=>{class t{constructor(t){this.storage=t}subirFoto(t,i){this.storage.upload("fotos/"+t,i)}subirFotoUsuario(t,i){this.storage.upload("usuarios/"+t,i)}subirFotoMateria(t,i){this.storage.upload("materias/"+t,i)}traerFoto(t){return this.storage.ref("fotos/"+t).getDownloadURL()}traerTodas(){return this.storage.ref("fotos/").listAll()}}return t.\u0275fac=function(i){return new(i||t)(o.Yb(e.a))},t.\u0275prov=o.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},"855J":function(t,i,s){"use strict";s.r(i),s.d(i,"ListadosModule",function(){return M});var o=s("ofXK"),e=s("tyNb"),n=s("fXoL"),r=s("FHRc"),c=s("mRib"),a=s("JqCM"),l=s("YR4g"),u=s("6k2k"),b=s("qFsG"),d=s("3Pt+");let p=(()=>{class t{transform(t,i){const s=[];for(const o of t)(o.tipo.toLowerCase().indexOf(i.toLowerCase())>-1||o.correo.toLowerCase().indexOf(i.toLowerCase())>-1)&&s.push(o);return s}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=n.Ob({name:"filtro",type:t,pure:!0}),t})();function h(t,i){if(1&t){const t=n.Vb();n.Ub(0,"a",14),n.bc("click",function(){n.pc(t);const i=n.dc().$implicit;return n.dc(2).cambiarEstado(i.uid,"activar")}),n.wc(1,"Habilitar"),n.Tb()}}function f(t,i){if(1&t){const t=n.Vb();n.Ub(0,"a",15),n.bc("click",function(){n.pc(t);const i=n.dc().$implicit;return n.dc(2).cambiarEstado(i.uid,"desactivar")}),n.wc(1,"Deshabilitar"),n.Tb()}}function g(t,i){if(1&t&&(n.Ub(0,"div",7),n.Ub(1,"div",8),n.Ub(2,"div",9),n.Ub(3,"p",10),n.wc(4),n.Tb(),n.Ub(5,"p",11),n.wc(6),n.Tb(),n.vc(7,h,2,0,"a",12),n.vc(8,f,2,0,"a",13),n.Tb(),n.Tb(),n.Tb()),2&t){const t=i.$implicit;n.Db(4),n.yc("Usuario: ",t.correo,""),n.Db(2),n.yc("Perfil: ",t.tipo,""),n.Db(1),n.jc("ngIf","inactivo"==t.estado&&"vendedor"==t.tipo),n.Db(1),n.jc("ngIf","activo"==t.estado&&"vendedor"==t.tipo)}}function m(t,i){if(1&t){const t=n.Vb();n.Ub(0,"div",3),n.Ub(1,"div",4),n.Ub(2,"input",5),n.bc("ngModelChange",function(i){return n.pc(t),n.dc().filter=i}),n.Tb(),n.Tb(),n.vc(3,g,9,4,"div",6),n.ec(4,"filtro"),n.Tb()}if(2&t){const t=n.dc();n.Db(2),n.jc("ngModel",t.filter),n.Db(1),n.jc("ngForOf",n.gc(4,2,t.usuarios,t.filter))}}let v=(()=>{class t{constructor(t,i,s){this.usService=t,this.spinner=i,this.storage=s,this.loading=!0,this.mostrar=!1,this.filter=""}ngOnInit(){this.spinner.show(),this.usService.traerTodos().snapshotChanges().forEach(t=>{this.usuarios=[],t.forEach(t=>{const i=t.payload.toJSON();i.uid=t.payload.key,this.usuarios.push(i)}),this.spinner.hide().then(()=>{this.loading=!1})})}cambiarEstado(t,i){"activar"==i?this.usService.habilitarUsuario(t).subscribe():this.usService.deshabilitarUsuario(t).subscribe()}}return t.\u0275fac=function(i){return new(i||t)(n.Pb(c.a),n.Pb(a.c),n.Pb(u.a))},t.\u0275cmp=n.Jb({type:t,selectors:[["app-listado-usuarios"]],decls:3,vars:1,consts:[["bdColor","rgba(51,51,51,0.8)","size","large","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],["class","listado",4,"ngIf"],[1,"listado"],[1,"search-bar"],["matInput","","type","text","placeholder","Escribe un perfil o un nombre para filtrar",1,"form-control",3,"ngModel","ngModelChange"],["class","fila",4,"ngFor","ngForOf"],[1,"fila"],[1,"card",2,"width","100%","height","300","margin","10px"],[1,"card-body",2,"display","flex","flex-direction","row","align-items","center","justify-content","space-between"],[1,"card-title"],[1,"card-text"],["class","btn btn-dark","style","margin: 2px;",3,"click",4,"ngIf"],["class","btn btn-danger","style","margin: 2px;",3,"click",4,"ngIf"],[1,"btn","btn-dark",2,"margin","2px",3,"click"],[1,"btn","btn-danger",2,"margin","2px",3,"click"]],template:function(t,i){1&t&&(n.Ub(0,"ngx-spinner",0),n.Qb(1,"p",1),n.Tb(),n.vc(2,m,5,5,"div",2)),2&t&&(n.Db(2),n.jc("ngIf",!i.loading))},directives:[a.a,o.k,b.a,d.a,d.g,d.j,o.j],pipes:[p],styles:[".listado[_ngcontent-%COMP%]{justify-content:center;background-color:#383838;border-radius:3px;width:700px;max-height:600px}.fila[_ngcontent-%COMP%], .listado[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.fila[_ngcontent-%COMP%]{padding:5px;justify-content:space-between;height:100%;width:100%}img[_ngcontent-%COMP%]{height:200px;width:300px}.search-bar[_ngcontent-%COMP%]{width:100%;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;display:flex;padding:10px;background-color:#383838}"]}),t})();var w=s("YhqW");let y=(()=>{class t{transform(t,...i){return t<10?"Baja comision":t>=10&&t<=20?"Buena comision":t>20?"Mucha comision":void 0}}return t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=n.Ob({name:"comision",type:t,pure:!0}),t})();function U(t,i){if(1&t){const t=n.Vb();n.Ub(0,"div",6),n.Ub(1,"div",7),n.Ub(2,"h5",8),n.wc(3),n.Tb(),n.Tb(),n.Ub(4,"div",9),n.Ub(5,"p",8),n.wc(6),n.Tb(),n.Ub(7,"p",10),n.wc(8),n.Tb(),n.Ub(9,"p",10),n.wc(10),n.ec(11,"comision"),n.Tb(),n.Ub(12,"a",11),n.bc("click",function(){n.pc(t);const s=i.$implicit;return n.dc(2).elegirCripto(s)}),n.wc(13,"Elegir"),n.Tb(),n.Tb(),n.Tb()}if(2&t){const t=i.$implicit;n.Db(3),n.xc(t.nombre),n.Db(3),n.yc("Costo actual: ",t.costoActual,""),n.Db(2),n.yc("A\xf1o: ",t.anio,""),n.Db(2),n.yc("Comision: ",n.fc(11,4,t.comision),"")}}function C(t,i){if(1&t&&(n.Ub(0,"div",6),n.Ub(1,"div",7),n.Ub(2,"h5",8),n.wc(3),n.Tb(),n.Tb(),n.Ub(4,"div",9),n.Ub(5,"p",8),n.wc(6),n.Tb(),n.Ub(7,"p",10),n.wc(8),n.Tb(),n.Ub(9,"p",10),n.wc(10),n.ec(11,"comision"),n.Tb(),n.Tb(),n.Tb()),2&t){const t=i.$implicit;n.Db(3),n.xc(t.nombre),n.Db(3),n.yc("Costo actual: ",t.costoActual,""),n.Db(2),n.yc("A\xf1o: ",t.anio,""),n.Db(2),n.yc("Comision: ",n.fc(11,4,t.comision),"")}}function x(t,i){if(1&t&&(n.Ub(0,"div",3),n.Ub(1,"div",4),n.vc(2,U,14,6,"div",5),n.Tb(),n.Ub(3,"div",4),n.vc(4,C,12,6,"div",5),n.Tb(),n.Tb()),2&t){const t=n.dc();n.Db(2),n.jc("ngForOf",t.criptosDisponibles),n.Db(2),n.jc("ngForOf",t.misCriptos)}}let T=(()=>{class t{constructor(t,i,s){this.crService=t,this.spinner=i,this.usService=s,this.loading=!0,this.mostrar=!1,this.misCriptos=[],this.criptosDisponibles=[],this.filter=""}ngOnInit(){this.spinner.show(),this.usService.traerTodos().snapshotChanges().forEach(t=>{this.misCriptos=[],this.criptosDisponibles=[],t.forEach(t=>{const i=t.payload.toJSON();if(i.uid=t.payload.key,i.correo==localStorage.getItem("UsuarioActual"))if(this.usuarioActual=i,this.usuarioActual.misCriptos){let t=0;for(let i=0;0==t;i++)this.usuarioActual.misCriptos[i]?this.misCriptos.push(this.usuarioActual.misCriptos[i]):t=1;console.log(this.misCriptos),this.calcularDisponibles()}else this.crService.traerTodas().snapshotChanges().forEach(t=>{this.criptosDisponibles=[],t.forEach(t=>{const i=t.payload.toJSON();i.uid=t.payload.key,this.criptosDisponibles.push(i)})})})}),this.spinner.hide().then(()=>{this.loading=!1})}calcularDisponibles(){let t,i=!1;this.criptosDisponibles=[],t=this.crService.traerTodasArray(),t.forEach(t=>{for(let s=0;s<this.misCriptos.length;s++)this.misCriptos[s].nombre==t.nombre&&(i=!0);0==i&&this.criptosDisponibles.push(t)})}elegirCripto(t){let i=this.misCriptos;i.push(t),this.crService.registrarEnBDVendedor(i,this.usuarioActual.uid).subscribe(()=>{console.log("Agregado"),this.calcularDisponibles()})}}return t.\u0275fac=function(i){return new(i||t)(n.Pb(w.a),n.Pb(a.c),n.Pb(c.a))},t.\u0275cmp=n.Jb({type:t,selectors:[["app-listado-criptos"]],decls:3,vars:1,consts:[["bdColor","rgba(51,51,51,0.8)","size","large","color","#fff","type","ball-scale-multiple"],[2,"font-size","20px","color","white"],["class","listado",4,"ngIf"],[1,"listado"],[1,"fila"],["class","card","style","width: 350; margin: 5px;",4,"ngFor","ngForOf"],[1,"card",2,"width","350","margin","5px"],[1,"card-header"],[1,"card-title"],[1,"card-body",2,"display","flex","flex-direction","column","align-items","center","justify-content","center"],[1,"card-text"],[1,"btn","btn-dark",3,"click"]],template:function(t,i){1&t&&(n.Ub(0,"ngx-spinner",0),n.Qb(1,"p",1),n.Tb(),n.vc(2,x,5,2,"div",2)),2&t&&(n.Db(2),n.jc("ngIf",!i.loading))},directives:[a.a,o.k,o.j],pipes:[y],styles:[".listado[_ngcontent-%COMP%]{flex-direction:column;justify-content:center;background-color:#383838;border-radius:3px;height:100%}.fila[_ngcontent-%COMP%], .listado[_ngcontent-%COMP%]{display:flex;align-items:center;width:100%}.fila[_ngcontent-%COMP%]{padding:10px;justify-content:start;flex-direction:row;overflow-y:hidden;overflow-x:scroll}"]}),t})();function D(t,i){1&t&&n.Qb(0,"app-listado-usuarios")}function k(t,i){1&t&&n.Qb(0,"app-listado-criptos")}const O=[{path:"",component:(()=>{class t{constructor(t,i,s,o){this.auth=t,this.usService=i,this.spinner=s,this.router=o}ngOnInit(){this.usuarioActual=this.usService.traerPorEmail(localStorage.getItem("UsuarioActual"))}salir(t){this.spinner.show(),this.auth.logOut().then(()=>{localStorage.removeItem("UsuarioActual"),this.spinner.hide().then(()=>{this.router.navigate(["/"])})})}}return t.\u0275fac=function(i){return new(i||t)(n.Pb(r.a),n.Pb(c.a),n.Pb(a.c),n.Pb(e.b))},t.\u0275cmp=n.Jb({type:t,selectors:[["app-listados"]],decls:5,vars:2,consts:[[3,"navigateEvent"],[1,"centrado"],[1,"listados"],[4,"ngIf"]],template:function(t,i){1&t&&(n.Ub(0,"app-cabecera",0),n.bc("navigateEvent",function(t){return i.salir(t)}),n.Tb(),n.Ub(1,"div",1),n.Ub(2,"div",2),n.vc(3,D,1,0,"app-listado-usuarios",3),n.vc(4,k,1,0,"app-listado-criptos",3),n.Tb(),n.Tb()),2&t&&(n.Db(3),n.jc("ngIf","administrador"==i.usuarioActual.tipo),n.Db(1),n.jc("ngIf","vendedor"==i.usuarioActual.tipo))},directives:[l.a,o.k,v,T],styles:["div[_ngcontent-%COMP%]{position:absolute;width:100%;height:92%;background-size:100% 100%;background-color:bisque;overflow-y:hidden}.centrado[_ngcontent-%COMP%], .listados[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center}.listados[_ngcontent-%COMP%]{background-color:transparent;width:80%;height:auto}"]}),t})()}];let P=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.Nb({type:t}),t.\u0275inj=n.Mb({imports:[[e.c.forChild(O)],e.c]}),t})();var A=s("lSLK");let M=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=n.Nb({type:t}),t.\u0275inj=n.Mb({imports:[[o.c,P,A.a]]}),t})()},FHRc:function(t,i,s){"use strict";s.d(i,"a",function(){return n});var o=s("fXoL"),e=s("UbJi");let n=(()=>{class t{constructor(t){this.firebaseAuth=t,this.firebaseAuth.authState.subscribe(t=>{this.currentUser=t})}registro(t,i){return this.firebaseAuth.createUserWithEmailAndPassword(t,i)}login(t,i){return this.firebaseAuth.setPersistence("session").then(()=>this.firebaseAuth.signInWithEmailAndPassword(t,i).then(t=>this.currentUser=t.user))}logOut(){return this.firebaseAuth.signOut()}}return t.\u0275fac=function(i){return new(i||t)(o.Yb(e.a))},t.\u0275prov=o.Lb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);