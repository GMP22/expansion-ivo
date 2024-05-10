import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdministrativoServiceService } from '../administrativo-service.service';


@Component({
  selector: 'app-crear-citas',
  templateUrl: './crear-citas.component.html',
  styleUrls: ['./crear-citas.component.css'],
})
export class CrearCitasComponent implements OnInit {
  formularioCita: FormGroup;
  idPaciente: string = '';
  sipPaciente: string = '';
  idUsuarioAdministrativo: string = '';
  idUsuarioPaciente: string = '';
  nombrePaciente: string = '';
  fechaCita:string = '';
  medicos: any[] = [];
  servicios: any[] = [];
  idMedico: string = '';
  idServicio: number = 2;
  fecha:Date = new Date();
  mes?:number;
  existir:boolean = true;


  constructor(
    private route: ActivatedRoute,
    private administrativoService: AdministrativoServiceService,
    private formBuilder: FormBuilder
  ) {
    this.formularioCita = this.formBuilder.group({
      especialidad: ['', Validators.required],
      fechaCreacion: [
        new Date().toISOString().split('T')[0],
        Validators.required,
      ],
      nombreMedico: ['', Validators.required],
      horasDisponibles: ['', Validators.required],
      fecha: ['', Validators.required], // Agregar el control 'fecha' aquí
    });
  }

  confirmar: boolean = false;
  enviarDatos: boolean = false;
  isSubmitted: boolean = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.idPaciente = params['id_usuario_paciente'];
      this.obtenerDatosPaciente(this.idPaciente);
    });
    
    this.obtenerNombres(2);
    this.obtenerServicios();

    $("#fecha").attr('min', this.fecha.toISOString().split('T')[0]);
  }

  siguiente() {
    this.isSubmitted = true;

    if (this.formularioCita.valid) {
      if (this.confirmar) {
        this.crearCita();
      } else {
      $('input').prop('disabled', true);
      $('select').prop('disabled', true);

      $('#flecha').addClass('border-3');
      $('#flecha').addClass('barra-inferior');

      $('#paso2').addClass('border-3');
      $('#paso2').addClass('barra-inferior');
        this.confirmar = true;
        this.enviarDatos = true;
      
      }
    } else {
      this.formularioCita.markAllAsTouched();
    }
  }

  anterior() {
    if (this.confirmar) {
      $('input').prop('disabled', false);
      $('select').prop('disabled', false);

      $('#flecha').removeClass('border-3');
      $('#flecha').removeClass('barra-inferior');

      $('#paso2').removeClass('border-3');
      $('#paso2').removeClass('barra-inferior');

      this.confirmar = false;
      this.enviarDatos = false;
    }
  }

  obtenerDatosPaciente(idPaciente: string): void {
    this.administrativoService.obtenerPaciente(idPaciente).subscribe(
      (response) => {
        this.existir = false;
        this.nombrePaciente = response.usuario.nombre;
        this.idUsuarioAdministrativo = response.id_usuario_administrativo;
        this.idUsuarioPaciente = response.id_usuario_paciente;
        this.sipPaciente = response.sip;
        this.existir = true;
      },
      (error) => {
        console.error('Error al obtener los datos del paciente:', error);
      }
    );
  }

  obtenerNombres(id_cita:number): void {
    this.administrativoService.obtenerNombrePersonalClinico(id_cita).subscribe(
      (response) => {
        this.medicos = response;
      },
      (error) => {
        console.error('Error al obtener la lista de médicos:', error);
      }
    );
  }

  obtenerServicios(): void {
    this.administrativoService.obtenerServicios().subscribe(
      (response) => {
        if (
          response &&
          response.results &&
          Array.isArray(response.results)
        ) {
          this.servicios = response.results;
        } else {
          console.error(
            'La respuesta de la API no contiene la propiedad "results" o no es un array.'
          );
        }
      },
      (error) => {
        console.error('Error al obtener la lista de servicios:', error);
      }
    );
  }

  crearCita() {
    const especialidad = this.formularioCita.get('especialidad')?.value;
    const nombreMedico = this.formularioCita.get('nombreMedico')?.value;
    const horasDisponibles = this.formularioCita.get('horasDisponibles')?.value;
  
    if (this.formularioCita.valid) {
      
      if (this.idServicio == 1) {
        const crear = {
          id_usuario_paciente: this.idPaciente,
          hora: horasDisponibles,
          fecha: this.formularioCita.get('fecha')?.value, // Obtener el valor del campo 'fecha' del formulario
          sip: this.sipPaciente,
          id_servicio: this.idServicio,
          id_usuario_medico: this.idMedico,
          id_usuario_administrativo: this.idUsuarioAdministrativo,
        };

        this.administrativoService.crearCita(crear).subscribe(
          (response) => {
            console.log('Cita creada exitosamente:', response);
          },
          (error) => {
            console.error('Error al crear la cita:', error);
          }
        );

      } else if(this.idServicio == 2){

        const crear = {
          id_usuario_paciente: this.idPaciente,
          hora: horasDisponibles,
          fecha: this.formularioCita.get('fecha')?.value, // Obtener el valor del campo 'fecha' del formulario
          sip: this.sipPaciente,
          id_servicio: this.idServicio,
          id_usuario_radiologo: this.idMedico,
          id_usuario_administrativo: this.idUsuarioAdministrativo,
        };

        this.administrativoService.crearCita(crear).subscribe(
          (response) => {
            console.log('Cita creada exitosamente:', response);
          },
          (error) => {
            console.error('Error al crear la cita:', error);
          }
        );
      
      }

    } else {
      console.error(
        'El formulario no es válido. No se pueden obtener los valores.'
      );
    }
  }

  obtenerIdMedico(event: any) {
    const selectedValue = event.target.value;
    this.idMedico = selectedValue;
  }

  obtenerIdServicio(event: any) {
    const selectedValue = event.target.value;
    this.idServicio = selectedValue;

    if (this.idServicio == 1) {
      this.obtenerNombres(2);
    } else if(this.idServicio == 2){
      this.obtenerNombres(4);
    }
    
  }
}
