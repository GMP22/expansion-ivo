import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { ActivatedRoute, Router } from '@angular/router';

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

export class PedidosMedicoComponent {
  activeTab: string =  "Pendientes";
  medicoServicio = inject(MedicoService);
  contenido!:numeros;
  

  constructor(private route: ActivatedRoute,
    private router: Router,){}

  ngOnInit(){
    this.medicoServicio.numerosPedido(localStorage.getItem("id_usuario")).subscribe(
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
    const url = `/app/medico/pedidos/crear-pedido`;
    this.router.navigateByUrl(url);
    console.log(`Click sobre`);
    console.log(url);
  }
}
