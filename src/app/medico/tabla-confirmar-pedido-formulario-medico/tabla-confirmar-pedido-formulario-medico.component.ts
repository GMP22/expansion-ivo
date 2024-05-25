import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';

@Component({
  selector: 'app-tabla-confirmar-pedido-formulario-medico',
  templateUrl: './tabla-confirmar-pedido-formulario-medico.component.html',
  styleUrls: ['./tabla-confirmar-pedido-formulario-medico.component.css']
})
export class TablaConfirmarPedidoFormularioMedicoComponent {

  medicoServicio = inject(MedicoService);
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

    this.medicoServicio.articulos.subscribe(
      (response) => {
        this.existir = false;
        this.articulos = response;
        this.existir = true;
      }
    )
  }

}
