import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesArticuloInventario } from 'src/app/interfaces/detalles-articulo-inventario';
import { DetallesArticuloProveedorInventario } from 'src/app/interfaces/detalles-articulo-proveedor-inventario';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

interface pedidoAutomatico{
  id_proveedor:number,
  stock_a_pedir:number,
}

@Component({
  selector: 'app-detalles-articulo-inventario',
  templateUrl: './detalles-articulo-inventario.component.html',
  styleUrls: ['./detalles-articulo-inventario.component.css']
})
export class DetallesArticuloInventarioComponent {
  faEye=faEye;
  faPenToSquare=faPenToSquare;
  existir:boolean = false;
  id_articulo!:any;  
  error:boolean = false;
  servicioGestor = inject(ServicioService);
  dtOptions: DataTables.Settings = {}
  proveedores:DetallesArticuloProveedores[] = [];
  detallesArticulo!:DetallesArticuloInventario;
  pedidosProveedores:DetallesArticuloProveedorInventario[]=[];
  solicitudesDepartamentos:DetallesArticuloProveedorInventario[]=[];
  formularioMinimos!: FormGroup;
  automatico!:number;
  detallesAutomatico!:pedidoAutomatico;
  formularioAutomatico!: FormGroup;
  constructor(private router: ActivatedRoute, private route: Router) {}
  activeTab: string =  "Pedidos";
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

        this.servicioGestor.detalleArticulo(this.id_articulo).subscribe(
          (response) => {
            console.log(response);
            this.detallesArticulo = response;
            this.servicioGestor.pedidosConArticuloEspecifico(this.id_articulo).subscribe(
              (Response2) => {
                console.log(Response2)
                  this.existir = true;
                  this.pedidosProveedores = Response2;
                  this.automatico = this.detallesArticulo.pedido_automatico;
                  this.servicioGestor.obtenerProveedoresSegunArticulo(this.detallesArticulo.id_articulo).subscribe(
                    (Response4) => {
                      console.log(Response4);
                      this.proveedores = Response4;
                    }
                  )
              }
            )
          }
        )

        this.formularioMinimos = new FormGroup({
          numeroMinimo: new FormControl(),
        })
    
        this.formularioAutomatico = new FormGroup({
          automatico: new FormControl(),
          proveedores: new FormControl(),
          cantidad: new FormControl(),
        })

        this.servicioGestor.obtenerSolicitudesArticuloEspecifico(this.id_articulo).subscribe(
          (response) => {
            this.solicitudesDepartamentos = response;
          }
        )

        this.servicioGestor.stockAPedir(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
          (response) => {
            console.log(response)
            if (response[0] != 0 && response[1] != 0) {
              this.detallesAutomatico = response;
              this.formularioAutomatico.get("proveedores")?.setValue(this.detallesAutomatico.id_proveedor);
              this.formularioAutomatico.get("cantidad")?.setValue(this.detallesAutomatico.stock_a_pedir);
            }
          }
        )
    })
  }

  verDatosPedido(idPedido:any){

    this.servicioGestor.detallesPedidoEspecifico(idPedido).subscribe((
      (Response3) => {
      //this.router.navigate(['/app/gestor-logistico/detalles-pedido'], { queryParams: { identificadorPedido: pedido.id_pedido, proveedor: pedido.proveedor, fecha_inicial: pedido.fecha_inicial, numero_productos: pedido.numero_productos, coste: pedido.coste, estado: "En Transito" } });
        this.route.navigate(['/app/gestor-logistico/detalles-pedido'], {queryParams: {identificadorPedido: Response3.id_pedido, proveedor: Response3.proveedor, fecha_inicial: Response3.fecha_inicial, numero_productos: Response3.numero_productos, coste: Response3.coste, estado: Response3.estado}})
      }
    ))

  }

  verDatosSolicitud(idPedido:any){
      this.route.navigate(['/app/gestor-logistico/detalles-solicitud'], {queryParams: {solicitud: idPedido}})
  }

  cambiarMinimo(){
    this.servicioGestor.cambiarMinimos(this.id_articulo, this.formularioMinimos.get("numeroMinimo")?.value).subscribe(
      (Response) => {
        console.log(Response);
        this.detallesArticulo.stock_minimo = this.formularioMinimos.get("numeroMinimo")?.value;
        this.detallesArticulo.estado = Response;
      }
    )
  }

  recibirDato(activeTab: string) {
    this.activeTab = activeTab;
    console.log(activeTab);
  } 

  verificar(entrada:any){
    if (entrada.target.value <= 0) {
      this.error = true;
    } else {
      this.error = false;
    }
  }

  mantenerValorMinimo(){
    this.error = false;
    this.formularioMinimos.get("numeroMinimo")?.setValue(0);
  }

  deshabilitar(){
    console.log(this.formularioAutomatico.get("automatico")?.value);
    if (this.formularioAutomatico.get("automatico")?.value == 0) {
      $("#numeroAutomatico").prop("disabled", true);
      $("#proveedores").prop("disabled", true);
    } else {
      $("#numeroAutomatico").prop("disabled", false);
        $("#proveedores").prop("disabled", false);
    }
  }

  cambiarAutomatico(){

    if (this.formularioAutomatico.get("automatico")?.value == 1) { //Esta Activado
      let objeto = {
        id_proveedor: this.formularioAutomatico.get("proveedores")?.value,
        cantidad: this.formularioAutomatico.get("cantidad")?.value,
        id_articulo: this.id_articulo,
        id_usuario: localStorage.getItem('id_usuario'),
      }

      this.servicioGestor.nuevoPedidoAutomatico(objeto).subscribe(
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

      this.servicioGestor.eliminarPedidoAutomatico(objeto).subscribe(
        (Response) => {
          console.log(Response);
          this.detallesArticulo.pedido_automatico = 0;
        }
      )

    }
  }
}
