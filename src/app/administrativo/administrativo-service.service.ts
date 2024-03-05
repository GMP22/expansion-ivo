import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoServiceService {
  // Definir propiedades para almacenar médicos y servicios
  private medicos: any[] = [];
  private servicios: any[] = [];
  private urlBase = '';


  constructor(private http: HttpClient) {
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
  }

  darAltaPaciente(formulario:any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}alta-paciente`, formulario);
  }

  enlazarAdministrativoConPacienteRecientementeCreado(paciente:any){
    return this.http.post<any>(`${this.urlBase}registrar-paciente`, paciente);
  }

  obtenerPaciente(idPaciente: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}pacientes/${idPaciente}`);
  }

  obtenerCitasGenerales(){
    return this.http.get<any>(`${this.urlBase}citas-generales`);
  }

  obtenerCitas(idPaciente: string, estado: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}citas?id_usuario_paciente=${idPaciente}&estado=${estado}`);
  }

  eliminarCita(idCita: string): Observable<any> {
    return this.http.delete(`${this.urlBase}citas/${idCita}`);
  }

  obtenerNombrePersonalClinico(id_rol:number): Observable<any> {
    return this.http.get<any>(`${this.urlBase}obtener-personal/${id_rol}`);
  }

  obtenerServicios(): Observable<any> {
    return this.http.get<any>(`${this.urlBase}servicios`);
  }

  crearCita(datosCita: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}crear-citas`, datosCita);
  }

  buscarPaciente(id_admin:string): Observable<any> {
    return  this.http.get<any>(`${this.urlBase}pacientes?id_usuario_administrativo=${id_admin}`);
  }

  actualizarDatosPaciente(idPaciente: string, datosActualizados: any): Observable<any> {
    return this.http.put<any>(`${this.urlBase}usuarios/${idPaciente}`, datosActualizados);
  }

  modificarCita(datosCita: any, citaId:string): Observable<any> {
    return this.http.put<any>(`${this.urlBase}citas/${citaId}`, datosCita);
  }

  obtenerDetallesCita(idPaciente: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}citas?id_usuario_paciente=${idPaciente}`);
  }

  obtenerNombreMedico(idMedico: string): Observable<string> {
    return this.http.get<any>(`${this.urlBase}medicos/${idMedico}`);
  }
}
