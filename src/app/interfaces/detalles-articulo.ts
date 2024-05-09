import { ArticuloFormulario } from "./articulo-formulario";
import { DetallesArticuloProveedores } from "./detalles-articulo-proveedores";

export interface DetallesArticulo {
    articulo: ArticuloFormulario,
    categoria: string,
    proveedores: Array<DetallesArticuloProveedores>,
}
