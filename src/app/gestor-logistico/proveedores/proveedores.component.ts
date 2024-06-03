import { Component, ViewChild, ElementRef } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { Router } from '@angular/router';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
interface proveedor {
id_proveedor: number,
nif: string,
nombre: string,
telefono: string,
email: string,
}
interface modal {
  id_proveedor: number,
  nombre: string,
  cantidad: number,
  }
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
  @ViewChild('botonModalProveedores') botonModalProveedores!: ElementRef;
  existir:boolean = false;
  faEye = faEye;
  faTrash = faTrash;
  numero!:number;
  contenidoModal:modal[] = [];
  contenido:proveedor [] = [];
  dtOptions: DataTables.Settings = {}

  gestorServicio = inject(ServicioService);
  constructor(private router: Router) {}
  

  ngOnInit(){

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    this.gestorServicio.proveedoresNumeros().subscribe(
      (response) => {
        this.numero = response;
      }
    )

    this.gestorServicio.proveedores().subscribe(
      (response) => {
        this.existir = true;
        this.contenido = response;
      }
    )
  }

  proveedores(){
    this.existir = false;
    this.gestorServicio.proveedoresModal().subscribe(
      (response) => {
        this.existir = true;
        this.contenidoModal = response;
        console.log(this.contenidoModal)
        this.botonModalProveedores.nativeElement.click();
      }
    )
  }

  mirarDetalles(id_proveedor:number){
    this.router.navigate(['/app/gestor-logistico/proveedores/detalles-proveedor'], { queryParams: {proveedor: id_proveedor} });
  }
}
