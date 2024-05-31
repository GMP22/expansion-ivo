import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosRecibidos } from 'src/app/interfaces/pedidos-recibidos';
import { MedicoService } from '../servicio/medico.service';
import { DetallesPedido } from 'src/app/interfaces/detalles-pedido';
interface pedido {
  estado: string,
  numero_productos: number,
  fecha_inicial: string,
  fecha_aceptada: string,
}

interface detalles {
  nombre: string,
  nombre_categoria: number,
  lotes_recibidos: string,
}

@Component({
  selector: 'app-detalles-pedido-medico',
  templateUrl: './detalles-pedido-medico.component.html',
  styleUrls: ['./detalles-pedido-medico.component.css']
})

export class DetallesPedidoMedicoComponent {
  constructor(private route: ActivatedRoute){}
  servicio = inject(MedicoService);
  pedidoRecibido!:pedido;
  existir:boolean = false;
  articulos:detalles [] = []; 
  id_pedido!:number;
  dtOptions: DataTables.Settings = {
    dom:'rt',
  }

  ngOnInit(){
    this.route.queryParams.subscribe(params => {
      this.id_pedido = params["id_pedido"];

      this.servicio.detallesPedido(this.id_pedido).subscribe(
        (response) => {
            this.pedidoRecibido = response;
            this.servicio.obtenerArticulosPedido(this.id_pedido).subscribe(
              (response) => {
                this.existir = true;
                this.articulos = response;
              }
            )
        }
      )
    });
  }
}
