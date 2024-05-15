import { Component } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { SolicitudesEntrantes } from 'src/app/interfaces/solicitudes-entrantes';

@Component({
  selector: 'app-tabla-solicitudes-entrantes',
  templateUrl: './tabla-solicitudes-entrantes.component.html',
  styleUrls: ['./tabla-solicitudes-entrantes.component.css']
})
export class TablaSolicitudesEntrantesComponent {
  pedidos!:SolicitudesEntrantes[];
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
    }

    this.servicioGestor.obtenerSolicitudesEntrantes(this.idGestor).subscribe(
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

  recibirPedido(){
    let x = [0,0]
    let contenido:any = [x];
    this.servicioGestor.aceptarSolicitudEntrante(this.idGestor, this.id_pedidoSeleccionado, contenido).subscribe(
      (Response) => {
        this.existir = false;
        console.log(Response);
        this.servicioGestor.obtenerSolicitudesEntrantes(this.idGestor).subscribe(
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
