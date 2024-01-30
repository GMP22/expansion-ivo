import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Cita {
  sip: string;
  nombre: string;
  apellido: string;
  hora: string;
}

@Component({
  selector: 'tabla-citas-pendientes',
  templateUrl: './tabla-citas-pendientes.component.html',
  styleUrls: ['./tabla-citas-pendientes.component.css']
})
export class TablaCitasPendientesComponent {
  citas: Cita[] = [
    { sip: '1234', nombre: 'Cita', apellido: 'Pendiente', hora: '08:00' },
    { sip: '5678', nombre: 'Luis', apellido: 'Martínez', hora: '09:00' },
    { sip: '1235', nombre: 'Carlos', apellido: 'López', hora: '08:30' },
    { sip: '5679', nombre: 'María', apellido: 'Gómez', hora: '09:30' },
    { sip: '1253', nombre: 'Juan', apellido: 'Pérez', hora: '10:00' },
    { sip: '5687', nombre: 'Sofía', apellido: 'Ruiz', hora: '10:30' },
    { sip: '1234', nombre: 'Ana', apellido: 'García', hora: '08:00' },
    { sip: '5678', nombre: 'Luis', apellido: 'Martínez', hora: '09:00' },
    { sip: '1235', nombre: 'Carlos', apellido: 'López', hora: '08:30' },
    { sip: '5679', nombre: 'María', apellido: 'Gómez', hora: '09:30' },
    { sip: '1253', nombre: 'Juan', apellido: 'Pérez', hora: '10:00' },
    { sip: '5687', nombre: 'Sofía', apellido: 'Ruiz', hora: '10:30' }
  ];

  constructor(private router: Router) {}

  onRowClick(cita: Cita){
    this.router.navigate(['/medico/atender-paciente'], { queryParams: { sip: cita.sip, nombre: cita.nombre, apellido: cita.apellido, hora: cita.hora } });
  }

  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json"
      },
      pagingType: "numbers"
    }
  }
}
