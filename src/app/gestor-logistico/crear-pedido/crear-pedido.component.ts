import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DetallesArticulo } from 'src/app/interfaces/detalles-articulo';
import { ServicioService } from '../servicio/servicio.service';
import { inject } from '@angular/core';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent {
    datos!:DetallesArticulo;
    formularioPedido: FormGroup;
    servicioGestor = inject(ServicioService);
    

  constructor(private formBuilder: FormBuilder){
    this.formularioPedido = new FormGroup({
      categoria: new FormControl(),
      proveedor: new FormControl(),
      numeroLotes: new FormControl(),
      coste_por_lote: new FormControl(),
      cantidad_por_lote: new FormControl(),
    });
  }

  /*
  const form = new FormGroup({
  first: new FormControl(),
  last: new FormControl()
  form.setValue({first: 'Nancy', last: 'Drew'});
});
  */

  cambiarCantidadCoste(id_proveedor:any, id_articulo:any){
    if (id_proveedor.value != "nada") {
      this.servicioGestor.obtenerInfoDeArticuloSegunProveedor(id_articulo, id_proveedor.value).subscribe(
        (Response) => {
          this.formularioPedido.get("cantidad_por_lote")?.setValue(Response[0]);
          this.formularioPedido.get("coste_por_lote")?.setValue(Response[1]);
        }
      )
    } else {
          this.formularioPedido.get("cantidad_por_lote")?.setValue("");
          this.formularioPedido.get("coste_por_lote")?.setValue("");
    }
  }

  pasarDatoACarrito(id_articulo:any, nombre_articulo:any){
    let articulo:ArticuloEscogido = {
      id_articulo: id_articulo,
      nombre: nombre_articulo,
      nombre_proveedor: $("#proveedor option:selected").text(),
      id_proveedor: this.formularioPedido.get("proveedor")?.value,
      coste_por_lote: this.formularioPedido.get("coste_por_lote")?.value,
      nLotes: this.formularioPedido.get("numeroLotes")?.value,
    }
    this.servicioGestor.anyadirArticulo(articulo);
  }
}
