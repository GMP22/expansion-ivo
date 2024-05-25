import { Component, ElementRef, ViewChild } from '@angular/core';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MedicoService } from '../servicio/medico.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-crear-pedido-medico',
  templateUrl: './crear-pedido-medico.component.html',
  styleUrls: ['./crear-pedido-medico.component.css']
})
export class CrearPedidoMedicoComponent {
  datos!:ArticuloEscogido;
  datos2!:ArticuloEscogido;
  ubicacion = 0;
  indiceSeleccionado!:number;
  formularioPedido!: FormGroup;
  formularioPedido2!: FormGroup;
  servicioMedico = inject(MedicoService);
  @ViewChild('seguroEnviar') seguroEnviar!: ElementRef;

  ngOnInit(){
    this.formularioPedido = new FormGroup({
      categoria: new FormControl(),
      numeroLotes: new FormControl(),
    });
    this.formularioPedido2 = new FormGroup({
      categoria2: new FormControl(),
      numeroLotes2: new FormControl(),
    });
  }

  siguiente(){
    if (this.ubicacion==1) {
      this.abrirModal();
    } else {
      this.ubicacion++;
      $('#flecha').addClass('border-3');
      $('#flecha').addClass('barra-inferior');

      $('#paso2').addClass('border-3');
      $('#paso2').addClass('barra-inferior');
    }
  }

  anterior(){
    this.ubicacion--;
    $('#flecha').removeClass('border-3');
    $('#flecha').removeClass('barra-inferior');

    $('#paso2').removeClass('border-3');
    $('#paso2').removeClass('barra-inferior');
  }

  pasarDatoACarrito(){
      console.log(this.datos);
      this.datos.nLotes = this.formularioPedido.get("numeroLotes")?.value;
      this.servicioMedico.anyadirArticulo(this.datos);
  }

  refrescarNLotes(){
    this.formularioPedido2.get("numeroLotes2")?.setValue(this.datos2?.nLotes);
  }

  modificarArticulo(){
      if (this.datos2?.nLotes != $("#numeroLotes2").val()) {
        this.servicioMedico.modificarArticulo(this.indiceSeleccionado, $("#numeroLotes2").val());
      }
  }

  abrirModal(){
    this.seguroEnviar.nativeElement.click();
  }

  enviarDatos(){
    this.servicioMedico.registrarPedido(localStorage.getItem('id_usuario')).subscribe(
      (Response) =>{
        console.log(Response);
      }
    )
  }
}
