import { Component, ElementRef, ViewChild } from '@angular/core';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { SolicitudesEntrantes } from 'src/app/interfaces/solicitudes-entrantes';
import { ArticulosMinimosSolicitud } from 'src/app/interfaces/articulos-minimos-solicitud';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabla-solicitudes-entrantes',
  templateUrl: './tabla-solicitudes-entrantes.component.html',
  styleUrls: ['./tabla-solicitudes-entrantes.component.css']
})
export class TablaSolicitudesEntrantesComponent {
  faEye = faEye;
  faSquareCheck = faSquareCheck;

  pedidos!:SolicitudesEntrantes[];
  articulosMinimosSolicitud!:ArticulosMinimosSolicitud[];
  existir:boolean = false;
  existir2:boolean = false;
  @ViewChild('preguntaMinimos') preguntaMinimos!: ElementRef;
  @ViewChild('preguntaAceptar') preguntaAceptar!: ElementRef;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  id_pedidoSeleccionado!:number;
  servicioGestor = inject(ServicioService);



  constructor(private router: Router) {}

  dtOptions: DataTables.Settings = {}
  dtOptions2: DataTables.Settings = {}
  ngOnInit(): void {

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    this.dtOptions2 = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
      searching: false,
      dom: "t",
      scrollY: 420,
    }

    this.servicioGestor.obtenerSolicitudesEntrantes(this.idGestor).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.pedidos = response;
      }
    )
  }

  seleccionarPedido(idPedido:any){
    this.id_pedidoSeleccionado = idPedido;
    this.servicioGestor.articulosMinimosSolicitud(idPedido).subscribe(
      (Response) => {
        this.articulosMinimosSolicitud = Response;
          if (this.articulosMinimosSolicitud.length == 0) {
            this.preguntaAceptar.nativeElement.click();
          } else {
            this.preguntaMinimos.nativeElement.click();
            this.existir2 = true;
        }
      }
    )
  }

  mirarDetalles(id_solicitud:number){
    this.router.navigate(['/app/gestor-logistico/detalles-solicitud'], { queryParams: { solicitud: id_solicitud } });
  }

  recibirPedido(){
    let contenido:any = [];

    if (this.existir2 == true) {
      let idArticulos = $("#preguntaMinimos").find("input");

      for (let index = 0; index < idArticulos.length; index++) {
        let objeto:ArticulosMinimosSolicitud = {
          id_articulo: parseInt(idArticulos[index].id),
          lotes_disponibles: parseInt(idArticulos[index].value),
          nombre_articulo: "",
        }
        contenido [index]=objeto;
      }
    
    } 
    
    this.servicioGestor.aceptarSolicitudEntrante(this.idGestor, this.id_pedidoSeleccionado, contenido).subscribe(
      (Response) => {
        this.existir = false;
        console.log(Response);
        this.servicioGestor.obtenerSolicitudesEntrantes(this.idGestor).subscribe(
          (response) => {
            console.log(response);
            this.existir = true;
            this.pedidos = response;
          }
        )
      }
    );
    
  }
}
