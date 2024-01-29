import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

interface Paciente {
  fecha: number;
  medico: string;
  servicio: number;
  hora: string;
}


@Component({
  selector: 'app-tabla-citas-paciente-realizadas',
  templateUrl: './tabla-citas-paciente-realizadas.component.html',
  styleUrls: ['./tabla-citas-paciente-realizadas.component.css']
})
export class TablaCitasPacienteRealizadasComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  
  citaPacientes: Paciente[] = [
    { fecha: 20, medico: 'Juan', servicio: 25, hora: '9:00' },
    { fecha: 20, medico: 'Pere', servicio: 25, hora: '9:00' },
    { fecha: 20, medico: 'Pepe', servicio: 25, hora: '9:00' },
    // Puedes agregar más objetos según tus necesidades
  ];
  
  constructor() { }
  
  ngOnInit(): void {
    this.dtOptions = {
      searching: false,
      pagingType: 'full_numbers',
    };
  
    this.dtTrigger.next(null);
  }
}

