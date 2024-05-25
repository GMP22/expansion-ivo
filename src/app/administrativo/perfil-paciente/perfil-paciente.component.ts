import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdministrativoServiceService } from '../administrativo-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {
    poderEditar:boolean = false;
    idPaciente: string = '';
    datosOriginales: any = {}; // Guarda los datos originales del paciente
    // Variables para almacenar los datos del paciente
    dni:String = '';
    nombre:String = '';
    apellido1:String = '';
    apellido2:String = '';
    sexo:String = '';
    fecha:String = '';
    correo:String = '';
    telefono:String = '';
    codigoPostal:String = '';
    direccion:String = '';
    recargar = true;

    constructor(private route: ActivatedRoute, private http: HttpClient, private administrativoService: AdministrativoServiceService) {}

    ngOnInit(): void {
      //Obtener el ID del paciente
      this.route.params.subscribe((params) => {
        this.idPaciente = params['id_paciente'];
        //Llamar a la API para obtener los detalles del paciente
        this.obtenerDatosPaciente(this.idPaciente);
      });
    }

    // Si esto esta en falso, quiere decir que se mostrarán los datos pero NO pondran ser editados.

    editar(entrada:boolean) {
      if (entrada == false) {
        this.poderEditar = true;
        // Guarda una copia de seguridad de los datos originales del paciente
        this.datosOriginales = { 
          dni: this.dni,
          nombre: this.nombre,
          apellido1: this.apellido1,
          apellido2: this.apellido2,
          sexo: this.sexo,
          fecha: this.fecha,
          correo: this.correo,
          telefono: this.telefono,
          codigoPostal: this.codigoPostal,
          direccion: this.direccion
        };
      } else {
        this.poderEditar = false;
        // Restaura los datos originales del paciente
        this.dni = this.datosOriginales.dni;
        this.nombre = this.datosOriginales.nombre;
        this.apellido1 = this.datosOriginales.apellido1;
        this.apellido2 = this.datosOriginales.apellido2;
        this.sexo = this.datosOriginales.sexo;
        this.fecha = this.datosOriginales.fecha;
        this.correo = this.datosOriginales.correo;
        this.telefono = this.datosOriginales.telefono;
        this.codigoPostal = this.datosOriginales.codigoPostal;
        this.direccion = this.datosOriginales.direccion;
      }
    }

    obtenerDatosPaciente(idPaciente: String): void {
      this.http
        .get<any>(`http://localhost/api/v1/pacientes/${idPaciente}`)
        .subscribe(
          (response) => {
            this.idPaciente = response.id_usuario_paciente;
            this.dni = response.usuario.dni;
            this.nombre = response.usuario.nombre;
            this.apellido1 = response.usuario.apellido1;
            this.apellido2 = response.usuario.apellido2;
            this.sexo = response.usuario.Sexo;
            this.fecha = response.usuario.fecha_nacimiento;
            this.codigoPostal = response.usuario.codigo_postal;
            this.direccion = response.usuario.direccion;
            this.telefono = response.usuario.telefono;
            this.correo = response.usuario.correo;
          },
          (error) => {
            console.error('Error al obtener el nombre del paciente:', error);
          }
        );
    }

    guardarCambios(): void {
      const datosActualizados = {
        dni: this.dni,
        nombre: this.nombre,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
        Sexo: this.sexo,
        fecha_nacimiento: this.fecha,
        codigoPostal: this.codigoPostal,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo
      };
      console.log("formulario "+ this.sexo);

      console.log("realidad"+datosActualizados.Sexo);

      this.recargarFormulario();
      this.administrativoService.actualizarDatosPaciente(this.idPaciente, datosActualizados)
        .subscribe(
          response => {
            console.log('Datos del paciente actualizados con éxito:', response);
            this.obtenerDatosPaciente(this.idPaciente);
            this.editar(false);
            this.recargarFormulario();
          },
          error => {
            console.error('Error al actualizar los datos del paciente:', error);
          }
        );
    }

    recargarFormulario():void{
      if (this.recargar == true) {
        this.recargar = false;
      } else {
        this.recargar = true;
      }
    }

}
