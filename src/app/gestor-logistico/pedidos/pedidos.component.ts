import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
interface numeros {
  pedidos_pendientes: number,
  pedidos_aceptados: number,
  articulosEnMinimos: number,
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
citas:String = "";
activeTab: string =  "Pendientes";
gestorServicio = inject(ServicioService);
contenido!:numeros;
  constructor(private route: ActivatedRoute,
    private router: Router,){
  }

  ngOnInit(){
    this.gestorServicio.numerosPedido().subscribe(
      (response) => {
        this.contenido = response;
      }
    )
  }

  recibirDato(activeTab: string) {
    this.activeTab = activeTab;
    console.log(activeTab);
  } 
  
  crearPedido(): void {
    const url = `/app/gestor-logistico/pedidos/crear-pedido`;
    this.router.navigateByUrl(url);
    console.log(`Click sobre`);
    console.log(url);
  }
}
