import { Component } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Input } from '@angular/core';
@Component({
  selector: 'app-tabla-pedidos-pendientes',
  templateUrl: './tabla-pedidos-pendientes.component.html',
  styleUrls: ['./tabla-pedidos-pendientes.component.css']
})
export class TablaPedidosPendientesComponent {

  pedidos!:PedidosPendientes[];
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

    this.servicioGestor.obtenerPedidosPendientes(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }
}
