import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Router } from '@angular/router';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { DetallesArticulo } from 'src/app/interfaces/detalles-articulo';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
interface proveedores {
  id_proveedor: number,
  nombre_proveedor: string,
}
@Component({
  selector: 'app-tabla-articulos-formulario',
  templateUrl: './tabla-articulos-formulario.component.html',
  styleUrls: ['./tabla-articulos-formulario.component.css']
})
export class TablaArticulosFormularioComponent {
  faPlus = faPlus;
  faTriangleExclamation = faTriangleExclamation;
  articulos!:ArticuloEscogido[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  servicioGestor = inject(ServicioService);
  @ViewChild('botonModalPendiente') botonModalPendiente!: ElementRef;
  @Output() articuloNuevo = new EventEmitter<ArticuloEscogido>();
  @Output() proveedores = new EventEmitter<proveedores[]>();

  constructor(private router: Router) {}

  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
      scrollY: 320
    }

    this.servicioGestor.obtenerArticulosFormulario().subscribe(
      (response) => {
        this.existir = true;
        this.articulos = response;
        console.log(this.articulos);
      }
    )
  }

  cambiarListado(evento:any){
    console.log("hola");
    this.existir = false;
      if(evento.target.checked){
        this.servicioGestor.obtenerArticulosMinimosFormulario().subscribe(
        (response) => {
            console.log(response);
            this.existir = true;
            this.articulos = response;
          }
        )
      } else {
        this.servicioGestor.obtenerArticulosFormulario().subscribe(
          (response) => {
            console.log(response);
            this.existir = true;
            this.articulos = response;
          }
        )
      
      }
    }

  mostrarModalDeArticulo(entrada:ArticuloEscogido){
    this.servicioGestor.obtenerDetallesArticulosFormulario(entrada.id_articulo).subscribe(
      (response) => {
        this.existir = true;

        let rdo:proveedores[] = response;

        $("#coste_por_lote").val("")
        $("#cantidad_por_lote").val("")
        $("#numeroLotes").val("");
        this.articuloNuevo.emit(entrada);
        this.proveedores.emit(rdo);
        this.botonModalPendiente.nativeElement.click();
      }
    )
  }
}
