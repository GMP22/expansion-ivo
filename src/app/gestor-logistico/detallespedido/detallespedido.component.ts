import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { PedidosRecibidos } from 'src/app/interfaces/pedidos-recibidos';
import { ServicioService } from '../servicio/servicio.service';
import { DetallesPedido } from 'src/app/interfaces/detalles-pedido';
@Component({
  selector: 'app-detallespedido',
  templateUrl: './detallespedido.component.html',
  styleUrls: ['./detallespedido.component.css']
})
export class DetallespedidoComponent {

  constructor(private route: ActivatedRoute){}
  servicio = inject(ServicioService);
  estado!:string;
  pedidoPendiente!:PedidosPendientes;
  pedidoRecibido!:PedidosRecibidos;
  articulosRecibidos!:DetallesPedido[];
  existir:boolean = false;

  dtOptions: DataTables.Settings = {}
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.estado = params["estado"];
      if (this.estado != "Recibido") {
        this.pedidoPendiente = {
          id_pedido: params["identificadorPedido"],
          proveedor: params["proveedor"],
          fecha_inicial: params["fecha_inicial"],
          numero_productos: params["numero_productos"],
          coste: params["coste"],
        }
      } else {
        this.pedidoRecibido = {
          id_pedido: params["identificadorPedido"],
          proveedor: params["proveedor"],
          fecha_inicial: params["fecha_inicial"],
          fecha_aceptada: params["fecha_aceptada"],
          numero_productos: params["numero_productos"],
          coste: params["coste"],
        }
      }

      this.servicio.obtenerDetallesPedido(params["identificadorPedido"]).subscribe(
        (Response) => {
           this.articulosRecibidos = Response;
           this.existir = true;
        }
      )
    })
  }
}
