import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
import { TablaArticulosFormularioComponent } from '../tabla-articulos-formulario/tabla-articulos-formulario.component';
import { ArticuloFormulario } from 'src/app/interfaces/articulo-formulario';

@Component({
  selector: 'app-tabla-carrito-formulario',
  templateUrl: './tabla-carrito-formulario.component.html',
  styleUrls: ['./tabla-carrito-formulario.component.css']
})
export class TablaCarritoFormularioComponent {
  existir:boolean = true;
  servicioGestor = inject(ServicioService);
  articulos:ArticuloEscogido [] = []
  @ViewChild('a') botonModalPendiente2!: ElementRef;
  @Input() tablaArticulos!:TablaArticulosFormularioComponent;
  @Output() articuloEscogido = new EventEmitter<ArticuloEscogido>();
  @Output() proveedoresArticulo = new EventEmitter<DetallesArticuloProveedores[]>();
  @Output() indiceSeleccionado = new EventEmitter<number>();
   constructor() {}

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

    this.servicioGestor.articulos.subscribe(
      (response) => {
        this.existir = false;
        this.articulos = response;
        this.existir = true;
      }
    )
  }
  sumarArticulo(indice:any){
    this.servicioGestor.sumarArticulo(indice, 1);
  }
  restarArticulo(indice:any){
    this.servicioGestor.restarArticulo(indice, 1);
  }
  borrarArticulo(indice:any){
    this.servicioGestor.borrarArticulo(indice);
  }
  mostrarDetallesArticulo(indice:number, id_articulo:number){

  this.servicioGestor.obtenerProveedoresSegunArticulo(id_articulo).subscribe(
      (Response) =>{
        let proveedores:DetallesArticuloProveedores []=Response;
        this.proveedoresArticulo.emit(proveedores);
        this.indiceSeleccionado.emit(indice);
        $("#cantidad_por_lote2").val(this.servicioGestor.obtenerArticuloSegunId(indice).cantidad_por_lote);
        $("#coste_por_lote2").val(this.servicioGestor.obtenerArticuloSegunId(indice).coste_por_lote);
        this.articuloEscogido.emit(this.servicioGestor.obtenerArticuloSegunId(indice));
        this.botonModalPendiente2.nativeElement.click();
      }
    )
  }

}
