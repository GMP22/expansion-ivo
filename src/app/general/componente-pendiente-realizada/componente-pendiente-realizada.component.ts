import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-componente-pendiente-realizada',
  templateUrl: './componente-pendiente-realizada.component.html',
  styleUrls: ['./componente-pendiente-realizada.component.css']
})
export class ComponentePendienteRealizadaComponent {

  activeTab: string = "pendiente";

  @Output() datoEnviado = new EventEmitter<string>();

  constructor() {}
  
  setActiveTab(activeTab: string){
    this.activeTab = activeTab;
  }
  enviarDatoAlPadre(activeTab: string) {
    this.datoEnviado.emit(activeTab);
  }

}
