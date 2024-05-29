import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, Inject } from '@angular/core';
import { inject } from '@angular/core';
import { MedicoService } from '../servicio/medico.service';
import { ArticuloEscogido } from 'src/app/interfaces/articulo-escogido';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

interface numeros {
  articulos_automaticos: number,
  articulos_minimos: number,
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioMedicoComponent {
  faEye = faEye;
  @ViewChild('botonModalInventario') botonModalInventario!: ElementRef;
  @ViewChild('botonModalAutomatico') botonModalAutomatico!: ElementRef;
  contenido!:numeros;
  medicoServicio = inject(MedicoService);
  existir:boolean = false;
  articulosInventario:ArticuloEscogido [] = [];

  constructor(private router: Router) {}
  ngOnInit(){
    this.medicoServicio.numerosInventario(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
        this.contenido = response;
      }
    )
  }

  minimos(){
    this.existir = false;
    this.medicoServicio.inventarioMinimos(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
        this.existir = true;
        this.articulosInventario = response;
        console.log(this.articulosInventario)
        this.botonModalInventario.nativeElement.click();
      }
    )
  }

  automatico(){
    this.existir = false;
    this.medicoServicio.inventarioAutomaticos(localStorage.getItem("id_usuario")).subscribe(
      (response) => {
        this.existir = true;
        this.articulosInventario = response;
        console.log(this.articulosInventario)
        this.botonModalAutomatico.nativeElement.click();
      }
    )
  }

  mirarDetalles(id_articulo:number){
    this.router.navigate(['/app/medico/inventario/detalles-articulo'], { queryParams: { articulo: id_articulo} });
  }
}
