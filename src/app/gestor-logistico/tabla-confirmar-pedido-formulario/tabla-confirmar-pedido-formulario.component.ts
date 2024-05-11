import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
@Component({
  selector: 'app-tabla-confirmar-pedido-formulario',
  templateUrl: './tabla-confirmar-pedido-formulario.component.html',
  styleUrls: ['./tabla-confirmar-pedido-formulario.component.css']
})
export class TablaConfirmarPedidoFormularioComponent {
  servicioGestor = inject(ServicioService);
  dtOptions: DataTables.Settings = {}
  articulos:ArticuloEscogido [] = [];
  existir:boolean = true;
  
  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pageLength: 5,
      pagingType: "numbers",
      info: false,
    }

    this.servicioGestor.articulos.subscribe(
      (response) => {
        this.existir = false;
        this.articulos = response;
        this.existir = true;
      }
    )
  }
}
