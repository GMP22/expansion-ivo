import { Component } from '@angular/core';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { faBoxesStacked } from '@fortawesome/free-solid-svg-icons';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';
@Component({
  selector: 'app-cuadro-informativo',
  templateUrl: './cuadro-informativo.component.html',
  styleUrls: ['./cuadro-informativo.component.css']
})
export class CuadroInformativoComponent {
  faTruckFast = faTruckFast;
  faBoxesStacked = faBoxesStacked;
  faTriangleExclamation = faTriangleExclamation;
  faGears = faGears;

  @Input() size!:string;
  @Input() icono!:string;
  @Input() numeroDeCosas!:number;
  @Input() TituloDeCuadro!:string;
  @Input() botonMostrar!:boolean;
}
