import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio/servicio.service';
@Component({
  selector: 'app-crear-proveedores',
  templateUrl: './crear-proveedores.component.html',
  styleUrls: ['./crear-proveedores.component.css']
})
export class CrearProveedoresComponent {
  ubicacion = 0;
  formularioProveedor!:FormGroup
  @ViewChild('seguroEnviar') seguroEnviar!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private gestorService: ServicioService,
    private formBuilder: FormBuilder
  ) {
    this.formularioProveedor = formBuilder.group({
        nif: ['', [Validators.required]],
        nombre: ['', [Validators.required]],
        telefono: ['', [Validators.required, Validators.minLength(9)]],
        email: ['', [Validators.required, Validators.email]],
        codigoPostal: ['', [Validators.required, Validators.min(10000), Validators.max(99999)]],
        direccion: ['', [Validators.required]],
        estado: ['', [Validators.required]],
    })
  }

  abrirModal(){
    this.seguroEnviar.nativeElement.click();
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
}
