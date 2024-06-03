import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-detalles-proveedor',
  templateUrl: './detalles-proveedor.component.html',
  styleUrls: ['./detalles-proveedor.component.css']
})
export class DetallesProveedorComponent {
  constructor(private router: ActivatedRoute, private route: Router) {}
  servicioGestor = inject(ServicioService);
  proveedor!:any;
  ngOnInit(){

    this.router.queryParams.subscribe(params => {
      this.servicioGestor.obtenerProveedorSegunId(params["proveedor"]).subscribe(
        (Response) => {
          this.proveedor = Response;
        }
      )
    })
  }

}
