import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-componente-pendiente-realizada',
  templateUrl: './componente-pendiente-realizada.component.html',
  styleUrls: ['./componente-pendiente-realizada.component.css']
})
export class ComponentePendienteRealizadaComponent {
  @Input() routaPendiente!: string;
  @Input() routaRealizada!: string;
  activeTab: string = "pendiente";

  @Output() datoEnviado = new EventEmitter<string>(); // Puedes reemplazar 'any' con un tipo de datos específico

 
 

  constructor() {}
  
  setActiveTab(activeTab: string){
    this.activeTab = activeTab;
  }
  enviarDatoAlPadre(activeTab: string) {
    this.datoEnviado.emit(activeTab);
  }

}
