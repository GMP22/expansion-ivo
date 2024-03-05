import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';

import { Observable} from 'rxjs';

export interface CitaResponse{
  "id_cita": number,
  "sip": string,
  "hora": string,
  "id_paciente": number,
  "nombre": string,
  "apellidos": string
}

@Injectable({
  providedIn: 'root'
})
export class RadiologoService {
urlBase = '';
  constructor(private http: HttpClient) { 
    //this.urlBase = 'http://ivo-back.cloud/api/v1/';
    this.urlBase = 'http://localhost/api/v1/';
  }

  getCitasPendientes(fecha: string, id: number): Observable<any>{
    return this.http.get(`${this.urlBase}citas-pendiente-radiologo/${fecha}/${id}`);
  }
  getCitasRealizadas(fecha: string, id: number): Observable<any>{
    return this.http.get(`${this.urlBase}citas-realizada-radiologo/${fecha}/${id}`);
  }
  
  postPruebaRadiologa(formData: FormData){
    return this.http.post(`${this.urlBase}crear-prueba`, formData);
  }
  getPrueba(id: number){
    return this.http.get(`${this.urlBase}prueba/${id}`);
  }
  actualizarPrueba(form: FormData,id: number){
    return this.http.post(`${this.urlBase}actualizar-prueba/${id}` , form);
  }
  eliminarImagen(id: number){
    return this.http.delete(`${this.urlBase}imagen/${id}`);
  }

  
  
}
