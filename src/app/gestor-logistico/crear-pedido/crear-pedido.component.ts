import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetallesArticulo } from 'src/app/interfaces/detalles-articulo';
import { ServicioService } from '../servicio/servicio.service';
import { inject } from '@angular/core';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';

interface proveedores {
  id_proveedor: number,
  nombre_proveedor: string,
}

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})

export class CrearPedidoComponent {

    datos!:ArticuloEscogido;
    datos2!:ArticuloEscogido;
    proveedoresDatos!:proveedores[];
    proveedorEscogido!:number;
    nLotesActuales!:number;
    indiceSeleccionado!:number;
    formularioPedido: FormGroup;
    formularioPedido2: FormGroup;
    servicioGestor = inject(ServicioService);
    @ViewChild('seguroEnviar') seguroEnviar!: ElementRef;
    ubicacion = 0;
    error:boolean = false;
    error2:boolean = false;
  constructor(private formBuilder: FormBuilder){
    this.formularioPedido = new FormGroup({
      categoria: new FormControl(),
      proveedor: new FormControl(),
      numeroLotes: new FormControl(),
      coste_por_lote: new FormControl(),
      cantidad_por_lote: new FormControl(),
    });

    this.formularioPedido2 = new FormGroup({
      categoria2: new FormControl(),
      proveedor2: new FormControl(),
      numeroLotes2: new FormControl(),
      coste_por_lote2: new FormControl(),
      cantidad_por_lote2: new FormControl(),
    });
  }

  verificar(entrada:any){
    if (entrada.target.value <= 0) {
      this.error = true;
    } else {
      this.error = false;
    }
  }

  siguiente(){

    if (this.servicioGestor.carrito.length > 0) {
      this.error2 = false;
      if (this.ubicacion==1) {
        this.abrirModal();
      } else {
        this.ubicacion++;
        $('#flecha').addClass('border-3');
        $('#flecha').addClass('barra-inferior');
  
        $('#paso2').addClass('border-3');
        $('#paso2').addClass('barra-inferior');
      }
    } else {
      this.error2 = true;
    }
  }

  anterior(){
    this.ubicacion--;
    $('#flecha').removeClass('border-3');
    $('#flecha').removeClass('barra-inferior');

    $('#paso2').removeClass('border-3');
    $('#paso2').removeClass('barra-inferior');
  }

  abrirModal(){
    this.seguroEnviar.nativeElement.click();
  }

  enviarDatos(){
    this.servicioGestor.registrarPedido(localStorage.getItem('id_usuario')).subscribe(
      (Response) =>{
        console.log(Response);
      }
    )
  }

  cambiarCantidadCoste(id_proveedor:any, id_articulo:any){
    if (id_proveedor.value != "nada") {
      this.servicioGestor.obtenerInfoDeArticuloSegunProveedor(id_articulo, id_proveedor.value).subscribe(
        (Response) => {
          this.formularioPedido.get("cantidad_por_lote")?.setValue(Response[0]);
          this.formularioPedido.get("coste_por_lote")?.setValue(Response[1]);
          this.formularioPedido2.get("cantidad_por_lote2")?.setValue(Response[0]);
          this.formularioPedido2.get("coste_por_lote2")?.setValue(Response[1]);
        }
      )
    } else {
          this.formularioPedido.get("cantidad_por_lote")?.setValue("");
          this.formularioPedido.get("coste_por_lote")?.setValue("");
          this.formularioPedido2.get("cantidad_por_lote2")?.setValue("");
          this.formularioPedido2.get("coste_por_lote2")?.setValue("");
    }
  }

  pasarDatoACarrito(){
    if ($("#proveedor option:selected").text() != "") {
      let objeto:ArticuloEscogido = {
        id_articulo: this.datos.id_articulo,
        nombre: this.datos.nombre,
        id_proveedor: this.formularioPedido.get("proveedor")?.value,
        nombre_categoria: this.datos.nombre_categoria,
        cantidad_por_lote: this.formularioPedido.get("cantidad_por_lote")?.value,
        nombre_proveedor: $("#proveedor option:selected").text(),
        coste_por_lote: this.formularioPedido.get("coste_por_lote")?.value,
        nLotes: this.formularioPedido.get("numeroLotes")?.value,
      }; 
      this.servicioGestor.anyadirArticulo(objeto);
    }
  }

  refrescarNLotes(){
    this.formularioPedido2.get("numeroLotes2")?.setValue(this.datos2?.nLotes);
  }

  modificarArticulo(){

    this.servicioGestor.obtenerInfoDeArticuloSegunProveedor(this.datos2.id_articulo, this.proveedorEscogido).subscribe(
      (Response) => {
        let datosCambiados4 = this.formularioPedido2.get("numeroLotes2")?.value
        let proveedor = this.proveedorEscogido;
        let datosCambiados2 = $("#proveedor2 option:selected").text();

        if (this.formularioPedido2.get("proveedor2")?.value != proveedor) {
          proveedor = this.formularioPedido2.get("proveedor2")?.value;
          this.proveedorEscogido = this.formularioPedido2.get("proveedor2")?.value;
        }

        if (datosCambiados4 == "" || datosCambiados4 == undefined) {
          datosCambiados4 = this.datos2.nLotes;
        }
        console.log(this.proveedorEscogido);


        this.servicioGestor.modificarArticulo(this.indiceSeleccionado, proveedor, datosCambiados2,Response[1] , datosCambiados4,Response[0] );
      }
    )
  }
}
