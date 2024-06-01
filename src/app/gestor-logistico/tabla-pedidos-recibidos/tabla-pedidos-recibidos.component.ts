import { Component } from '@angular/core';
import { PedidosRecibidos } from 'src/app/interfaces/pedidos-recibidos';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Input } from '@angular/core';
import { faEye }  from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tabla-pedidos-recibidos',
  templateUrl: './tabla-pedidos-recibidos.component.html',
  styleUrls: ['./tabla-pedidos-recibidos.component.css']
})
export class TablaPedidosRecibidosComponent {
  faEye = faEye;
  pedidos!:PedidosRecibidos[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  servicioGestor = inject(ServicioService);

  constructor(private router: Router) {}

  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    this.servicioGestor.obtenerPedidosRecibidos(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  mirarDetalles(pedido:PedidosRecibidos){
    this.router.navigate(['/app/gestor-logistico/detalles-pedido'], { queryParams: { identificadorPedido: pedido.id_pedido, proveedor: pedido.proveedor, fecha_inicial: pedido.fecha_inicial, fecha_aceptada: pedido.fecha_aceptada, numero_productos: pedido.numero_productos, coste: pedido.coste, estado: "Recibido" } });
  }
}
