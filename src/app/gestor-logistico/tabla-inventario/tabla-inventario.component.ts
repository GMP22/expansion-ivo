import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { InventarioArticulos } from 'src/app/interfaces/inventario-articulos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-inventario',
  templateUrl: './tabla-inventario.component.html',
  styleUrls: ['./tabla-inventario.component.css']
})
export class TablaInventarioComponent {
  existir:boolean = false;
  articulosInventario:InventarioArticulos[] = [];  
  servicioGestor = inject(ServicioService);
  dtOptions: DataTables.Settings = {}

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

    this.servicioGestor.inventario().subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.articulosInventario = response;
      }
    )
  }

  mirarDetalles(id_articulo:number){
    this.router.navigate(['/app/gestor-logistico/inventario/detalles-articulo'], { queryParams: { articulo: id_articulo} });
  }
}
