import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  urlBase = '';
  private carritoArticulos:ArticuloEscogido[] = [];
  private _articulos:BehaviorSubject<ArticuloEscogido[]>;
  constructor(private http: HttpClient) { 
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
    this._articulos = new BehaviorSubject<ArticuloEscogido[]>([]);
  }

  get articulos(){
    return this._articulos.asObservable();
  }

  anyadirArticulo(articulo:any){
    console.log(articulo);
    let resultado = 0;
    this.carritoArticulos.forEach(element => {
        if (element.id_articulo == articulo.id_articulo) {
            resultado++;
        }
    });
    console.log(resultado);
    if (resultado==0) {
      this.carritoArticulos.push(articulo);
      this._articulos.next(this.carritoArticulos);
    } 
  }

  modificarArticulo(indice:number, nLotes:any){
    this.carritoArticulos[indice].nLotes = nLotes;
    this._articulos.next(this.carritoArticulos);
  }

  sumarArticulo(indice:number, cantidad_a_sumar:number){
    this.carritoArticulos[indice].nLotes += cantidad_a_sumar;
    this._articulos.next(this.carritoArticulos);
  }

  obtenerArticuloSegunId(indice:number){
    return this.carritoArticulos[indice];
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

  borrarArticulo(indice:number){
    this.carritoArticulos.splice(indice,1);
    this._articulos.next(this.carritoArticulos);
  }

  obtenerCitasPendientesSegunIdMedicoYFecha(idMedico:number, fecha:string){
    return this.http.get<any>(`${this.urlBase}citas-pendiente-medico/${fecha}/${idMedico}`);
  }

  obtenerCitasRealizadasSegunIdMedicoYFecha(idMedico:number, fecha:string){
    return this.http.get<any>(`${this.urlBase}citas-realizada-medico/${fecha}/${idMedico}`);
  }

  obtenerArticulosFormulario(){
    return this.http.get<any>(`${this.urlBase}articulos-crear-pedido-medico`);
  }

  inventario(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}inventario-medico/${idUsuario}`);
  }

  detalleArticulo(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulos-medico/${idUsuario}/${idArticulo}`);
  }

  obtenerPedidosPendientes(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}pedidos-pendientes-medico/${idUsuario}`);
  }

  obtenerPedidosRecibidos(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}pedidos-recibidos-medico/${idUsuario}`);
  }

  pedidosConArticuloEspecifico(idUsuario:any, idArticuloClinica:any){
    return this.http.get<any>(`${this.urlBase}pedidos-articulo-especifico-medico/${idUsuario}/${idArticuloClinica}`);
  }

  cambiarMinimos(idUsuario:any, idArticuloClinica:any, minimo:any){
    return this.http.post<any>(`${this.urlBase}cambiar-minimo-medico/${idUsuario}/${idArticuloClinica}`, minimo);
  }
  
  nuevoPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}nueva-funcion-automatica-medico`, contenido);
  }

  eliminarPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}eliminar-funcion-automatica-medico`, contenido);
  }

  registrarDiagnostico(diagnostico:any){
    return this.http.post<any>(`${this.urlBase}registrar-diagnostico`, diagnostico);
  }

  obtenerDiagnostico(idCita:any){
    return this.http.get<any>(`${this.urlBase}obtener-diagnostico/${idCita}`);
  }

  modificarDiagnostico(diagnostico:any, idCita:string){
    return this.http.post<any>(`${this.urlBase}modificar-diagnostico/${idCita}`, diagnostico);
  }
  
  subirVolante(volante:string, idCita:string){
    return this.http.post<any>(`${this.urlBase}modificar-volante/${idCita}`, volante);
  }

  mostrarVolante(idCita:string){
    return this.http.get<any>(`${this.urlBase}mostrar-volante/${idCita}`);
  }

  getAllPruebas(id_paciente: number){
    return this.http.get(`${this.urlBase}pruebas-paciente/${id_paciente}`);
  }
  getPrueba(id: number){
    return this.http.get(`${this.urlBase}informacion-prueba/${id}`);
  }
}
