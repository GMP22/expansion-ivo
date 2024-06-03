import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tres-pasos-formulario',
  templateUrl: './tres-pasos-formulario.component.html',
  styleUrls: ['./tres-pasos-formulario.component.css']
})
export class TresPasosFormularioComponent {

  @Input() seccion1:string = "";
  @Input() seccion2:string = "";
  @Input() seccion3:string = "";

  activeTab:string = "";

  @Output() datoEnviado = new EventEmitter<string>();

  ngOnInit(){
    this.activeTab = this.seccion1;
  }

  constructor() {
  }

  setActiveTab(activeTab: string){
    this.activeTab = activeTab;
  }
  enviarDatoAlPadre(activeTab: string) {
    this.datoEnviado.emit(activeTab);
  }
}
