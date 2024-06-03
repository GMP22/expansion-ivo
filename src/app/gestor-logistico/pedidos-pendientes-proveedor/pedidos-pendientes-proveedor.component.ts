import { Component, Input } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { faEye }  from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-pedidos-pendientes-proveedor',
  templateUrl: './pedidos-pendientes-proveedor.component.html',
  styleUrls: ['./pedidos-pendientes-proveedor.component.css']
})
export class PedidosPendientesProveedorComponent {

  faEye = faEye;
  faSquareCheck = faSquareCheck;
  pedidos!:PedidosPendientes[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  id_pedidoSeleccionado!:number;
  servicioGestor = inject(ServicioService);
  @Input() proveedor!:number;

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

    this.servicioGestor.obtenerProveedorPedidosPendientes(this.proveedor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  mirarDetalles(pedido:PedidosPendientes){
    this.router.navigate(['/app/gestor-logistico/detalles-pedido'], { queryParams: { identificadorPedido: pedido.id_pedido, proveedor: pedido.proveedor, fecha_inicial: pedido.fecha_inicial, numero_productos: pedido.numero_productos, coste: pedido.coste, estado: "En Transito" } });
  }


  seleccionarPedido(idPedido:any){
    this.id_pedidoSeleccionado = idPedido;
  }

  recibirPedido(idPedido:any){
    this.servicioGestor.recibirPedido(idPedido).subscribe(
      (Response) => {
        this.existir = false;
        console.log(Response);
        this.servicioGestor.obtenerProveedorPedidosPendientes(this.proveedor).subscribe(
          (response) => {
            console.log(response);
            this.existir = true;
            this.pedidos = response;
          }
        )
      }
    );
  }
}
