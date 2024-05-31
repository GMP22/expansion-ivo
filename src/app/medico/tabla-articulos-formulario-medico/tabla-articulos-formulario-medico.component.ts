import { Component,Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { Router } from '@angular/router';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-tabla-articulos-formulario-medico',
  templateUrl: './tabla-articulos-formulario-medico.component.html',
  styleUrls: ['./tabla-articulos-formulario-medico.component.css']
})
export class TablaArticulosFormularioMedicoComponent {  
  faTriangleExclamation = faTriangleExclamation;
  articulos!:ArticuloEscogido[];
  existir:boolean = false;
  idGestor:number = Number(localStorage.getItem("id_usuario"));
  servicioMedico = inject(MedicoService);
  @ViewChild('botonModalPendiente') botonModalPendiente!: ElementRef;
  @Output() articuloNuevo = new EventEmitter<ArticuloEscogido>();
  constructor(private router: Router) {}
  faPlus = faPlus;
  dtOptions: DataTables.Settings = {}

  ngOnInit(): void {

    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      dom: 'rt',
      info: false,
      scrollCollapse: true,
      scrollY: '400px',
    }

    this.servicioMedico.obtenerArticulosFormulario(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
        console.log(response);
        this.existir = true;
        this.articulos = response;
      }
    )
  }

  cambiarListado(evento:any){
	console.log("hola");
  this.existir = false;
    if(evento.target.checked){
      this.servicioMedico.obtenerArticulosMinimosFormulario(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
          console.log(response);
          this.existir = true;
          this.articulos = response;
        }
      )
      
    } else {
    
      this.servicioMedico.obtenerArticulosFormulario(localStorage.getItem("id_usuario")).subscribe(
        (response) => {
          console.log(response);
          this.existir = true;
          this.articulos = response;
        }
      )
    
    }
  }

  mostrarModalDeArticulo(entrada:ArticuloEscogido){
        console.log(entrada);
        this.articuloNuevo.emit(entrada);
        this.existir = true;
        this.botonModalPendiente.nativeElement.click();
  }
}
