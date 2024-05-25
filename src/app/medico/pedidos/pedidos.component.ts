import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosMedicoComponent {
  activeTab: string =  "Pendientes";

  constructor(private route: ActivatedRoute,
    private router: Router,){
  }

  recibirDato(activeTab: string) {
    this.activeTab = activeTab;
    console.log(activeTab);
  } 
  
  crearPedido(): void {
    const url = `/app/medico/pedidos/crear-pedido`;
    this.router.navigateByUrl(url);
    console.log(`Click sobre`);
    console.log(url);
  }
}
