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
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
    this._articulos = new BehaviorSubject<ArticuloEscogido[]>([]);
  }

  get articulos(){
    return this._articulos.asObservable();
  }

  anyadirArticulo(articulo:ArticuloEscogido){
    this.carritoArticulos.push(articulo);
    this._articulos.next(this.carritoArticulos);
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
}
