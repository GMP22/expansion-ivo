import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private carritoArticulos:ArticuloEscogido[] = [];
  private _articulos:BehaviorSubject<ArticuloEscogido[]>;
  urlBase = '';
  constructor(private http: HttpClient) { 
    this.urlBase = 'http://13.48.193.151/api/v1/';
    //this.urlBase = 'http://localhost/api/v1/';
    this._articulos = new BehaviorSubject<ArticuloEscogido[]>([]);
  }

  get articulos(){
    return this._articulos.asObservable();
  }
  get carrito(){
    return this.carritoArticulos;
  }
  anyadirArticulo(articulo:ArticuloEscogido){

    let resultado = this.carritoArticulos.filter(rdo => articulo.id_articulo == rdo.id_articulo && articulo.id_proveedor == rdo.id_proveedor);
    
    console.log(resultado);
    if (resultado.length == 0) {
      this.carritoArticulos.push(articulo);
      this._articulos.next(this.carritoArticulos);
    } 
  }

  stockAPedir(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-pedido-automatico-gestor/${idUsuario}/${idArticulo}`);
  }

  modificarArticulo(indice:number, id_proveedor:any, nombre_proveedor:string, coste_por_lote:number, nLotes:any, cantidad_por_lote:any){
        this.carritoArticulos[indice].id_proveedor = id_proveedor;
        this.carritoArticulos[indice].nombre_proveedor = nombre_proveedor;
        this.carritoArticulos[indice].coste_por_lote = coste_por_lote;
        this.carritoArticulos[indice].nLotes = nLotes;
        this.carritoArticulos[indice].cantidad_por_lote = cantidad_por_lote;
        this._articulos.next(this.carritoArticulos);
  }

  sumarArticulo(indice:number, cantidad_a_sumar:number){
    this.carritoArticulos[indice].nLotes += cantidad_a_sumar;
    this._articulos.next(this.carritoArticulos);
  }

  restarArticulo(indice:number, cantidad_a_restar:number){
    this.carritoArticulos[indice].nLotes -= cantidad_a_restar;

    if (this.carritoArticulos[indice].nLotes == 0) {
      this.carritoArticulos.splice(indice,1);
      this._articulos.next(this.carritoArticulos);
    } else {
      this._articulos.next(this.carritoArticulos);
    }
    
  }

  obtenerNlotes( idArticulo:any){
    return this.http.get<any>(`${this.urlBase}articulos-lotes-crear-pedido-gestor/${idArticulo}`);
  }

  totalPedido(){
    let total = 0;
    for (let index = 0; index < this.carritoArticulos.length; index++) {
        total += this.carritoArticulos[index].coste_por_lote * this.carritoArticulos[index].nLotes;
    }
    return total;
  }

  registrarPedido(idUsuario:any){
    return this.http.post<any>(`${this.urlBase}registrar-pedido-gestor/${idUsuario}`, this.carritoArticulos);
  }

  recibirPedido(idPedido:any){
    return this.http.get<any>(`${this.urlBase}recibir-pedido-gestor/${idPedido}`);
  }
    
  borrarArticulo(indice:number){
    this.carritoArticulos.splice(indice,1);
    this._articulos.next(this.carritoArticulos);
  }

  obtenerArticuloSegunId(indice:number){
    return this.carritoArticulos[indice];
  }

  obtenerSolicitudesEntrantes(idUsuario:number){
    return this.http.get<any>(`${this.urlBase}solicitudes-entrantes-gestor/${idUsuario}`);
  }

  obtenerArticulosMinimosFormulario(){
    return this.http.get<any>(`${this.urlBase}articulos-minimos-crear-pedido-gestor`);
}

  numerosPedido(){
    return this.http.get<any>(`${this.urlBase}cuadros-informativos-pedidos-gestor`);
  }

  numerosInventario(){
    return this.http.get<any>(`${this.urlBase}cuadros-informativos-inventario-gestor`);
  }

  inventarioMinimos(){
    return this.http.get<any>(`${this.urlBase}inventario-minimos-gestor`);
  }

  inventarioAutomaticos(){
    return this.http.get<any>(`${this.urlBase}inventario-automatico-gestor`);
  }

  obtenerSolicitudesArticuloEspecifico(idSolicitud:number){
    return this.http.get<any>(`${this.urlBase}solicitud-articulo-especifico/${idSolicitud}`);
  }

  obtenerSolicitudesHistorial(idUsuario:number){
    return this.http.get<any>(`${this.urlBase}solicitudes-aceptados-gestor/${idUsuario}`);
  }

  obtenerDetallesSolicitud(idSolicitud:number){
    return this.http.get<any>(`${this.urlBase}detalles-solicitudes-gestor/${idSolicitud}`);
  }

  obtenerArticulosSolicitud(idSolicitud:number){
    return this.http.get<any>(`${this.urlBase}articulos-solicitudes-gestor/${idSolicitud}`);
  }

  articulosMinimosSolicitud(idSolicitud:number){
    return this.http.get<any>(`${this.urlBase}articulos-minimos-solicitud-gestor/${idSolicitud}`);
  }

  aceptarSolicitudEntrante(idUsuario:any,idSolicitud:number, contenido:any){
    return this.http.post<any>(`${this.urlBase}aceptar-solicitud-gestor/${idUsuario}/${idSolicitud}`, contenido);
  }

  obtenerProveedoresSegunArticulo(idArticulo:any){
    return this.http.get<any>(`${this.urlBase}articulo-segun-proveedor/${idArticulo}`);
  }

  obtenerPedidosPendientes(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}pedidos-pendientes-gestor/${idUsuario}`);
  }

  obtenerPedidosRecibidos(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}pedidos-recibidos-gestor/${idUsuario}`);
  }

  obtenerArticulosFormulario(){
    return this.http.get<any>(`${this.urlBase}articulos-crear-pedido`);
  }

  obtenerDetallesArticulosFormulario(idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulo-crear-pedido/${idArticulo}`);
  }

  obtenerInfoDeArticuloSegunProveedor(idArticulo:any, idProveedor:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulo-segun-proveedor/${idArticulo}/${idProveedor}`);
  }

  obtenerDetallesPedido(idPedido:any){
    return this.http.get<any>(`${this.urlBase}detalles-pedido-gestor/${idPedido}`);
  }

  inventario(){
    return this.http.get<any>(`${this.urlBase}inventario-gestor`);
  }

  detalleArticulo(idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulos-gestor/${idArticulo}`);
  }

  pedidosConArticuloEspecifico(idArticuloClinica:any){
    return this.http.get<any>(`${this.urlBase}pedidos-articulo-especifico-gestor/${idArticuloClinica}`);
  }

  detallesPedidoEspecifico(idPedido:any){
    return this.http.get<any>(`${this.urlBase}detalles-pedido-especifico-gestor/${idPedido}`);
  }

  cambiarMinimos(idArticuloClinica:any, minimo:any){
    return this.http.post<any>(`${this.urlBase}cambiar-minimo-gestor/${idArticuloClinica}`, minimo);
  }
  
  nuevoPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}nueva-funcion-automatica`, contenido);
  }

  eliminarPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}eliminar-funcion-automatica`, contenido);
  }

  proveedores(){
    return this.http.get<any>(`${this.urlBase}proveedores`);
  }

  proveedoresNumeros(){
    return this.http.get<any>(`${this.urlBase}proveedores-numeros`);
  }

  proveedoresModal(){
    return this.http.get<any>(`${this.urlBase}proveedores-modal`);
  }

  proveedoresRegistrar(contenido:any){
    return this.http.post<any>(`${this.urlBase}registrar-proveedor`, contenido);
  }

  modificarProveedor(contenido:any, idProveedor:any){
    return this.http.post<any>(`${this.urlBase}modificar-proveedor/${idProveedor}`, contenido);
  }

  obtenerProveedorSegunId(idProveedor:any){
    return this.http.get<any>(`${this.urlBase}proveedor-especifico/${idProveedor}`);
  }

  obtenerProveedorPedidosPendientes(idProveedor:any){
    return this.http.get<any>(`${this.urlBase}proveedores-pedidos-pendientes/${idProveedor}`);
  }

  obtenerProveedorPedidosRecibidos(idProveedor:any){
    return this.http.get<any>(`${this.urlBase}proveedores-pedidos-recibidos/${idProveedor}`);
  }
  
}
