import { Component } from '@angular/core';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
citas:String = "";
activeTab: string =  "Pendientes";

  recibirDato(activeTab: string) {
    this.activeTab = activeTab;
    console.log(activeTab);
  } 
  
}
