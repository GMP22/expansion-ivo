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

  get carrito(){
    return this.carritoArticulos;
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

  registrarPedido(idUsuario:any){
    return this.http.post<any>(`${this.urlBase}registrar-pedido-medico/${idUsuario}`, this.carritoArticulos);
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

  numerosPedido(idMedico:any){
    return this.http.get<any>(`${this.urlBase}cuadros-informativos-pedidos-medico/${idMedico}`);
  }

  numerosInventario(idMedico:any){
    return this.http.get<any>(`${this.urlBase}cuadros-informativos-inventario-medico/${idMedico}`);
  }

  inventarioMinimos(idMedico:any){
    return this.http.get<any>(`${this.urlBase}inventario-minimos-medico/${idMedico}`);
  }

  inventarioAutomaticos(idMedico:any){
    return this.http.get<any>(`${this.urlBase}inventario-automatico-medico/${idMedico}`);
  }

  limpiarCarrito(){
    for (let index = 0; index < this.carritoArticulos.length; index++) {
        this.carritoArticulos.pop();
    }
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

  obtenerArticulosFormulario(idMedico:any){
    return this.http.get<any>(`${this.urlBase}articulos-crear-pedido-medico/${idMedico}`);
  }

  inventario(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}inventario-medico/${idUsuario}`);
  }

  detalleArticulo(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulos-medico/${idUsuario}/${idArticulo}`);
  }

  obtenerNlotes(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}articulos-lotes-crear-pedido-medico/${idUsuario}/${idArticulo}`);
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

  obtenerArticulosMinimosFormulario(idMedico:any){
    return this.http.get<any>(`${this.urlBase}articulos-minimos-crear-pedido-medico/${idMedico}`);
}

  cambiarMinimos(idUsuario:any, idArticuloClinica:any, minimo:any){
    return this.http.post<any>(`${this.urlBase}cambiar-minimo-medico/${idUsuario}/${idArticuloClinica}`, minimo);
  }
  
  nuevoPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}nueva-funcion-automatica-medico`, contenido);
  }

  detallesPedido(idPedido:any){
    return this.http.get<any>(`${this.urlBase}detalles-pedido-medico/${idPedido}`);
  }

  obtenerArticulosPedido(idPedido:any){
    return this.http.get<any>(`${this.urlBase}articulos-pedido-medico/${idPedido}`);
  }

  obtenerArticuloEnCita(idMedico:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}articulo-usado-cita/${idMedico}/${idArticulo}`);
  }

  obtenerCitaPorId(idCita:any){
      return this.http.get<any>(`${this.urlBase}buscar-cita-id/${idCita}`);
  }

  stockAPedir(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-pedido-automatico/${idUsuario}/${idArticulo}`);
  }

  eliminarPedidoAutomatico(contenido:any){
    return this.http.post<any>(`${this.urlBase}eliminar-funcion-automatica-medico`, contenido);
  }

  registrarDiagnostico(diagnostico:any){
    return this.http.post<any>(`${this.urlBase}registrar-diagnostico`, diagnostico);
  }

  registrarArticulosEnCita(idCita:any, articulos:any){
    return this.http.post<any>(`${this.urlBase}registrar-articulos-en-cita/${idCita}`, articulos);
  }

  modificarArticulosEnCita(idCita:any, articulos:any){
    return this.http.post<any>(`${this.urlBase}modificar-articulos-en-cita/${idCita}`, articulos);
  }

  articulosUsadosEnCita(idCita:any){
    return this.http.get<any>(`${this.urlBase}inventario-medico-cita/${idCita}`);
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
