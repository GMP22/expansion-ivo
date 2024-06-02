import { Component, ViewChild, ElementRef } from '@angular/core';
import { inject } from '@angular/core';
import { ServicioService } from '../servicio/servicio.service';
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
export class InventarioComponent {
  faEye = faEye;
  @ViewChild('botonModalInventario') botonModalInventario!: ElementRef;
  @ViewChild('botonModalAutomatico') botonModalAutomatico!: ElementRef;
  contenido!:numeros;
  gestorServicio = inject(ServicioService);
  existir:boolean = false;
  articulosInventario:any [] = [];
  constructor(private router: Router) {}
  ngOnInit(){
    this.gestorServicio.numerosInventario().subscribe(
      (response) => {
        this.contenido = response;
      }
    )
  }

  minimos(){
    this.existir = false;
    this.gestorServicio.inventarioMinimos().subscribe(
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
    this.gestorServicio.inventarioAutomaticos().subscribe(
      (response) => {
        this.existir = true;
        this.articulosInventario = response;
        console.log(this.articulosInventario)
        this.botonModalAutomatico.nativeElement.click();
      }
    )
  }

  mirarDetalles(id_articulo:number){
    this.router.navigate(['/app/gestor-logistico/inventario/detalles-articulo/'], { queryParams: { articulo: id_articulo} });
  }

}
