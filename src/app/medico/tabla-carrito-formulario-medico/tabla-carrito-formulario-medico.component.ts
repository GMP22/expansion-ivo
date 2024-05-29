import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
import { ArticuloFormulario } from 'src/app/interfaces/articulo-formulario';


@Component({
  selector: 'app-tabla-carrito-formulario-medico',
  templateUrl: './tabla-carrito-formulario-medico.component.html',
  styleUrls: ['./tabla-carrito-formulario-medico.component.css']
})
export class TablaCarritoFormularioMedicoComponent {
  faFileLines = faFileLines;
  faMinus= faMinus;
  faPlus=faPlus;
  faTrash=faTrash;
  existir:boolean = true;
  dtOptions: DataTables.Settings = {}
  servicioMedico = inject(MedicoService);
  articulos:ArticuloEscogido [] = []
  @ViewChild('a') botonModalPendiente2!: ElementRef;
  @Output() articuloEscogido = new EventEmitter<ArticuloEscogido>();
  @Output() indiceSeleccionado = new EventEmitter<number>();
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

    this.servicioMedico.articulos.subscribe(
      (response) => {
        this.existir = false;
        this.articulos = response;
        this.existir = true;
      }
    )
  }
  sumarArticulo(indice:any){
    this.servicioMedico.sumarArticulo(indice, 1);
  }
  restarArticulo(indice:any){
    this.servicioMedico.restarArticulo(indice, 1);
  }
  borrarArticulo(indice:any){
    this.servicioMedico.borrarArticulo(indice);
  }
  mostrarDetallesArticulo(indice:number, id_articulo:number){
        this.servicioMedico.obtenerArticuloSegunId(id_articulo);
        this.indiceSeleccionado.emit(indice);

        this.servicioMedico.obtenerNlotes(localStorage.getItem("id_usuario"), id_articulo).subscribe(
          (response) => {
            let articulo:ArticuloEscogido = this.servicioMedico.obtenerArticuloSegunId(indice); 
            console.log(response);
            articulo.id_proveedor = parseInt(response);

            this.articuloEscogido.emit(articulo);
            this.botonModalPendiente2.nativeElement.click();
          }
        )

       
  }
}
