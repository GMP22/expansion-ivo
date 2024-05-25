import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { Router } from '@angular/router';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';

@Component({
  selector: 'app-tabla-articulos-formulario-medico',
  templateUrl: './tabla-articulos-formulario-medico.component.html',
  styleUrls: ['./tabla-articulos-formulario-medico.component.css']
})
export class TablaArticulosFormularioMedicoComponent {
  articulos!:ArticuloEscogido[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  servicioMedico = inject(MedicoService);
  @ViewChild('botonModalPendiente') botonModalPendiente!: ElementRef;
  @Output() articuloNuevo = new EventEmitter<ArticuloEscogido>();
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

    this.servicioMedico.obtenerArticulosFormulario().subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.articulos = response;
      }
    )
  }

  mostrarModalDeArticulo(entrada:ArticuloEscogido){
        console.log(entrada);
        this.articuloNuevo.emit(entrada);
        this.existir = true;
        this.botonModalPendiente.nativeElement.click();
  }
}
