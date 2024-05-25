import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { InventarioArticulos } from 'src/app/interfaces/inventario-articulos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-inventario-medico',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.css']
})
export class TablaInventarioComponent {
  existir:boolean = false;
  articulosInventario:InventarioArticulos[] = [];  
  servicioMedico = inject(MedicoService);
  dtOptions: DataTables.Settings = {};

  constructor(private router: Router) {}

  ngOnInit():void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    this.servicioMedico.inventario(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.articulosInventario = response;
      }
    )
  }

  mirarDetalles(id_articulo:number){
    this.router.navigate(['/app/medico/inventario/detalles-articulo'], { queryParams: { articulo: id_articulo} });
  }
}
