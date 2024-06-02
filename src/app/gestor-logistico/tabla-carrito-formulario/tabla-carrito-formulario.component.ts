import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
import { TablaArticulosFormularioComponent } from '../tabla-articulos-formulario/tabla-articulos-formulario.component';
import { ArticuloFormulario } from 'src/app/interfaces/articulo-formulario';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CrearPedidoComponent } from '../crear-pedido/crear-pedido.component';

interface proveedores {
  id_proveedor: number,
  nombre_proveedor: string,
}

@Component({
  selector: 'app-tabla-carrito-formulario',
  templateUrl: './tabla-carrito-formulario.component.html',
  styleUrls: ['./tabla-carrito-formulario.component.css']
})

export class TablaCarritoFormularioComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  faFile = faFile;
  faTrash = faTrash;

  existir:boolean = true;
  servicioGestor = inject(ServicioService);
  articulos:ArticuloEscogido [] = [];
  @ViewChild('a') botonModalPendiente2!: ElementRef;
  @Input() tablaArticulos!:TablaArticulosFormularioComponent;
  @Output() articuloEscogido = new EventEmitter<ArticuloEscogido>();
  @Output() proveedoresArticulo = new EventEmitter<proveedores[]>();
  @Output() indiceSeleccionado = new EventEmitter<number>();
  @Output() proveedorEscogido = new EventEmitter<number>();
  @Output() nLotes = new EventEmitter<number>();
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

  this.servicioGestor.obtenerDetallesArticulosFormulario(id_articulo).subscribe(
      (Response) =>{
        let proveedores:proveedores []=Response;
        let articulo:ArticuloEscogido = this.servicioGestor.obtenerArticuloSegunId(indice);
        this.proveedoresArticulo.emit(proveedores);
        this.indiceSeleccionado.emit(indice);
        this.articuloEscogido.emit(articulo);
        this.proveedorEscogido.emit(articulo.id_proveedor);
        console.log(articulo);

        this.servicioGestor.obtenerNlotes(id_articulo).subscribe(
          (response) => {
            console.log(response)
            this.nLotes.emit(parseInt(response));
            $("#cantidad_por_lote2").attr("value", articulo.cantidad_por_lote);
            $("#coste_por_lote2").attr("value", articulo.coste_por_lote);
            this.botonModalPendiente2.nativeElement.click();
          }
        )
      }
    )
  }
}
