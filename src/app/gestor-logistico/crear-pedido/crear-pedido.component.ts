import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetallesArticulo } from 'src/app/interfaces/detalles-articulo';
import { ServicioService } from '../servicio/servicio.service';
import { inject } from '@angular/core';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { DetallesArticuloProveedores } from 'src/app/interfaces/detalles-articulo-proveedores';
@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent {

    datos!:DetallesArticulo;
    datos2!:ArticuloEscogido;
    indiceSeleccionado!:number;
    proveedores:DetallesArticuloProveedores[]=[];
    formularioPedido: FormGroup;
    formularioPedido2: FormGroup;
    servicioGestor = inject(ServicioService);
    @ViewChild('seguroEnviar') seguroEnviar!: ElementRef;
    ubicacion = 0;

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

  siguiente(){

    if (this.ubicacion==1) {
      this.abrirModal();
    } else {
      this.ubicacion++;
      $('#flecha').addClass('border-3');
      $('#flecha').addClass('barra-inferior');

      $('#paso2').addClass('border-3');
      $('#paso2').addClass('barra-inferior');
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

  pasarDatoACarrito(id_articulo:any, nombre_articulo:any){
    let categoria=String($("#categoria").val());
    if ($("#proveedor option:selected").text() != "") {
      let articulo:ArticuloEscogido = {
        id_articulo: id_articulo,
        nombre: nombre_articulo,
        nombre_categoria: categoria,
        nombre_proveedor: $("#proveedor option:selected").text(),
        id_proveedor: this.formularioPedido.get("proveedor")?.value,
        coste_por_lote: this.formularioPedido.get("coste_por_lote")?.value,
        nLotes: this.formularioPedido.get("numeroLotes")?.value,
      }
      this.servicioGestor.anyadirArticulo(articulo);
    }
  }

  refrescarNLotes(){
    this.formularioPedido2.get("numeroLotes2")?.setValue(this.datos2?.nLotes);
  }

  modificarArticulo(){
    if ($("#proveedor2 option:selected").text() != "" && this.formularioPedido2.get("numeroLotes2")?.value != null) {
        let datosCambiados1 = this.formularioPedido2.get("proveedor2")?.value
        let datosCambiados2 = $("#proveedor2 option:selected").text()
        let datosCambiados3 = this.formularioPedido2.get("coste_por_lote2")?.value
        let datosCambiados4 = this.formularioPedido2.get("numeroLotes2")?.value
      console.log(datosCambiados4)
      this.servicioGestor.modificarArticulo(this.indiceSeleccionado, datosCambiados1, datosCambiados2, datosCambiados3, datosCambiados4);
    }
  }
}
