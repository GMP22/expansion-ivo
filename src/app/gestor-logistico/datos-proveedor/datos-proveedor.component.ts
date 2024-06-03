import { Component,  Input, ElementRef, ViewChild, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicio/servicio.service';

@Component({
  selector: 'app-datos-proveedor',
  templateUrl: './datos-proveedor.component.html',
  styleUrls: ['./datos-proveedor.component.css']
})
export class DatosProveedorComponent {
  formularioProveedor!:FormGroup;
  @Input() proveedor!:number;
  
  gestorService = inject(ServicioService);

  constructor(private formBuilder: FormBuilder){
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

  ngOnInit(){
    console.log(this.proveedor);

    if (this.proveedor != undefined) {
      this.gestorService.obtenerProveedorSegunId(this.proveedor).subscribe(
        (Response) => {
            this.formularioProveedor.get("nif")?.setValue(Response["nif"])
            this.formularioProveedor.get("nombre")?.setValue(Response["nombre"])
            this.formularioProveedor.get("telefono")?.setValue(Response["telefono"])
            this.formularioProveedor.get("email")?.setValue(Response["email"])
            this.formularioProveedor.get("codigoPostal")?.setValue(parseInt(Response["codigo_postal"]))
            this.formularioProveedor.get("direccion")?.setValue(Response["direccion"])
            this.formularioProveedor.get("provincia")?.setValue(Response["provincia"])
            this.formularioProveedor.get("cod_trasmision")?.setValue(Response["cod_trasmision"])
        }
      )
    }
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

    this.gestorService.modificarProveedor(objeto, this.proveedor).subscribe(
      (response) => {
        console.log(response);
      }
    )
  }
}
