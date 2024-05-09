import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  urlBase = '';
  constructor(private http: HttpClient) { 
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
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
}
