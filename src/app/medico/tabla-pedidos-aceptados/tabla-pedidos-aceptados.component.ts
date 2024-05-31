import { Component } from '@angular/core';
import { PedidosRecibidos } from 'src/app/interfaces/pedidos-recibidos';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { Input } from '@angular/core';
import { faEye }  from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-tabla-pedidos-aceptados',
  templateUrl: './tabla-pedidos-aceptados.component.html',
  styleUrls: ['./tabla-pedidos-aceptados.component.css']
})
export class TablaPedidosAceptadosComponent {
  pedidos!:PedidosRecibidos[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  servicioMedico = inject(MedicoService);

  constructor(private router: Router) {}
faEye = faEye;
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

    this.servicioMedico.obtenerPedidosRecibidos(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  mirarDetalles(pedido:number){
    this.router.navigate(['/app/medico/pedidos/detalles-pedido'], { queryParams: {id_pedido:pedido } });
  }
}
