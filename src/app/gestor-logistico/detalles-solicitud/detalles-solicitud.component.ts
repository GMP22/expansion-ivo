import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesHistorial } from 'src/app/interfaces/solicitudes-historial';
@Component({
  selector: 'app-detalles-solicitud',
  templateUrl: './detalles-solicitud.component.html',
  styleUrls: ['./detalles-solicitud.component.css']
})
export class DetallesSolicitudComponent {
  servicioGestor = inject(ServicioService);
  detalles!:SolicitudesHistorial;
  articulos!:any;
  dtOptions: DataTables.Settings = {}
  id_solicitud!:any;
  existir:boolean = false;

  constructor(private router: ActivatedRoute, private route: Router) {}

  ngOnInit():void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    this.router.queryParams.subscribe(params => {
      this.id_solicitud = params["solicitud"];

      this.servicioGestor.obtenerDetallesSolicitud(this.id_solicitud).subscribe(
        (Response) => {
          this.detalles = Response;

          this.servicioGestor.obtenerArticulosSolicitud(this.id_solicitud).subscribe(
            (Response2) => {
              this.articulos = Response2;
              this.existir = true;
            }
          )
        }
      )
    })
  }
}
