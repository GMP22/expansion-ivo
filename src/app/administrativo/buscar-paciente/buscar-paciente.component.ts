import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

interface ApiResponse {
  pacientes: any[]; // Puedes definir una interfaz más específica para los pacientes si lo deseas
}

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  resultados: any[] = [];

  dni: string = '';
  nombre: string = '';
  sip: string = '';
  apellido: string = '';
  buscando: boolean = false;
  existir: boolean = true;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'numbers',
      search: false,
      dom: 'rtip',
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      info: false,
    };
  }


  id_admin = localStorage.getItem('id_usuario');

  buscarPaciente(): void {
    this.existir = false;
    this.buscando = true;
    this.http.get<ApiResponse>(`http://localhost/api/v1/pacientes`).subscribe(
      response => {
        const pacientes = response.pacientes;
        if (Array.isArray(pacientes)) {
          // Aplicar filtros según los valores de los campos de búsqueda
          this.resultados = pacientes.filter(paciente => {
            const usuario = paciente.usuario;
            
            return (
              paciente.sip.includes(this.sip) &&
              usuario.dni.includes(this.dni) &&
              usuario.nombre.includes(this.nombre) &&
              usuario.apellido1.includes(this.apellido)
            );
          }).map(paciente => {
            const usuario = paciente.usuario;
            return {
              id_usuario_paciente: paciente.id_usuario_paciente, // Añadir el ID del paciente a los resultados
              nombre_usuario: usuario.nombre,
              apellido_usuario: usuario.apellido1,
              dni_usuario: usuario.dni,
              sip_usuario: paciente.sip,
              
            };
          });
          this.existir = true;
          this.dtTrigger.next(null);
        }
      },
      error => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }



  navegarAPaciente(idPaciente: string): void {
    const url = `/app/administrativo/paciente/${idPaciente}`;

    this.router.navigateByUrl(url);

    console.log(`Click sobre ${idPaciente}`);
    console.log(url);
}






}
