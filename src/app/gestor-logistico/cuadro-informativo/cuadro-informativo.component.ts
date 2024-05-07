import { Component } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cuadro-informativo',
  templateUrl: './cuadro-informativo.component.html',
  styleUrls: ['./cuadro-informativo.component.css']
})
export class CuadroInformativoComponent {
  faCalendar = faCalendar;
  faMagnifyingGlass = faMagnifyingGlass;
  faUserPlus = faUserPlus;
  faFile = faFile;
}
