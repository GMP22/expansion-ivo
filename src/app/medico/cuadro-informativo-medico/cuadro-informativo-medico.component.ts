import { Component } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faTruckFast } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@angular/core';

@Component({
  selector: 'app-cuadro-informativo-medico',
  templateUrl: './cuadro-informativo-medico.component.html',
  styleUrls: ['./cuadro-informativo-medico.component.css']
})
export class CuadroInformativoMedicoComponent {
  faTruckFast = faTruckFast;

  @Input() numeroDeCosas!:number;
  @Input() TituloDeCuadro!:string;

}
