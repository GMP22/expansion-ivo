import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  urlBase = '';
  constructor(private http: HttpClient) { 
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
  }

  obtenerCitasPendientesSegunIdMedicoYFecha(idMedico:number, fecha:string){
    return this.http.get<any>(`${this.urlBase}citas-pendiente-medico/${fecha}/${idMedico}`);
  }

  obtenerCitasRealizadasSegunIdMedicoYFecha(idMedico:number, fecha:string){
    return this.http.get<any>(`${this.urlBase}citas-realizada-medico/${fecha}/${idMedico}`);
  }

  inventario(idUsuario:any){
    return this.http.get<any>(`${this.urlBase}inventario-medico/${idUsuario}`);
  }

  detalleArticulo(idUsuario:any, idArticulo:any){
    return this.http.get<any>(`${this.urlBase}detalles-articulos-medico/${idUsuario}/${idArticulo}`);
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
