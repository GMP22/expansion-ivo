import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallesArticuloInventario } from 'src/app/interfaces/detalles-articulo-inventario';
import { DetallesArticuloProveedorInventario } from 'src/app/interfaces/detalles-articulo-proveedor-inventario';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { PedidosPendientes } from 'src/app/interfaces/pedidos-pendientes';

interface Cita {
  sip: string;
  nombre: string;
  apellido: string;
  hora: string;
  id_cita: number;
  estado: string;
  id_paciente: number;
}

interface resultado {
  id_cita: number,
  lotes_usados: number,
}

@Component({
  selector: 'app-detalles-inventario-medico',
  templateUrl: './detalles-inventario-medico.component.html',
  styleUrls: ['./detalles-inventario-medico.component.css']
})

export class DetallesInventarioMedicoComponent {
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  existir:boolean = false;
  citas:resultado [] = [];
  error:boolean = false;
  id_articulo!:any;  
  servicioMedico = inject(MedicoService);
  dtOptions: DataTables.Settings = {}
  detallesArticulo!:DetallesArticuloInventario;
  pedidosProveedores:DetallesArticuloProveedorInventario[]=[];
  formularioMinimos!: FormGroup;
  formularioAutomatico!: FormGroup;
  activeTab: string =  "Pedidos";
  automatico!:number;

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

            this.automatico = this.detallesArticulo.pedido_automatico;
            this.servicioMedico.pedidosConArticuloEspecifico(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
              (Response2) => {
                console.log(Response2)
                  this.existir = true;
                  this.pedidosProveedores = Response2;
              }
            )

            this.servicioMedico.obtenerArticuloEnCita(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
              (response) => {
                this.citas = response;
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
    this.formularioMinimos.get("numeroMinimo")?.setValue(0);

    this.servicioMedico.stockAPedir(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
      (response) => {
        this.formularioAutomatico.get("cantidad")?.setValue(response);
      }
    )
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

  mantenerValorAutomatico(){
    this.error = false;
    this.servicioMedico.stockAPedir(localStorage.getItem("id_usuario"), this.id_articulo).subscribe(
      (response) => {
        this.formularioAutomatico.get("cantidad")?.setValue(response);
      }
    )
  }

  deshabilitar(){
    console.log(this.formularioAutomatico.get("automatico")?.value);
    if (this.formularioAutomatico.get("automatico")?.value == 0) {
        $("#numeroAutomatico").prop("disabled", false);
    } else {
      $("#numeroAutomatico").prop("disabled", true);
    }
  }

  cambiarAutomatico(){
    if (this.formularioAutomatico.get("automatico")?.value == 1 && this.error != true) { //Esta Activado
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
          this.formularioAutomatico.get("cantidad")?.setValue(0)
        }
      )
    }
  }

  cambiarMinimo(){
    if (!this.error) {
      this.servicioMedico.cambiarMinimos(localStorage.getItem('id_usuario'), this.id_articulo, this.formularioMinimos.get("numeroMinimo")?.value).subscribe(
        (Response) => {
          console.log(Response);
          this.detallesArticulo.stock_minimo = this.formularioMinimos.get("numeroMinimo")?.value;
          this.detallesArticulo.estado = Response;
          this.formularioMinimos.get("numeroMinimo")?.setValue(0);
        }
      )
    }
  }

   recibirDato(activeTab: string) {
    this.activeTab = activeTab;
    console.log(activeTab);
  } 
  mirarDetalles(pedido:number){
    this.route.navigate(['/app/medico/pedidos/detalles-pedido'], { queryParams: {id_pedido: pedido} });
  }

  mirarCita(idCita:any){
    this.servicioMedico.obtenerCitaPorId(idCita).subscribe(
    (response)=>{
        let cita:Cita = response;
        this.route.navigate(['/app/medico/atender-paciente'], { queryParams: { sip: cita.sip, nombre: cita.nombre, apellido: cita.apellido, hora: cita.hora, id_cita: cita.id_cita, estado: cita.estado, id_paciente: cita.id_paciente}});
      }
    )
  }
}
