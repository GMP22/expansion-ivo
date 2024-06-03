import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio/servicio.service';
import { get } from 'jquery';
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
        provincia: ['', [Validators.required]],
        cod_trasmision: ['', [Validators.required]],
    })
  }

  abrirModal(){
    this.seguroEnviar.nativeElement.click();
  }
  
  siguiente(){
    if (this.ubicacion == 1) {
      this.abrirModal();
    } else if (this.formularioProveedor.valid) {
        this.ubicacion++;
        $('#flecha').addClass('border-3');
        $('#flecha').addClass('barra-inferior');
        $('#paso2').addClass('border-3');
        $('#paso2').addClass('barra-inferior');
        this.formularioProveedor.get("nif")?.disable();
        this.formularioProveedor.get("nombre")?.disable();
        this.formularioProveedor.get("telefono")?.disable();
        this.formularioProveedor.get("email")?.disable();
        this.formularioProveedor.get("codigoPostal")?.disable();
        this.formularioProveedor.get("direccion")?.disable();
        this.formularioProveedor.get("provincia")?.disable();
        this.formularioProveedor.get("cod_trasmision")?.disable();
    }
  }

  anterior(){
    this.ubicacion--;
    $('#flecha').removeClass('border-3');
    $('#flecha').removeClass('barra-inferior');
        this.formularioProveedor.get("nif")?.enable();
        this.formularioProveedor.get("nombre")?.enable();
        this.formularioProveedor.get("telefono")?.enable();
        this.formularioProveedor.get("email")?.enable();
        this.formularioProveedor.get("codigoPostal")?.enable();
        this.formularioProveedor.get("direccion")?.enable();
        this.formularioProveedor.get("provincia")?.enable();
        this.formularioProveedor.get("cod_trasmision")?.enable();
    $('#paso2').removeClass('border-3');
    $('#paso2').removeClass('barra-inferior');
  }

  enviarDatos(){

    let objeto = {
      nif: this.formularioProveedor.get("nif")?.value,
      nombre: this.formularioProveedor.get("nombre")?.value,
      telefono: this.formularioProveedor.get("telefono")?.value,
      email: this.formularioProveedor.get("email")?.value,
      codigo_postal: this.formularioProveedor.get("codigoPostal")?.value,
      direccion: this.formularioProveedor.get("direccion")?.value,
      provincia: this.formularioProveedor.get("provincia")?.value,
      cod_trasmision: this.formularioProveedor.get("cod_trasmision")?.value,
    }

    this.gestorService.proveedoresRegistrar(objeto).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }
}
