import { Component } from '@angular/core';
import { ArticuloFormulario } from 'src/app/interfaces/articulo-formulario';
import { DetallesArticulo } from 'src/app/interfaces/detalles-articulo';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent {
    datos!:DetallesArticulo;
}
