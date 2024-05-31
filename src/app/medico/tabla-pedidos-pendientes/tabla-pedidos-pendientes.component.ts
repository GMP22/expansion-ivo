import { Component } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { faEye }  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabla-pedidos-pendientes',
  templateUrl: './tabla-pedidos-pendientes.component.html',
  styleUrls: ['./tabla-pedidos-pendientes.component.css']
})
export class TablaPedidosPendientesMedicoComponent {

  pedidos!:PedidosPendientes[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  id_pedidoSeleccionado!:number;
  servicioMedico = inject(MedicoService);

  faEye = faEye;

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

    this.servicioMedico.obtenerPedidosPendientes(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  
  mirarDetalles(pedido:number){
    this.router.navigate(['/app/medico/pedidos/detalles-pedido'], { queryParams: {id_pedido: pedido} });
  }
}
