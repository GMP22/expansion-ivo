import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesArticuloInventario } from 'src/app/interfaces/detalles-articulo-inventario';
import { DetallesArticuloProveedorInventario } from 'src/app/interfaces/detalles-articulo-proveedor-inventario';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';

@Component({
  selector: 'app-detalles-inventario-medico',
  templateUrl: './detalles-inventario-medico.component.html',
  styleUrls: ['./detalles-inventario-medico.component.css']
})
export class DetallesInventarioMedicoComponent {
  existir:boolean = false;
  id_articulo!:any;  
  servicioMedico = inject(MedicoService);
  dtOptions: DataTables.Settings = {}
  detallesArticulo!:DetallesArticuloInventario;
  pedidosProveedores:DetallesArticuloProveedorInventario[]=[];
  formularioMinimos!: FormGroup;
  formularioAutomatico!: FormGroup;

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
      this.id_articulo = params["articulo"];
        this.servicioMedico.detalleArticulo(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
          (response) => {
            console.log(response);
            this.detallesArticulo = response;
            this.servicioMedico.pedidosConArticuloEspecifico(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
              (Response2) => {
                console.log(Response2)
                  this.existir = true;
                  this.pedidosProveedores = Response2;
              }
            )
          }
        )
    })


    this.formularioMinimos = new FormGroup({
      numeroMinimo: new FormControl(),
    })

    this.formularioAutomatico = new FormGroup({
      automatico: new FormControl(),
      proveedores: new FormControl(),
      cantidad: new FormControl(),
    })
  }

  cambiarAutomatico(){
    if (this.formularioAutomatico.get("automatico")?.value == 1) { //Esta Activado
      let objeto = {
        cantidad: this.formularioAutomatico.get("cantidad")?.value,
        id_articulo: this.id_articulo,
        id_usuario: localStorage.getItem('id_usuario'),
      }

      this.servicioMedico.nuevoPedidoAutomatico(objeto).subscribe(
        (Response) => {
          console.log(Response);
          this.detallesArticulo.pedido_automatico = 1;
        }
      )
    } else {
      let objeto = {
        id_articulo: this.id_articulo,
        id_usuario: localStorage.getItem('id_usuario'),
      }

      this.servicioMedico.eliminarPedidoAutomatico(objeto).subscribe(
        (Response) => {
          console.log(Response);
          this.detallesArticulo.pedido_automatico = 0;
        }
      )
    }
  }

  cambiarMinimo(){
    this.servicioMedico.cambiarMinimos(localStorage.getItem('id_usuario'), this.id_articulo, this.formularioMinimos.get("numeroMinimo")?.value).subscribe(
      (Response) => {
        console.log(Response);
        this.detallesArticulo.stock_minimo = this.formularioMinimos.get("numeroMinimo")?.value;
        this.detallesArticulo.estado = Response;
      }
    )
  }
}
