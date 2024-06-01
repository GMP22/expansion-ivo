import { Component } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { SolicitudesEntrantes } from 'src/app/interfaces/solicitudes-entrantes';
import { SolicitudesHistorial } from 'src/app/interfaces/solicitudes-historial';
import { faEye } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tabla-solicitudes-historial',
  templateUrl: './tabla-solicitudes-historial.component.html',
  styleUrls: ['./tabla-solicitudes-historial.component.css']
})
export class TablaSolicitudesHistorialComponent {
  faEye=faEye;
  pedidos!:SolicitudesHistorial[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  id_pedidoSeleccionado!:number;
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
      scrollY: 420,
    }

    this.servicioGestor.obtenerSolicitudesHistorial(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  seleccionarPedido(idPedido:any){
    this.id_pedidoSeleccionado = idPedido;
  }

  mirarDetalles(id_solicitud:number){
    this.router.navigate(['/app/gestor-logistico/detalles-solicitud'], { queryParams: { solicitud: id_solicitud } });
  }
}
