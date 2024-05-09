import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Router } from '@angular/router';
import { ArticuloFormulario } from 'src/app/interfaces/articulo-formulario';

@Component({
  selector: 'app-tabla-articulos-formulario',
  templateUrl: './tabla-articulos-formulario.component.html',
  styleUrls: ['./tabla-articulos-formulario.component.css']
})
export class TablaArticulosFormularioComponent {
  articulos!:ArticuloFormulario[];
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
      pageLength: 5,
      pagingType: "numbers",
      info: false,
    }

    this.servicioGestor.obtenerArticulosFormulario().subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.articulos = response;
      }
    )
  }
}
