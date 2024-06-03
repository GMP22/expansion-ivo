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
  existir:boolean = false;
  activeTab: string =  "Datos";
  id_proveedor!:number;
  ngOnInit(){

    this.router.queryParams.subscribe(params => {
      this.id_proveedor = params["proveedor"];
      console.log(this.id_proveedor)
      this.existir = true;
      this.servicioGestor.obtenerProveedorSegunId(params["proveedor"]).subscribe(
        (Response) => {
          this.proveedor = Response;
        }
      )
    })
  }
  
  recibirDato(activeTab: string) {
     this.activeTab = activeTab;
     console.log(activeTab);
   } 
}
