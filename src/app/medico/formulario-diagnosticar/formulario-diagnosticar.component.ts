import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { MedicoService } from '../servicio/medico.service';
import { ActivatedRoute } from '@angular/router';
import { InventarioArticulos } from 'src/app/interfaces/inventario-articulos';

@Component({
  selector: 'app-formulario-diagnosticar',
  templateUrl: './formulario-diagnosticar.component.html',
  styleUrls: ['./formulario-diagnosticar.component.css']
})
export class FormularioDiagnosticarComponent {
  faCoffee = faCoffee;
  faFloppyDisk = faFloppyDisk;
  faFileLines = faFileLines;
  faCircleXmark = faCircleXmark;
  articulosInventario:InventarioArticulos[] = [];  

  articulosSeleccionados:InventarioArticulos[] = [];

  fechaDeHoy:Date = new Date();
  formData!:FormGroup;
  servicio = inject(MedicoService);
  estado = '';
  sip = '';
  id_cita = '';
  textoModal = '';
  existir = false;
  errorInforme:boolean = false;
  errorTratamiento:boolean = false;
  dtOptions: DataTables.Settings = {}

  constructor(private route: ActivatedRoute){
    this.existir = false;
    this.route.queryParams.subscribe(params => {
      this.sip = params['sip']; 
      this.id_cita = params['id_cita'];
      this.estado = params['estado'];
    })
    if (this.estado == 'pendiente') {
      this.existir = true;
      this.formData = new FormGroup({
        informe: new FormControl('', Validators.required),
        tratamientos: new FormControl('', Validators.required),
      })

      this.textoModal = 'Diagnostico creado';
    } else {

      this.servicio.obtenerDiagnostico(this.id_cita).subscribe(
        (response) =>{
          this.existir = true;
          this.formData = new FormGroup({
            informe: new FormControl(response.informe, Validators.required),
            tratamientos: new FormControl(response.tratamiento, Validators.required),
          })
        },
        (error) => {
          console.log(error);
        }
      )

      this.textoModal = 'Diagnostico modificado';
    }
  }

  ngOnInit():void {
    this.dtOptions = {
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
        emptyTable: '',
      },
      pagingType: "numbers",
      info: false,
    }

    if (this.estado == "pendiente") {
      this.servicio.inventario(localStorage.getItem("id_usuario")).subscribe(
        (response) => {
          console.log(response);

          response.forEach((Element:any) => {

            let objeto:InventarioArticulos = {
              id_articulo_clinica: Element.id_articulo_clinica,
              nombre_articulo: Element.nombre_articulo,
              nombre_categoria: Element.nombre_categoria,
              numero_lotes: 0,
              estado: Element.numero_lotes,
              ultima_fecha_recibida: "",
            }

            this.articulosInventario.push(objeto);

          });
          this.existir = true;
        }
      )
    } else {
      this.servicio.articulosUsadosEnCita(this.id_cita).subscribe(
        (response) => {
          this.articulosInventario = response;
          console.log(response);

          this.articulosInventario.forEach(Element=>{
              if (Element.numero_lotes > 0) {
                this.articulosSeleccionados.push(Element);
              }
          })

          this.existir = true;
          console.log(this.articulosSeleccionados)
        }
      )
    }
  }

  activar(evento:any, id_articulo:any){
    if (evento.target.checked) {
      let x:string = $("#cantidad"+id_articulo).val() as string;
      let contenido :InventarioArticulos = {
        id_articulo_clinica: id_articulo,
        nombre_articulo: "",
        nombre_categoria: "",
        numero_lotes: parseInt(x),
        estado: "",
        ultima_fecha_recibida: "",
      }
      this.articulosSeleccionados.push(contenido);
      
      console.log(this.articulosSeleccionados);

      $("#cantidad"+id_articulo).prop("disabled", false);
    } else {
      let indice = 0;

      this.articulosSeleccionados.forEach(function hola(element, index)  {

        if (element.id_articulo_clinica == id_articulo) {
            indice = index;
        }
      });

      this.articulosSeleccionados.splice(indice, 1);

      console.log(this.articulosSeleccionados);

      $("#cantidad"+id_articulo).prop("disabled", true);
    }
  }

  cambiarValor(evento:any, id_articulo:any){
    let indice = 0;
      this.articulosSeleccionados.forEach(function hola(element, index)  {

        if (element.id_articulo_clinica == id_articulo) {
            indice = index;
        }
      });

      this.articulosSeleccionados[indice].numero_lotes = parseInt(evento.target.value);
  }

  guardarArticulos(){
    this.servicio.registrarArticulosEnCita(this.id_cita,this.articulosSeleccionados).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  modificarArticulos(){
    this.servicio.modificarArticulosEnCita(this.id_cita,this.articulosSeleccionados).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }

  onSubmit() {

    if (this.formData.invalid) {
    
      if(this.formData.get("informe")?.status == "INVALID"){
        this.errorInforme = true;
      } else {
        this.errorInforme = false;
      }
      
      if(this.formData.get("tratamientos")?.status == "INVALID"){
        this.errorTratamiento = true;
      } else {
        this.errorTratamiento = false;
      }
    
    } else {
      this.errorInforme = false;
      this.errorTratamiento = false;
      if (this.estado == "pendiente") {

        const diagnostico = {
          informe: this.formData.get('informe')?.value,
          tratamientos: this.formData.get('tratamientos')?.value,
          fecha_creacion: this.fechaDeHoy.getFullYear() + "-"  + (this.fechaDeHoy.getUTCMonth()+1) + "-" + this.fechaDeHoy.getDate(),
          id_medico: localStorage.getItem('id_usuario'),
          id_cita: this.id_cita,
          sip: this.sip,
        }
  
        console.log(this.formData.value);
  
        this.servicio.registrarDiagnostico(diagnostico).subscribe(
          (response) => {
            console.log(response);
            this.guardarArticulos();
          },
          (error) => {
            console.log(error);
          }
        );

      } else if(this.estado == "realizada"){
        
      const diagnosticoModificado = {
          informe: this.formData.get('informe')?.value,
          tratamiento: this.formData.get('tratamientos')?.value,
        }
  
        console.log(this.formData.value);
  
        this.servicio.modificarDiagnostico(diagnosticoModificado, this.id_cita).subscribe(
          (response) => {
            console.log(response);
            this.modificarArticulos();
          },
          (error) => {
            console.log(error);
          }
        );

      }
    }
  }
}
